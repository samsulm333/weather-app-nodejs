const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&%20exclude=hourly,daily&units=metric&lang=id&appid=031958f1e221d1eecf96a596704060b9`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect the weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location, try another search", undefined);
    } else {
      callback(
        undefined,
        `${body.daily[0].weather[0].description}. Temperature is ${body.current.temp} degrees celcius and ${body.current.humidity}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
