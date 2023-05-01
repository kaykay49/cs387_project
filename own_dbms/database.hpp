#include <iostream>
#include <vector>
#include <fstream>
#include <thread>
#include <mutex>
#include <boost/archive/text_oarchive.hpp>
#include <boost/archive/text_iarchive.hpp>


class Embedding
{
private:
    friend class boost::serialization::access;
    template<class Archive>
    void serialize(Archive & ar, const unsigned int version)
    {
        ar & ID;
        ar & embeddings;
    }
public:
    std::string ID;
    std::vector<double> embeddings;
    Embedding(){};
    Embedding(std::string i,std::vector <double> e) :
        ID(i),embeddings(e)
    {}
};


class Cluster {
private : 
    int clusterNum;
    std::vector<double> centroid;
    std::string filename;
public:
    std::string getFileName() {
        return filename;
    }
    double GaugeSimilarity(vector<double>& embeddings);
    void addElement(Embedding &e);
    void Rebalance();
    int getLoadFactor();
    vector<std::string> getProductIDs(vector<double>& embeddings);
    Cluster(vector<double> c, int clusternum);
};


class QueryAndRebalancer {
private:
    int totalLoadFactor;
    int loadThreshold;
    std::vector<Cluster*> clusters;
public:
    bool shouldRebalance() {
        return totalLoadFactor >= loadThreshold;
    }
    void ReBalance () {
        for(auto u: clusters) {
            totalLoadFactor -= u->getLoadFactor();
            u->Rebalance();
        }
    }
    void addElement(int c, Embedding &e) {
        int i = clusters[c]->getLoadFactor();
        clusters[c]->addElement(e);
        totalLoadFactor += (clusters[c]->getLoadFactor()-i);
    }
    // Can be improved upon hierarichal clustering
    vector<std::string> Query(vector<double> &embedding) {
        double maxSimilarity = -1e9;
        int index = -1;
        for(int i = 0; i < clusters.size();i++){
            double u = clusters[i]->GaugeSimilarity(embedding);
            if(u > maxSimilarity){
                maxSimilarity = u;
                index = i;
            }
        }
        return cluster[index]->getProductIDs(embedding);
    }
    QueryAndRebalancer(std::vector<Cluster*> &c, int lt) : clusters(c), loadThreshold(lt), totalLoadFactor(0) {

    }
};


class ClusteringAlgorithm {
private:
    int numClusters;
    double meanTime = 0;
    double meanTimeThreshold;
    double lastTime = -1;
public:
    QueryAndRebalancer* queryandrebalancer;
    ClusteringAlgorithm(int numClusters,vector<Embedding> &e);
    void AddElement(Embedding &e);
};


class DBMS {
private:

    ClusteringAlgorithm c;    

public:
    DBMS(int numClusters, vector<Embedding> &e) {
        c(numClusters,e);
    }
    bool Upsert(Embedding e) {
        c->AddElement(e);
        return true;
    }
    vector<std::string> getProductIDs(vector<double> &embedding) {
        return c->queryandrebalancer->Query(embedding);
    }
};