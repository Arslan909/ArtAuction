import { Router, request, response } from 'express';
import jwt from "jsonwebtoken";

// definations of action function for the routes
import * as helloControllers from "../Controllers/helloControllers.js";
// models // temporary import
import Art from '../Models/Art.js';

const router = Router();

const verifyTokenMiddleWare = (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({ message: "Unauthorized - JWT token missing" });
  }

  const token = authHeader.split(" ")[1];

  try{
    const decodeToken = jwt.verify(token, process.env.secretKey);
    request.user = decodeToken
    next();

  }catch (error) {
    response.status(401).json({ message: "Unauthorized   - Invalid JWT token" });
  }

}




router.route("/").get((req, res) => {
  let currentDate = new Date()

  Art.find({
    biddingStartTime: { $lte: currentDate },
    biddingEndTime: { $gte: currentDate }
  })
    .then((arts) => {

      const result = arts.map(ele => {

        let duration = ele.biddingEndTime.getTime() - currentDate.getTime()
        // console.log(duration);
        // Todo: change the duration in H/M/S fomrat
        return {
          "duration": duration,
          data: ele
        }

      })

      // console.log(result)
      res.status(200).send(result)
    })
    .catch((error) => {
      res.status(500).send(error);
    })

})

router.route("/forAution").post(verifyTokenMiddleWare, (req, res) => {
  const userId = req.user.id
  const data = req.body
  //todo:upload image to cloudinary 
  data.userId = userId
  console.log(data);


  async function uploadImagetoColud(event) {
    setLoader(true)

    if(image !== null){
        let data = new FormData();
        data.append('file', image);
        data.append('upload_preset', "fs0w72qj");
        data.append('cloud_name', "don6c7ggw");

        const response = await fetch("https://api.cloudinary.com/v1_1/don6c7ggw/image/upload", {
            method: "POST",
            body: data
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const imageData = await response.json();
        imageUrl = imageData.url;

    }else{
        imageUrl = productObj.picturelink
    }
}


  const art = new Art(data)

  art.save().then(() => {
    res.status(200).send("art post for aution created")
  })
    .catch((error) => {
      res.status(500).send(error);
    })


})



router.route("/forSell").get((request, response) => {

  Art.find({
    bidStatus: "selling",
    biddingStartTime: null,
    biddingEndTime: null,
  })
  .then((arts)=>{
    console.log(arts);
    response.status(200).send(arts)
  })
  .catch((error) => {
    res.status(500).send(error);
  })

})


router.route("/forSell").post(verifyTokenMiddleWare, (request, response) => {
  const userId = request.user.id
  const data = request.body
  //todo:upload image to cloudinary 
  data.userId = userId
  console.log(data);

  const art = new Art(data)

  art.save().then(() => {
    response.status(200).send("art post for selling created")
  })
    .catch((error) => {
      response.status(500).send(error);
    })


})

export default router;