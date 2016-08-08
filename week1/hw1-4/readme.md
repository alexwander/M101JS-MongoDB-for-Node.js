This app handles POST and GET requests. A user can upload a form containing movie title, year and imdb link.  

To launch:  

1) npm install  
2) mongod --dbpath data/db  
3) node app.js  
4) go to localhost:3000 and complete the form

To check whether a movie was properly saved to MongoDB database use mongo Shell:

1) mongo  
2) use movies  
3) db.movies.find()