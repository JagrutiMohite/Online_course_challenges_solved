const express = require("express");
const app = express();
const https = require('https');
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apikey = "47e1649f29b29eab07c7507f9dd6e317";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apikey + "&units=" + units;

  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const wDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius. </h1>")
      res.write( "<h3>The weather is currently " + wDescription + ".</h3>")
      res.write("<img src="+ imgUrl +">")
      res.send()
    })
  })
})


app.listen(3000, function(){
  console.log("server listening on 3000");
})
