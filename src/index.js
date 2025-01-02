import { app } from '../src/app.js';
import dotenv from 'dotenv';
import connectDb from './db/index.js';
const port = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`DB connected,app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Failed to connect DB ${err}`);
  });
