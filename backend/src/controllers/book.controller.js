import Book from "../models/Book.model.js";

export const getBooks = async (req, res) => {
  try{
    const books = await Book.find().populate("category"); 

    res.json({
      success: true,
      books,
    })
  }
  catch(error){
    res.status(500)
    .json({ 
      success: false,
      message: error.message });
  }
}

export const createBooks = async (req, res) => {
  try{
    const {
      title,
      author,
      description,
      price,
      quantity,
      image,
      isbn,
      category,
    } = req.body;

    // validate 
    if(!title || !author || !category){
      return res.status(400).json({
        success: false,
        message: "Tittle, author, category are required",
      })
    }

    const book = await Book.create({
      title,
      author,
      description,
      price,
      quantity,
      image,
      isbn,
      category,
    });

    res.status(201).json({
      success: true,
      book,
    })
    }catch(error){
    res.status(500)
    .json({ 
      success: false,
      message: error.message });
  }
}
