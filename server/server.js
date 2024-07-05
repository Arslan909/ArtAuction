import { config } from 'dotenv';
config({ path: './config.env' });
import mongoose from "mongoose"
import cloudinary from "cloudinary"

import app from "./app.js";


mongoose.connect(process.env.CONN_STR)
  .then((conn) => {
    console.log('DB Connection Successful');

    cloudinary.v2.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.cloud_api_key,
      api_secret: process.env.cloud_api_secret,
      secure: true,
    });

  }).catch((error) => {
    console.log('Some error has occured');
  });






app.listen(6969, () => {
  console.log('server has started...');
})