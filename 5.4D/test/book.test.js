const expect = require('chai').expect;
const request = require("request");

/*
Test 1: Valid book ID
•	Arrange: stub bookService.getBookById to return a fake book
•	Act: call GET /api/books/b9
•	Assert: response status is 200


Test 2: Invalid book ID
•	Arrange: stub bookService.getBookById to return null
•	Act: call GET /api/books/does-not-exist
•	Assert: response status is 404

Test 3: Valid conversion
•	Act: convertAUDtoINR(10)
•	Assert: result equals 550

Test 4: Edge case
•	Act: convertAUDtoINR(0)
•	Assert: result equals 0


*/

describe("Book API", function() {
    const baseUrl = "http://localhost:3004/api/book";

    it("Test 1: Valid book ID", function(done) {
        request.get(`${baseUrl}/b9`, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("Test 2: Invalid book ID", function(done) {
        request.get(`${baseUrl}/does-not-exist`, function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });
});

describe("Book Service - Currency Conversion", function() {
    const bookService = require('../services/bookService');

    it("Test 3: Valid conversion", function() {
        const result = bookService.convertAUDtoINR(10);
        expect(result).to.equal(550);
    });

    it("Test 4: Edge case", function() {
        const result = bookService.convertAUDtoINR(0);
        expect(result).to.equal(0);
    });
});