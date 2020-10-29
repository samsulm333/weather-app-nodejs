const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./src/utils/geocode");
const forecast = require("./src/utils/forecast");

const app = express();

//path express config
const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

//setup views handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Samsul Ma'arif",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Samsul Ma'arif",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is Helpful text",
    title: "Help",
    name: "Samsul Ma'arif",
  });
});

//----------------------------------/weather app start---------------------------------------//
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longtitude, Location_desc } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
          res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location: Location_desc,
          address: req.query.address,
        });
      });
    }
  );
});

//----------------------------------/weather app end---------------------------------------

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Samsul Ma'arif",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Samsul Ma'arif",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log(`Service up on port 3000..`);
});
