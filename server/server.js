import { config } from 'dotenv';
config({ path: './config.env' });
import mongoose from "mongoose"

import app from "./app.js";


mongoose.connect(process.env.CONN_STR)
  .then((conn) => {
    console.log('DB Connection Successful');
  }).catch((error) => {
    console.log('Some error has occured');
  });




app.listen(6969, () => {
  console.log('server has started...');
})