// API Base URL
const API_BASE = '/api/book';

// Currency Conversion
const AUD_TO_INR_RATE = 55;
let isConvertedToINR = false;

// DOM Elements
const messageArea = document.getElementById('messageArea');
const findBookForm = document.getElementById('findBookForm');
const findBookResult = document.getElementById('findBookResult');
const addBookForm = document.getElementById('addBookForm');
const updateBookForm = document.getElementById('updateBookForm');
const refreshBooksBtn = document.getElementById('refreshBooksBtn');
const booksTable = document.getElementById('booksTable');

// Utility: Show Message
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageArea.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Utility: Clear Messages
function clearMessages() {
    messageArea.innerHTML = '';
}

// Currency Conversion: Helper function to convert AUD to INR
function convertAUDtoINR(audValue) {
    return audValue * AUD_TO_INR_RATE;
}

// Currency Conversion: Parse price string to extract numeric value
function parsePriceString(priceString) {
    // Extract numeric value from strings like "$24.99 AUD" or "$24.99"
    const match = priceString.match(/\d+(?:\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
}

// Currency Conversion: Convert all visible prices to INR
function convertAllPricesToINR() {
    if (isConvertedToINR) {
        showMessage('Prices are already converted to INR', 'info');
        return;
    }

    // Find all price cells in the table
    const priceCells = booksTable.querySelectorAll('tbody td:last-child');
    
    if (priceCells.length === 0) {
        showMessage('No books to convert', 'info');
        return;
    }

    priceCells.forEach(cell => {
        const currentText = cell.textContent;
        const audValue = parsePriceString(currentText);
        const inrValue = convertAUDtoINR(audValue);
        cell.textContent = `₹${inrValue.toFixed(2)} INR`;
    });

    // Update the single book display if visible
    const singleBookPrice = findBookResult.querySelector('.book-details p:last-child strong');
    if (singleBookPrice && singleBookPrice.textContent === 'Price:') {
        const priceText = singleBookPrice.parentElement.textContent;
        const audValue = parsePriceString(priceText);
        const inrValue = convertAUDtoINR(audValue);
        singleBookPrice.parentElement.innerHTML = `<strong>Price:</strong> ₹${inrValue.toFixed(2)} INR`;
    }

    isConvertedToINR = true;
    document.getElementById('convertToINRBtn').disabled = true;
    showMessage('All prices converted to INR successfully!', 'success');
}

// API: Get All Books
async function getAllBooks() {
    try {
        const response = await fetch(API_BASE);
        const result = await response.json();
        
        if (response.ok) {
            displayAllBooks(result.data);
            return result.data;
        } else {
            throw new Error(result.message || 'Failed to fetch books');
        }
    } catch (error) {
        showMessage(`Error fetching books: ${error.message}`, 'error');
        booksTable.innerHTML = '<p class="error">Failed to load books</p>';
    }
}

// API: Get Book by ID
async function getBookById(bookId) {
    try {
        const response = await fetch(`${API_BASE}/${bookId}`);
        const result = await response.json();
        
        if (response.ok) {
            showMessage(`Book found: ${result.data.title}`, 'success');
            displaySingleBook(result.data);
        } else {
            showMessage(result.message || `Book with ID ${bookId} not found`, 'error');
            findBookResult.innerHTML = '<p class="error">Book not found</p>';
        }
    } catch (error) {
        showMessage(`Error fetching book: ${error.message}`, 'error');
        findBookResult.innerHTML = '<p class="error">Failed to load book</p>';
    }
}

// API: Create Book
async function createBook(bookData) {
    try {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage(result.message || 'Book created successfully!', 'success');
            addBookForm.reset();
            getAllBooks(); // Refresh the book list
        } else {
            showMessage(result.message || 'Failed to create book', 'error');
        }
    } catch (error) {
        showMessage(`Error creating book: ${error.message}`, 'error');
    }
}

// API: Update Book
async function updateBook(bookId, bookData) {
    try {
        const response = await fetch(`${API_BASE}/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage(result.message || 'Book updated successfully!', 'success');
            updateBookForm.reset();
            getAllBooks(); // Refresh the book list
        } else {
            showMessage(result.message || 'Failed to update book', 'error');
        }
    } catch (error) {
        showMessage(`Error updating book: ${error.message}`, 'error');
    }
}

// Display: Single Book
function displaySingleBook(book) {
    const html = `
        <div class="book-details">
            <p><strong>ID:</strong> ${book.id}</p>
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Summary:</strong> ${book.summary}</p>
            <p><strong>Published Year:</strong> ${book.publishedYear}</p>
            <p><strong>Price:</strong> $${book.price} ${book.currency}</p>
        </div>
    `;
    findBookResult.innerHTML = html;
}

// Display: All Books in Table
function displayAllBooks(books) {
    // Reset conversion state when displaying fresh data
    isConvertedToINR = false;
    const convertBtn = document.getElementById('convertToINRBtn');
    if (convertBtn) {
        convertBtn.disabled = false;
    }
    
    if (!books || books.length === 0) {
        booksTable.innerHTML = `
            <div class="empty-state">
                <p>No books found in the database.</p>
                <p>Add a book using the form above to get started!</p>
            </div>
        `;
        return;
    }
    
    const tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Year</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                ${books.map(book => `
                    <tr>
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.genre}</td>
                        <td>${book.publishedYear}</td>
                        <td>$${book.price} ${book.currency}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    booksTable.innerHTML = tableHTML;
}

// Event: Find Book Form Submit
findBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessages();
    const bookId = document.getElementById('findBookId').value.trim();
    if (bookId) {
        getBookById(bookId);
    }
});

