const express = require('express');
const app = express();
const port = 3000;

// import route file
const booksRoute = require('./routes/books');

// mount the books route
app.use('/api/books', booksRoute);

// root route
app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});

// start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});