import express, { Request, Response } from "express";
import { authors, Author } from "../models/authors";
import { books } from "../models/books";

const router = express.Router();
let nextId = 1;

// CREATE new author
router.post("/", (req: Request, res: Response) => {
  const { name, bio } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Author name is required and must be a non-empty string." });
  }

  if (bio && typeof bio !== "string") {
    return res.status(400).json({ error: "Author bio must be a string." });
  }

  const newAuthor: Author = { id: nextId++, name: name.trim(), bio: bio?.trim() || "" };
  authors.push(newAuthor);

  res.status(201).json({ message: "Author added successfully", author: newAuthor });
});

// READ all authors
router.get("/", (req: Request, res: Response) => {
  if (authors.length === 0) {
    return res.json({ message: "No authors found", authors: [] });
  }
  res.json({ message: "Authors retrieved successfully", authors });
});

// READ author by ID
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid author ID" });
  }

  const author = authors.find((a) => a.id === id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  res.json({ message: "Author retrieved successfully", author });
});

// UPDATE author by ID
router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, bio } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid author ID" });
  }

  const author = authors.find((a) => a.id === id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required and must be a non-empty string" });
  }

  if (bio && typeof bio !== "string") {
    return res.status(400).json({ error: "Bio must be a string" });
  }

  author.name = name.trim();
  author.bio = bio?.trim() || "";
  res.json({ message: "Author updated successfully", author });
});

// DELETE author by ID
router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid author ID" });
  }

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
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid author ID" });
  }

  const author = authors.find((a) => a.id === id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const authorBooks = books.filter((b) => b.authorId === id);
  if (authorBooks.length === 0) {
    return res.json({ message: "This author has no books", author, books: [] });
  }

  res.json({ message: "Books retrieved successfully", author, books: authorBooks });
});

export default router;
