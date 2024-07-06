import { application } from 'express';
import express from 'express';
import cors from "cors";

import helloRouter from './Routers/helloRouter.js';
import userRouter from "./Routers/userRouter.js";
import bidRouter from "./Routers/bidRouter.js"




let app = express();
app.use(express.json());
app.use(express.static('./public'))
app.use(cors());



// app.use('/hello', helloRouter)
app.use("/ArtPost", helloRouter)

app.use("/user", userRouter)
app.use("/bid", bidRouter)



export default app;