#include <boost/asio.hpp> 
#include <boost/bind/bind.hpp>
#include <boost/algorithm/string.hpp>
#include <cstdint> 
#include <iostream>
#include <list>
#include <memory>
#include "database.cpp"

using namespace boost::placeholders;

DBMS instance(20, {});

struct Connection {
	boost::asio::ip::tcp::socket socket;
	boost::asio::streambuf read_buffer;
	Connection( boost::asio::io_service & io_service ) : socket( io_service ), read_buffer( ) { }
	Connection( boost::asio::io_service & io_service, size_t max_buffer_size ) : socket( io_service ), read_buffer( max_buffer_size ) { }
};

class Server {
	boost::asio::io_service m_ioservice;
	boost::asio::ip::tcp::acceptor m_acceptor;
	std::list<Connection> m_connections;
	using con_handle_t = std::list<Connection>::iterator;

public:

	Server( ) : m_ioservice( ), m_acceptor( m_ioservice ), m_connections( ) { }

	void handle_read( con_handle_t con_handle, boost::system::error_code const & err, size_t bytes_transfered ) {
		if( bytes_transfered > 0 ) {
			std::istream is( &con_handle->read_buffer );
			std::string line;
			std::getline( is, line );
			std::cout << "Message Received: " << line << std::endl;

			std::vector<std::string> result;
			boost::split(result, input, boost::is_any_of("|"));
			if(result.size()==2){
				std::vector<std::string> r1;
				std::vector<double> p1;
				boost::split(r1, result[1], boost::is_any_of(" "));
				for(auto u : r1) {
					p1.push_back(std::stod(u));
				}
				auto res = instance.getProductIDs(p1);
				std::string ress;
				for(auto u : res) { 
					ress = ress + " " + std::string(u);
				}
				send(con_handle, ress);
			}else{
				std::vector<std::string> r1;
				std::vector<double> p1;
				boost::split(r1, result[2], boost::is_any_of(" "));
				for(auto u : r1) {
					p1.push_back(std::stod(u));
				}

				auto res = instance.Upsert(Embedding(results[1],p1));
				send(con_handle, "SUCCEES");
			}
			
		}

		if( !err ) {
			do_async_read( con_handle );
		} else {
			std::cerr << "We had an error: " << err.message( ) << std::endl;
			m_connections.erase( con_handle );
		}
	}

	void send(con_handle_t con_handle, std::string res) {
		auto buff = std::make_shared<std::string>( res );
		auto handler = boost::bind( &Server::handle_write, this, con_handle, buff, boost::asio::placeholders::error );
		boost::asio::async_write( con_handle->socket, boost::asio::buffer( *buff ), handler );
	}

	void do_async_read( con_handle_t con_handle ) {
		auto handler = boost::bind( &Server::handle_read, this, con_handle, boost::asio::placeholders::error, boost::asio::placeholders::bytes_transferred );
		boost::asio::async_read_until( con_handle->socket, con_handle->read_buffer, "\n", handler );
	}

	void handle_write( con_handle_t con_handle, std::shared_ptr<std::string> msg_buffer, boost::system::error_code const & err ) {
		if( !err ) {
			std::cout << "Finished sending message\n";
			if( con_handle->socket.is_open( ) ) {
				// Write completed successfully and connection is open
			}
		} else {
			std::cerr << "We had an error: " << err.message( ) << std::endl;
			m_connections.erase( con_handle );
		}
	}

	void handle_accept( con_handle_t con_handle, boost::system::error_code const & err ) {
		if( !err ) {
			std::cout << "Connection from: " << con_handle->socket.remote_endpoint().address().to_string( ) << "\n";
			std::cout << "Sending message\n";
			auto buff = std::make_shared<std::string>( "Hello World!\r\n\r\n" );
			auto handler = boost::bind( &Server::handle_write, this, con_handle, buff, boost::asio::placeholders::error );
			boost::asio::async_write( con_handle->socket, boost::asio::buffer( *buff ), handler );
			do_async_read( con_handle );
		} else {
			std::cerr << "We had an error: " << err.message( ) << std::endl;
			m_connections.erase( con_handle );
		}
		start_accept( );
	}

	void start_accept( ) {
		auto con_handle = m_connections.emplace( m_connections.begin( ), m_ioservice );
		auto handler = boost::bind( &Server::handle_accept, this, con_handle, boost::asio::placeholders::error );
		m_acceptor.async_accept( con_handle->socket, handler );
	}

	void listen( uint16_t port ) {
		auto endpoint = boost::asio::ip::tcp::endpoint( boost::asio::ip::tcp::v4( ), port );
		m_acceptor.open( endpoint.protocol( ) );
		m_acceptor.set_option( boost::asio::ip::tcp::acceptor::reuse_address( true ) );
		m_acceptor.bind( endpoint );
		m_acceptor.listen( );
		start_accept( );
	}

	void run( ) {
		m_ioservice.run( );
	}
};

int main( int, char** ) {
	auto srv = Server( );
	srv.listen( 12345 );

	srv.run( );
	return 0;
}