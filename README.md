## PROJECT OVERVIEW

A simple API to manage authors and books using Node.js , TypeScript and Express .

## Features

- **Authors**
  - Create, read, update, delete (CRUD) authors
  - Get all books by a specific author

- **Books**
  - Create, read, update, delete (CRUD) books
  - Validate that a book’s author exists
  - Prevent duplicate book titles for the same author


## TECH STACK


## HOW TO RUN THE PROJECT

**Clone Repository**

- git clone https://github.com/Refilwe15/library-API-codetribe.git

- cd library-API-codetribe

- code .

**Install dependecies**

- npm install

**Start Server**

- npm run dev

## ENDPOINTS

**Add Author(POST)**

- http://localhost:3000/authors


{
  "name": "J.K. Rowling",
  "bio": "British author, best known for Harry Potter."
}

**Add Books(POST)**

- http://localhost:3000/books

{
  "title": "Harry Potter and the Sorcerer's Stone",
  "authorId": 1,
  "publishedYear": 1997
}
