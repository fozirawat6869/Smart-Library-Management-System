import API from "./api";

export const getBooks = () => API.get("/books");

export const getCategories = () => API.get("/categories");