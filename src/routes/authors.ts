import express, { Request, Response } from "express";
import { authors, Author } from "../models/authors";
import { books } from "../models/books";

const router = express.Router();
let nextId = 1;

// CREATE new author
router.post("/", (req: Request, res: Response) => {
  const { name, bio } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Author name is required" });
  }

  const newAuthor: Author = { id: nextId++, name, bio };
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// READ all authors
router.get("/", (req: Request, res: Response) => {
  res.json(authors);
});

// READ author by ID
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const author = authors.find((a) => a.id === id);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  res.json(author);
});

// UPDATE author by ID
router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, bio } = req.body;

  const author = authors.find((a) => a.id === id);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  author.name = name;
  author.bio = bio;
  res.json(author);
});

// DELETE author by ID
router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = authors.findIndex((a) => a.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Author not found" });
  }

  const deletedAuthor = authors.splice(index, 1)[0];
  res.json({ message: "Author deleted successfully", author: deletedAuthor });
});

// Get all books for an author
router.get("/:id/books", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const author = authors.find((a) => a.id === id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const authorBooks = books.filter((b) => b.authorId === id);

  res.json({
    author,
    books: authorBooks
  });
});

export default router;
