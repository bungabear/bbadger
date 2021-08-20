const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const openBadge = require('openbadge');
const axios = require('axios');

app.get('/', async (req, res) => {
    const url = req.query['url'];
    const response = await axios.get(url);
    const json = response.data;
    const name = json.name;
    const currnetUserCount = json.roomCount;
    openBadge({text: [`${name}`, `${currnetUserCount}`]}, function (err, badgeSvg) {
        res.set('Content-Type', 'image/svg+xml');
        res.send(badgeSvg);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});