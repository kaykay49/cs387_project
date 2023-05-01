import numpy as np
from nltk import word_tokenize
import socket



f = open('glove.6B.100d.txt','r')
L = f.readlines()
f.close()

nltk.download('punkt')
embeddings = {}


for l in L:
    Z = l.strip().split(' ')
    w = Z[0]
    emb = [float(z) for z in Z[1:]]
    embeddings[w] = np.array(emb)


def getEmbeddings(sentence):
    L = word_tokenize(sentence)
    e1 = np.zeros(100)
    n1 = 0
    for l in L:
        if l.strip().lower() in embeddings:
            e1 += embeddings[l.strip().lower()]
            n1 += 1
    e1 /= n1

    return list(e1)


HOST = socket.gethostname()
PORT_FRONTEND = 5976
PORT_BACKEND = 12345

backend_socket = socket.socket()
backend_socket.setblocking(1)
backend_socket.connect((HOST,PORT_BACKEND))


with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT_FRONTEND))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print(f"Connected by {addr}")
        while True:
            data = conn.recv(1024)
            ## Three types of operations, Insert, Update and Search, MAKE SURE | DOESN'T APPEAR ANYWHERE IN THE TEXT ITSELF

            ## 1. Search : SEARCH | Search Keywords : This will return a vector of product IDs (at max 10 products) (ends with \n)
            ## 2. Upsert : UPSERT | <productID> | TEXT FOR PRODUCT : THIS WILL RETURN ONE MESSAGE :  SUCCESS| FAILURE (ends with \n) 

            Z = data.strip().split('|')

            if(len(Z)==2):
                embe = getEmbeddings(Z[1])
                s = ''
                for e in embe:
                    s += f'{e:.6f}'
                    s += ' '
                s += '\n'
                backend_socket.send(s)
            else:
                embe = getEmbeddings(Z[2])
                s = ''
                for e in embe:
                    s += f'{e:.6f}'
                    s += ' '
                s += '\n'
                backend_socket.send('UPSERT |' + s)
            
            res = backend_socket.recv(1024)
            conn.send(res)






