import express, { Request, Response } from "express";
import { authors, Author } from "../models/authors";

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





 
export default router;
