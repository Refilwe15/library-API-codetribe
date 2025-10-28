import express, { Request, Response } from "express";
import { books, Book } from "../models/books";

const router = express.Router();
let nextBookId = 1;

// CREATE new book
router.post("/", (req: Request, res: Response) => {
  const { title, authorId, publishedYear } = req.body;

  if (!title || !authorId) {
    return res.status(400).json({ error: "Title and authorId are required" });
  }

  const newBook: Book = { id: nextBookId++, title, authorId, publishedYear };
  books.push(newBook);

  res.status(201).json(newBook);
});

// READ all books
router.get("/", (req: Request, res: Response) => {
  res.json(books);
});

// READ single book by ID
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

// UPDATE book by ID
router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, authorId, publishedYear } = req.body;
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (title) book.title = title;
  if (authorId) book.authorId = authorId;
  if (publishedYear) book.publishedYear = publishedYear;

  res.json(book);
});

// DELETE book by ID
router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const deletedBook = books.splice(index, 1);
  res.json({ message: "Book deleted successfully", book: deletedBook[0] });
});

export default router;
