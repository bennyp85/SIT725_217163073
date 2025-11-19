const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Keep this GET endpoint for addition (required)
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided' });
    }
    const sum = num1 + num2;
    res.json({ result: sum });
});

// Function that multiplies two numbers using the POST method
app.post('/multiply', (req, res) => {
    const { num1, num2 } = req.body;
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return res.status(400).json({ error: 'Invalid numbers provided' });
    }
    const product = num1 * num2;
    res.json({ result: product });
});
