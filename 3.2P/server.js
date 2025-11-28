var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var cardList = [
    {
        title: "Local Z Feature Map",
        image: "images/feature_local_z.png",
        description: "Applies local Z rotations to each qubit based on the input value."
    },
    {
        title: "Feature Reuploading",
        image: "images/feature_reuploading.png",
        description: "Re-encodes the same inputs multiple times to increase expressiveness."
    },
    {
        title: "Feature ZZ Interaction",
        image: "images/feature_zz_interaction.png",
        description: "Encodes qubit-qubit correlations by adding ZZ rotations between neighbors."
    }
];

app.get('/api/cards', function(req, res) {
    res.json(cardList);
});

var port = 3000;

app.listen(port, function() {
  console.log(`Server is running on http://localhost:${port}`);
});

