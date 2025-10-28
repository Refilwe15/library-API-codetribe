import express from "express";
import authorRoutes from "./routes/authors"; 
import bookRoutes from "./routes/bookRoutes"; 

const app = express();
app.use(express.json());

// Routes
app.use("/authors", authorRoutes); 
app.use("/books", bookRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
