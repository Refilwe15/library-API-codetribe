import express, { Request, Response } from "express";
import { books, Book } from "../models/books";
import { authors } from "../models/authors";

const router = express.Router();
let nextBookId = 1;

//  CREATE new book
router.post("/", (req: Request, res: Response) => {
  const { title, authorId, publishedYear } = req.body;

  //  Required fields check
  if (!title || !authorId) {
    return res.status(400).json({ error: "Title and authorId are required" });
  }

  //  Validate author exists
  const authorExists = authors.some((a) => a.id === authorId);
  if (!authorExists) {
    return res.status(400).json({ error: "Author does not exist" });
  }

  //  Check duplicate title for same author
  const duplicate = books.find(
    (b) => b.title === title && b.authorId === authorId
  );
  if (duplicate) {
    return res.status(409).json({ error: "Book already exists for this author" });
  }

  const newBook: Book = { id: nextBookId++, title, authorId, publishedYear };
  books.push(newBook);

  res.status(201).json({
    message: " Book added successfully",
    book: newBook,
  });
});

//  READ all books
router.get("/", (req: Request, res: Response) => {
  res.json({ count: books.length, books });
});

//  READ single book by ID
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

//  UPDATE book by ID
router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, authorId, publishedYear } = req.body;

  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (title) book.title = title;
  if (authorId) {
    const authorExists = authors.some((a) => a.id === authorId);
    if (!authorExists) {
      return res.status(400).json({ error: "Author does not exist" });
    }
    book.authorId = authorId;
  }
  if (publishedYear) book.publishedYear = publishedYear;

  res.json({ message: " Book updated successfully", book });
});

//  DELETE book by ID
router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const deletedBook = books.splice(index, 1)[0];
  res.json({
    message: "Book deleted successfully",
    book: deletedBook,
  });
});

export default router;
