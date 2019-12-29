const express = require("express");
const bodyParse = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParse.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

  let listId = "1cfb1c12e5";
  let key = "263928acf40722af9a68a9f289d062a8-us4";

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  let data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields:
      {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

 let jsonData = JSON.stringify(data);

 const options = {
   url: `https://us4.api.mailchimp.com/3.0/lists/${listId}`,
   method: "POST",
   headers: {
     "Authorization": "marcisouza83 263928acf40722af9a68a9f289d062a8-us4"
   },
   //body: jsonData
 };

 request(options, function(error, response, body) {
   if (error){
     res.sendFile(__dirname + "/failure.html")
   } else {
     if (response.statusCode === 200) {
     res.sendFile(__dirname + "/sucess.html")
   } else {
     res.sendFile(__dirname + "/failure.html")
   }
 }
 });

  });

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000, function(){
  console.log("The server is running on port 3000")
});

//263928acf40722af9a68a9f289d062a8-us4

//list id -> 1cfb1c12e5
