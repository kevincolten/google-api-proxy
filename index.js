const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY,
  Promise: Promise,
  rate: { limit: 900 },
});

app.get('/ping', async (req, res) => res.send('pong'))

app.get('/place/:placeId', async (req, res) => {
  const fields = [
    'address_component',
    'adr_address',
    // 'alt_id',
    'formatted_address',
    'geometry',
    'geometry/location',
    'geometry/location/lat',
    'geometry/location/lng',
    'geometry/viewport',
    'geometry/viewport/northeast',
    'geometry/viewport/northeast/lat',
    'geometry/viewport/northeast/lng',
    'geometry/viewport/southwest',
    'geometry/viewport/southwest/lat',
    'geometry/viewport/southwest/lng',
    'icon',
    // 'id',
    'name',
    'permanently_closed',
    'photo',
    'place_id',
    // 'scope',
    'type',
    'url',
    'utc_offset',
    'vicinity',
    'formatted_phone_number',
    'international_phone_number',
    'opening_hours',
    'website',
    'price_level',
    'rating',
    'reviews',
    'user_ratings_total',
    'plus_code'
  ];

  try {
    const googlePlace = await googleMapsClient
      .place({ placeid: req.params.placeId, fields })
      .asPromise();
    res.json(googlePlace);
  } catch (error) {
    console.error(error);
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))