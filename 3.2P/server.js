var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var port = 3000;

app.listen(port, function() {
  console.log(`Server is running on http://localhost:${port}`);
});

