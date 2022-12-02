require("dotenv").config(); 

//make passwords secure by adding it in .env files (npm i dotenv)

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { application } = require("express");
const _ = require("lodash");

const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_KEY}@cluster0.gv3eye4.mongodb.net/dailyJournalDB`);
//mongodb+srv://fahadkhan:fahadfaraz10@cluster0.gv3eye4.mongodb.net/dailyJournalDB

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const homeContent =
  "Whether sharing your expertise, breaking news, or whatever’s on your mind, you’re in good company on our website Daily Journal. Begin a journey to discover why millions of people have published their passions here.";
const aboutContent =
  "Since 1999, millions of people have expressed themselves on our website Daily Journal. From detailed posts about almost every apple variety you could ever imagine to a blog dedicated to the art of blogging itself, the ability to easily share, publish and express oneself on the web is at the core of Blogger’s mission. As the web constantly evolves, we want to ensure anyone using Daily Journal has an easy and intuitive experience publishing their content to the web.";
const contactContent =
  "It looks like you’re trying to reach Daily Journal’s customer service team. To make your life a little easier, please get in contact with Daily Journal’s representatives by reaching out to them directly using the contact E-Mail Id : DailyJournal@gmail.com";

// const posts = [];

//Making Mongoose Schema and model

const composeSchema = new mongoose.Schema({

  title:String,
  text:String,

});


const composeItem = mongoose.model("composeItem",composeSchema);



























app.get("/", function (req, res) {

  //returns array
  composeItem.find({},function(err,resultArray){

    res.render("home", {
      homeContent_ejs: homeContent,
      posts: resultArray,
      //sending result array to home for iterting through loop to get title and text
    });

  });




});










// Url Responses
app.get("/posts/:post_param", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.post_param);

  composeItem.find({},function(err,resultArray){

    resultArray.forEach(function (result) {
      const storedTitle = _.lowerCase(result.title);
      if (requestedTitle === storedTitle) {
  
        res.render("post", {
          title: result.title,
          text: result.text,
        });
      }
    });
  



  });
 

});










//Compose Page Submission POST
app.post("/", function (req, res) {
  const compose_obj = new composeItem({
    title: req.body.compose_title,
    text: req.body.compose_text,
  });

  //if save successful then redirect to home
  compose_obj.save(function(err){
    if(err){
      console.log(err);
    }
  });
  res.redirect("/");
    

});















// ABOUT PAGE
app.get("/about", function (req, res) {
  res.render("about", {
    aboutContent_ejs: aboutContent,
  });
});


// CONTACT PAGE
app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent_ejs: contactContent,
  });
});


// COMPOSE PAGE
app.get("/compose", function (req, res) {
  res.render("compose");
});


//Listen Section
const PORT = process.env.PORT ;
app.listen(PORT, function () {
  console.log(`Server On ${PORT}`);
});



