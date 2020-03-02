const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
 res.send("<h3>Hello World..!! I am here</h3>")
});

app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + "/bmiCalculator.html")
});

app.post("/bmicalculator", function(req, res){
  var w = parseFloat(req.body.n1);
  var h = parseFloat(req.body.n2);
  var outPut = (w / (h*h));
  res.send("BMI is " + outPut);
})

app.listen(3000, function(){
  console.log("Example app listening on port 3000");
})
