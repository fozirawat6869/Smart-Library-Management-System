import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 8000;

// connecting database
connectDB()
.then(() => {
  app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
  })
})
.catch((err) => {
  console.log(`Error connecting to the database: ${err.message}`);
});

