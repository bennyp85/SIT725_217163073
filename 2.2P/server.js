const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

let quotes = [
    { "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { "Don't let yesterday take up too much of today.", author: "Will Rogers" },
    { "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" }
];

app.get('/api/quotes', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json(quotes[randomIndex]);  
});

app.post('/api/quotes', (req, res) => {
    const { quote } = req.body;
    if (!quote || typeof quote != 'string') {
        return res.status(400).json({ error: 'Quote is required and must be a string.' });
    }
    quotes.push({ quote, author: "Unknown" });
    res.status(201).json({ message: 'Quote added successfully.' });
});