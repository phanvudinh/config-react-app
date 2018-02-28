const express = require('express');
const app = express();
const path = require('path');
var compression = require('compression');

// using static Gzip
// app.use(compression())

app.get('*.js|html|css', function (req, res, next) {
    console.log("gzip",req.url);
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res) {
    console.log("*",req.url);
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(8181, function () {
    console.log('Listening on port 8181');
});