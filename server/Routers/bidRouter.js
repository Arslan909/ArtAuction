import { Router, request, response } from 'express';
import jwt from "jsonwebtoken";

// models // temporary import
import Art from '../Models/Art.js';
import app from '../app.js';

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


router.route("/updateBid").put(verifyTokenMiddleWare, async (request, response) => {
  const bidValue = request.body.bidValue
  const postId = request.body.id
  const userId = request.user.id

  try {
    let post = await Art.findOne({ _id: postId })
    console.log(post);
    if (!post) {
      response.status(404).json({ message: "Art post not found!" })

    }
    if (bidValue > post.highestBid && post.bidStatus === "bidding") {
      const updatedPost = await Art.findByIdAndUpdate(
        postId,
        {
          highestBid: bidValue,
          highestBidder: userId
        },
        { runValidators: true }
      )

      response.status(201).json({ message: "art bid value updated" })

    } else if (bidValue <= post.highestBid) {
      response.status(200).json({ message: "your bid value should be atleast 1 point bigger then latest bid" })
    }

  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "error occured in updating bid value", error })


  }

})



router.route("/sucessfulBid").get(verifyTokenMiddleWare, async (request, response) => {
  const userId = request.user.id

  try {

    const posts = await Art.find({
      highestBidder:userId
    })

    response.status(200).json(posts)

  } catch (error) {
    console.log(error);
    response.status(500).send("error ocurred getting user sucessfull bids")
  }

})


export default router