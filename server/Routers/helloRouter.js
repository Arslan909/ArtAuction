import { Router, request, response } from 'express';
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary"

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

  try {
    const decodeToken = jwt.verify(token, process.env.secretKey);
    request.user = decodeToken
    next();

  } catch (error) {
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

router.route("/forAution").post(verifyTokenMiddleWare, async (req, res) => {
  const userId = req.user.id
  // const data = req.body
  const data = {
    image: './testImg.jpg',
    description: 'A beautiful landscape painting 2.',
    estimatePrice: 1000,
    category: 'Landscape',
    biddingStartTime: "2024-07-05T20:30:28.793Z",
    biddingEndTime: "2024-07-07T20:30:28.793Z",
    bidStatus: 'bidding',
    fixedPrice: null,
    highestBid: 0,
    highestBidder: null,
    createdAt: new Date('2024-07-03T12:00:00.000Z')
  };
  
  data.userId = userId
  console.log(data);

  try {
    const coludResponse = await cloudinary.uploader.upload(data.image)

    data.image = coludResponse.url;

    const art = new Art(data)

    const dbRepsonse = await art.save();
    res.status(200).send("art post for aution created")
  }
  catch (error) {
    console.error('Error creating art post for auction:', error);
    res.status(500).send(error)
  };


})



router.route("/forSell").get((request, response) => {

  Art.find({
    bidStatus: "selling",
    biddingStartTime: null,
    biddingEndTime: null,
  })
    .then((arts) => {
      console.log(arts);
      response.status(200).send(arts)
    })
    .catch((error) => {
      res.status(500).send(error);
    })

})


router.route('/forSell').post(verifyTokenMiddleWare, async (request, response) => {
  const userId = request.user.id;
  // const data = req.body
  const data = {
    image: './testImg.jpg',
    description: 'A beautiful landscape painting.',
    estimatePrice: 5000,
    category: 'Landscape',
    biddingStartTime: null,
    biddingEndTime: null,
    bidStatus: 'selling',
    fixedPrice: 10,
    highestBid: 0,
    highestBidder: null,
    createdAt: new Date('2024-07-03T12:00:00.000Z')
  };
  data.userId = userId
  console.log(data);

  try {
    const coludResponse = await cloudinary.uploader.upload(data.image)

    data.image = coludResponse.url;

    const art = new Art(data);

    const dbRepsonse = await art.save();
    response.status(200).send("art post for selling created")
  }
  catch (error) {
    console.error('Error creating art for selling:', error);
    response.status(500).json({ message: 'Failed to create art for selling', error: error.message });
  };


});


export default router;