const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  const f =(req.body.Fname);
  const l =(req.body.Lname);
  const e =(req.body.Email);
  const data = {
    members: [
      {
        email_address: e,
        status: "subscribed",
        merge_fields:{
          FNAME: f,
          LNAME: l
        }
      }
    ]
  }

  var jsonData = JSON.stringify(data);
  const url = 'https://us4.api.mailchimp.com/3.0/lists/5ab6c0bf10';
  const options = {
    method: "POST",
    auth: "jagruti5:e980e25d8a2d3e4ad963166cc4f4a3af-us4"
  }
  const request = https.request(url, options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})

app.post("/failure", function(req, res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is runing at port 3000");
})

// api key  e980e25d8a2d3e4ad963166cc4f4a3af-us4

// list id 5ab6c0bf10
