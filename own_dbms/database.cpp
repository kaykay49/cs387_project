#include "database.hpp"
#include <set>
#include <utility>
#include <ctime>
#include <map>

double getDist(std::vector<double> &e1, std::vector<double> &e2) {
    double sum = 0;
    for(int i = 0; i < e1.size(); i++) {
        sum += (e1[i]-e2[i])*(e1[i]-e2[i]);
    }
    return sum;
}

double Cluster::GaugeSimilarity(vector<double>& embeddings) {
    double sum = 0;
    for(int i = 0; i < embeddings.size();i++){
        sum += (embeddings[i]-centroid[i])*(embeddings[i]-centroid[i]);
    }
    return sum;
}
void Cluster::addElement(Embedding &e){
    std::ofstream ofs(filename);
    {
        boost::archive::text_oarchive oa(ofs);
        // write class instance to archive
        oa << e;
    	// archive and stream closed when destructors are called
    }
    ofs.close();
};

void Cluster::Rebalance() {
    vector<double> new_centre(100,0);
    Embedding newg;
    int n = 0;
    {
        // create and open an archive for input
        std::ifstream ifs(filename);
        boost::archive::text_iarchive ia(ifs);
        // read class state from archive
        while(ia >> newg){
            for(int i = 0;i < 100;i++){
                new_centre[i] += newg.embeddings[i];
            }
            n++;
        }
        // archive and stream closed when destructors are called
    }
    for(int i = 0; i < 100; i++){
        centroid[i] = new_centroid[i]/n;
    }
};

int Cluster::getLoadFactor() {
    return 0;
};

vector<std::string> Cluster::getProductIDs(vector<double>& embeddings) {
    Embedding newg;
    int n = 0;
    std::set<std::pair<double, std::string> > nums;
    {
        // create and open an archive for input
        std::ifstream ifs(filename);
        boost::archive::text_iarchive ia(ifs);
        // read class state from archive
        while(ia >> newg){
            double dist = 0;
            for(int i = 0;i < 100;i++){
                dist += (newg.embeddings[i]-embeddings[i])*(newg.embeddings[i]-embeddings[i]);
            }
            nums.insert(std::make_pair(dist, newg.ID));
        }
        // archive and stream closed when destructors are called
    }
    std::vector<std::string> res;
    for(auto u : nums) {
        if(res.size() >= 10) break;
        res.push_back(u.second);
    }
    return res;
}

Cluster(vector<double> c, int clusternum) { 
    clusterNum = clusternum;
    centroid = c;
    filename = std::string(clusternum)+ ".archive";
}



ClusteringAlgorithm::ClusteringAlgorithm(int numclusters,vector<Embedding> &e) {
    numClusters = numclusters;
    lastTime = ((double)std::time(0))/1e6;
    
    std::map<int, int> clustermap;
    std::map<int, vector<double> > clustermean;
    set<int> seen;
    for(int j = 0; j < numClusters; j++) {
        int z;
        do{
            z = rand() % (e.size());
        }while(seen.find(z)!=seen.end());
        seen.insert(z);
        clustermean[j] = e[z].embeddings;
    }

    for(int a = 0; a < 10000; a++) {
        for(int j = 0; j < e.size() ; j++) {
            int y = -1;
            double mindist = 1e20;
            for(int k = 0; k < numclusters; k++) {
                double h = getDist(e[j].embeddings, clustermean[k]);
                if( h < mindist) {
                    mindist = h;
                    y = k;
                }
            }
            clustermap[j] = y;
        }

        for(int i = 0; i < numclusters; i ++) {
            std::vector<double> tmean(100,0);
            int n = 0;
            for(auto u: clustermap) {
                if(u->second == i) {
                    n++;
                    for(int j = 0; j < tmean.size();i++){
                        tmean[j] += e[u->first].embeddings[j];
                    }
                }
            }
            for(int j = 0; j < tmean.size();i++){
                tmean[j] /= n;
            }
            clustermean[i] = tmean;
        }
    }
    
    std::vector<Cluster*> res;

    for(int i = 0; i < numclusters;i++){
        res.push_back(new Cluster(clustermean[i],i));
        Cluster* cc = res[res.size()-1];
        for(auto u : clustermap) {
            if(u->second == i) {
                cc->addElement(e[u->first]);
            }
        }
    }

    queryandrebalancer = new QueryAndRebalancer(res,10);
};

void ClusteringAlgorithm::AddElement(Embedding &e) {
    if(meanTime < 1e-5) {
        meanTime = ((std::time(0)/1e6)-lastTime);
    }else{
        meanTime = meanTime*0.9 + 0.1*((std::time(0)/1e6)-lastTime);
    }

    lastTime = (std::time(0)/1e6);

    queryandrebalancer->addElement(e);
}
