const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.City;
  const apiKey = "425e285c80f154550cb41f887270618a";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const Weatherdata = JSON.parse(data);
      const temp = Weatherdata.main.temp;
      const Wdescription = Weatherdata.weather[0].description;
      console.log(Wdescription);
      const icon = Weatherdata.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + Wdescription + "</p>");

      res.write(
        "<h1>The temperature in" +
          query +
          " is " +
          temp +
          " degree celcius</h1>"
      );

      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server Running on port 3000");
});
