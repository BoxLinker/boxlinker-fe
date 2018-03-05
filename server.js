const express = require('express');
const path = require('path');
const app = express();
var morgan = require('morgan');

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(80, function() {
  console.log('server listen on 80.');
});
