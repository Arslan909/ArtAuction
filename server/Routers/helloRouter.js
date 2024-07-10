import { Router, request, response } from 'express';
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary"
import multer from 'multer';
import path from 'path'


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


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/arslan/programming/ArtAuction/server/Routers/uploads'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '_' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });


// Routes

router.route("/forAuction").get((req, res) => {
  let currentDate = new Date()

  Art.find({
    bidStatus: "bidding",
    biddingStartTime: { $lte: currentDate },
    biddingEndTime: { $gte: currentDate },
  })
    .then((arts) => {

      const result = arts.map(ele => {

        let milliSec = ele.biddingEndTime.getTime() - currentDate.getTime()
        // Todo: change the duration in H/M/S fomrat
        // let sec  = Math.floor(milliSec/1000)
        // const hours = Math.floor(sec/3600)
        // sec %= 3600
        // const minutes = Math.floor(sec/60)
        // sec %= 60
        const totalSeconds = Math.floor(milliSec / 1000)

        const duration = {
          "totalSeconds": totalSeconds
        }

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


router.route("/postDetails/:id").get((request, response) => {
  const postId = request.params.id
  Art.findOne({
    _id: postId
  })
    .then((art) => {
      let currentDate = new Date()
      // console.log(currentDate);
      let duration = {}

      if (art.bidStatus == "bidding") {
        let milliSec = art.biddingEndTime.getTime() - currentDate.getTime()
        // let sec = Math.floor(milliSec / 1000)

        // const hours = Math.floor(sec / 3600)
        // sec %= 3600
        // const minutes = Math.floor(sec / 60)
        // sec %= 60

        // duration = {
        //   "hours": hours,
        //   "minutes": minutes,
        //   "seconds": sec
        // }
        const totalSeconds = Math.floor(milliSec / 1000)

        duration = {
          "totalSeconds": totalSeconds
        }

      } else {
        duration = null
      }

      console.log({ duration: duration, data: art });
      response.status(200).json({ duration: duration, data: art })
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send(error);
    })

})





router.route('/createPost').post(verifyTokenMiddleWare, upload.single('image'), async (request, response) => {
  const userId = request.user.id;
  const data = request.body

  if (data.bidStatus === 'bidding') {
    if (!data.biddingStartTime || !data.biddingEndTime) {
      response.status(404).send('Bidding start and end times are required when status is set to bidding');
    }
  }

  const file = request.file
  data.userId = userId

  console.log(data);

  try {
    const coludResponse = await cloudinary.uploader.upload(file.path)

    data.image = coludResponse.url;
    const art = new Art(data);

    const dbRepsonse = await art.save();
    response.status(200).send("art post created")
  }
  catch (error) {
    console.error('Error creating art post:', error);
    response.status(500).json({ message: 'Failed to create art post', error: error.message });
  };


});


export default router;