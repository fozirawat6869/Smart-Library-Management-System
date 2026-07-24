import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);

// Server is running
//        │
//        ▼
// A Promise fails
//        │
//        ▼
// Nobody catches the error
//        │
//        ▼
// process.on("unhandledRejection") runs
//        │
//        ▼
// Print the error
//        │
//        ▼
// Stop accepting new requests
//        │
//        ▼
// Exit the application

process.on("unhandledRejection",(err)=>{
    console.log(err.message)
    console.log("server goes down");

    server.close(()=>{
        process.exit(1)
    })
})
=======
connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
  });
}).catch((err) => {
  console.log(err);
});
>>>>>>> 53d56bf056ca251394f1718efdf6b0e80e2b8064
