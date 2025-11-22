var express = require('express');
var app = express();
var port = 3000;

app.listen(port, function() {
  console.log(`Server is running on http://localhost:${port}`);
});

