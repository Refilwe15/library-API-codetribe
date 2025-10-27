import express, { Request, Response } from "express";
import authorsRoute from "./routes/authors";


const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Route for authors
app.use("/authors", authorsRoute);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send(" Library API is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
