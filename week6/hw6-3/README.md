1) download json https://university.mongodb.com/static/MongoDB_2016_M101JS_August/handouts/companies_dataset.5113625bb62c.zip
2) mongod --dbpath data/db
3) mongoimport -d crunchBase -c companies companies.json
4) mongo hw6-3
