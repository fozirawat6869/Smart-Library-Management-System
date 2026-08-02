import Category from "../models/Category.model.js";
import Book from "../models/Book.model.js";

export const getCategories = async (req, res) => {
  try {
   const categories = await Category.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "category",
          as: "books",
        },
      },
      {
        $addFields: {
          bookCount: { $size: "$books" },
        },
      },
      {
        $project: {
          books: 0,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      categories,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// create a new category

export const createCategory = async( req, res) => {
  try{
      const { name, description} = req.body;

      // validate input
    if(!name){
      return res.status(400).json({
        success: false,
        message: "category name is required",
      })
    }
    //check if existing name already exists

    const existingCategory = await Category.findOne({name});
      
    if(existingCategory){
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      })
    }

    // create category

    const category = await Category.create({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    })

  }catch(error){
      res.status(500)
      .json({ 
        success: false,
        message: error.message }); 
  }
}

export const deleteCategory = async (req, res) => {
  try{
    const { id } = req.params;

    // check if category exists
    const category = await Category.findById(id);
    if(!category){
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }

    // delete category

    const books = await Book.findOne({ category: id });

    if(books){
      return res.status(400).json({
        success: false,
        message: "Cannot delete category. Books are assigned to this category.",
      })
      alert("Cannot delete category. Books are assigned to this category.");
    }

    // delete categore

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    })

  }catch(error){
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

