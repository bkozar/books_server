var moment = require('moment');
var casual = require('casual');

module.exports = (function () {

    var generatorAPI = {
        generateBooks: generateBooks,
        getAllBooks: getAllBooks,
        filterBooks: filterBooks
    };

    var bookGenres = [
        'action',
        'drama',
        'fantasy',
        'finance',
        'history',
        'horror',
        'religion',
        'romance',
        'science',
        'science-fiction',
        'travel'
    ];

    var MIN_DATE = moment('1940-01-01');
    var MAX_DATE = moment();
    var books = null;

    return generatorAPI;

    function generateBooks() {
        var BOOKS_COUNT = 1000000;

        books = [];
        for (var i = 0; i < BOOKS_COUNT; i++) {
            var book = {
                title: casual.title,
                author: casual.full_name,
                gender: Math.random() < 0.5 ? 'm' : 'f',
                genre: bookGenres[Math.floor(Math.random() * bookGenres.length)],
                publishedDate: _getRandomDate(),
                image: Math.floor((Math.random() * 50))
            };

            books.push(book);
        }

        return books;
    }

    function getAllBooks() {
        if (!books) {
            return generateBooks();
        }

        return books;
    }

    function filterBooks(filters) {
        var filteredBooks = _applyFilters(filters);

        return _applySorting(filteredBooks, filters);
    }

    function _applyFilters(filters) {
        console.log(filters);
        return books.filter(function(book) {
            return (!filters.genres.length || filters.genres.indexOf(book.genre) > -1) &&
                (!filters.genders || filters.genders === book.gender);
        });
    }

    function _applySorting(books, filters) {
        if (!filters.sortBy) {
            return books;
        }

        return books.sort(function(a, b) {
            if (a[filters.sortBy] < b[filters.sortBy]) {
                return filters.sortDescending ? 1 : -1;
            }
            if (a[filters.sortBy] > b[filters.sortBy]) {
                return filters.sortDescending ? -1 : 1;
            }
            return 0;
        });
    }

    function _getRandomDate() {
        var randomNumber = function(to, from) {
            return Math.floor(Math.random() * (to - from) + from);
        };

        return moment.unix(randomNumber(MAX_DATE.unix(), MIN_DATE.unix()));
    }
})();