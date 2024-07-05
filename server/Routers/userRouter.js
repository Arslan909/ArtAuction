import { Router, request, response } from 'express';

import UsersInfo from '../Models/Users.js';
import jwt from "jsonwebtoken";

const router = Router();


router.route("/signup").post((request, response) => {

  const data = request.body

  const newUser = new UsersInfo(data)

  newUser.save().then((resulst) => {
    console.log(resulst);
    response.status(200).send("new user is signed up")

  })
    .catch((error) => {
      if (error.code === 11000) { // if user name is duplicate 
        response.status(400).send({ message: 'User already exists', error });
      } else {
        response.status(500).send({ message: 'Error signing up user', error });
      }
    })

})

router.route("/login").post(async (request, response) => {
  if (request.body.email && request.body.password) {
    const user = await UsersInfo.findOne(request.body)

    if (user) {
      const payload = {
        id: user._id,
        userName: user.userName,
        email: user.email
      }
      const token = jwt.sign(payload, process.env.secretKey, { expiresIn: "24h" })

      response.status(200).json({ token, userId: user._id });
    } else {
      response.status(404).json({ message: "invalid email or password" });
    }

  } else {
    response.status(400).json({ message: "invalid request" });
  }

})



export default router;