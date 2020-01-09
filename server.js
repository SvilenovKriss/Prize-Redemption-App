const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/Prize-Redemption'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/Prize-Redemption/index.html'));
});

console.log(express)
// default Heroku PORT
app.listen(process.env.PORT || 3000);