// Event: Add Book Form Submit
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessages();
    
    const bookData = {
        id: document.getElementById('addBookId').value.trim(),
        title: document.getElementById('addTitle').value.trim(),
        author: document.getElementById('addAuthor').value.trim(),
        genre: document.getElementById('addGenre').value,
        summary: document.getElementById('addSummary').value.trim(),
        publishedYear: parseInt(document.getElementById('addYear').value),
        price: parseFloat(document.getElementById('addPrice').value),
        currency: 'AUD'
    };
    
    createBook(bookData);
});

// Event: Update Book Form Submit
updateBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessages();
    
    const bookId = document.getElementById('updateBookId').value.trim();
    if (!bookId) {
        showMessage('Please enter a Book ID to update', 'error');
        return;
    }
    
    // Build update object with only provided fields
    const updateData = {};
    
    const title = document.getElementById('updateTitle').value.trim();
    if (title) updateData.title = title;
    
    const author = document.getElementById('updateAuthor').value.trim();
    if (author) updateData.author = author;
    
    const genre = document.getElementById('updateGenre').value;
    if (genre) updateData.genre = genre;
    
    const summary = document.getElementById('updateSummary').value.trim();
    if (summary) updateData.summary = summary;
    
    const year = document.getElementById('updateYear').value;
    if (year) updateData.publishedYear = parseInt(year);
    
    const price = document.getElementById('updatePrice').value;
    if (price) updateData.price = parseFloat(price);
    
    // Always include currency if price is provided
    if (price) updateData.currency = 'AUD';
    
    if (Object.keys(updateData).length === 0) {
        showMessage('Please provide at least one field to update', 'error');
        return;
    }
    
    updateBook(bookId, updateData);
});

// Event: Refresh Books Button
refreshBooksBtn.addEventListener('click', () => {
    clearMessages();
    getAllBooks();
});

// Initial Load and Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load initial books
    getAllBooks();
    
    // Set up Convert to INR button listener
    const convertToINRBtn = document.getElementById('convertToINRBtn');
    if (convertToINRBtn) {
        convertToINRBtn.addEventListener('click', () => {
            clearMessages();
            convertAllPricesToINR();
        });
    }
});
