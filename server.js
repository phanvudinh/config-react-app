const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res) {
    console.log(req.url)
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(8181, function () {
    console.log('Listening on port 8181');
});