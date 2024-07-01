import { application } from 'express';
import express from 'express';

import helloRouter from './Routers/helloRouter.js';




let app = express();
app.use(express.json());
app.use(express.static('./public'))



app.use('/hello', helloRouter)

app.use("/ArtPost")


export default app;