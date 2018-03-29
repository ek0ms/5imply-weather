const request = require('request');
const keys = require('../config/keys');
const googleMapsClient = require('@google/maps').createClient({ key: keys.googleMapsKey });

// const googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
// 1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${
//   keys.googleMapsKey
// }`;
const weatherRootUrl = `https://api.darksky.net/forecast/${keys.darkskySecret}/`;

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.get('/search/:address', (req, res) => {
    const address = decodeURI(req.params.address);

    googleMapsClient.geocode({ address }, (error, response) => {
      if (!error) {
        const { lat, lng } = response.json.results[0].geometry.location;
        const address = response.json.results[0].formatted_address;
        const weatherUrl = `${weatherRootUrl}${lat},${lng}?exclude=currently,minutely,alerts,flags&extend=hourly`;

        request.get(weatherUrl, (error, response, body) => {
          if (error) {
            res.send(error);
          }

          const json = JSON.parse(body);
          res.send({ ...json, address });
        });
      }
    });

    // request.get(googleUrl, (error, response, body) => {
    //   if (error) {
    //     res.send(error);
    //   }
    //
    //   const json = JSON.parse(body);
    //   res.send(json);
    // });

    // request.get(weatherurl, (error, response, body) => {
    //   if (error) {
    //     res.send(error);
    //   }
    //
    //   const json = JSON.parse(body);
    //   res.send(json);
  });
};
