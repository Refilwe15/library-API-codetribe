

// Define the structure of an Author object
export interface Author {
  id: number;
  name: string;
  bio?: string; // optional field
}

// Temporary in-memory data store
export const authors: Author[] = [];
