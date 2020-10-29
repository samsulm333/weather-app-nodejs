const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2Ftc3VsbTMzMyIsImEiOiJja2ZjZHU1d3YwMjkzMnJubmgwandmOWs2In0.Kv1n0iQ38LE_1RUHFgIG6g`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect the weather service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        Location_desc: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
