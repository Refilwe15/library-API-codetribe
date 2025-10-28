// Define the structure of a Book object
export interface Book {
  id: number;
  title: string;
  authorId: number; 
  publishedYear?: number;
}

// Temporary in-memory data store
export const books: Book[] = [];
