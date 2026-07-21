import app from "./app.js";
import connectionDB from "./src/config/database.js";
// import connectDB from "./src/config/database.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.Backend_PORT || 8000;

// connecting database
// connectDB()
// .then(() => {
//   app.listen(PORT, () =>{
//     console.log(`Server is running on port ${PORT}`);
//   })
// })
// .catch((err) => {
//   console.log(`Error connecting to the database: ${err.message}`);
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);



process.on("unhandledRejection",(err)=>{
    console.log(err.message)
    console.log("server goes down");

    server.close(()=>{
        process.exit(1)
    })
})
