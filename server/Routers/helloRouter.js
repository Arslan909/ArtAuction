import { Router } from 'express';

// definations of action function for the routes
import * as helloControllers from "../Controllers/helloControllers.js";
// models // temporary import
import Art from '../Models/Art.js';



const router = Router();

// router.route('/')
//   .get(helloControllers.helloAll)
//   .post(helloControllers.saveDataMongo)

// router.route("/:id")
//   .get(helloControllers.helloUser)


router.route("/forAution").get((req, res) => {
  const currentDate = new Date()

  const arts = new Art.find({
    biddingStartTime: { $lte: currentDate },
    biddingEndTime: { $gte: currentDate }
  })
    .then((res) => {
      console.log(res)
      // calculate duration for each post

      const result = res.map(ele => {

        let duration = ele.biddingEndTime - currentDate
        return {
          "duration": duration,
          data: ele
        }

      })

      res.status(200).send(result)
    })
    .catch((error) => {
      res.status(500).send(error);
    })

})

router.route("/forAution").post((req, res) => {
  const userId = req.user.userId
  const data = res.body

  data.userId = userId

  const Art = new Art(data)

  Art.save().then(() => {
    res.status(200).send("art post for aution created")
  })
    .catch((error) => {
      res.status(500).send(error);
    })


})

export default router;