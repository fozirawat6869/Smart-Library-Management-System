import dotenv from 'dotenv';
dotenv.config();
import connectDB from './src/config/db.js';
import app from './app.js';

const PORT = process.env.PORT ;


connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
  });
}).catch((err) => {
  console.log(err);
});

