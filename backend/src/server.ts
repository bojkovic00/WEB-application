import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import kupciRouter from './ruteri/kupci.routers';
import preduzecaRouter from './ruteri/preduzeca.routers';
import adminRouter from './ruteri/admin.routers';


const app = express();
app.use(cors())
app.use(express.json())




mongoose.connect('mongodb://localhost:27017/piaProjekat')
const connection=mongoose.connection
connection.once('open',() => {console.log('db connected')})

const router=express.Router();
router.use('/kupci',kupciRouter)
router.use('/preduzeca',preduzecaRouter)
router.use('/admin',adminRouter)

app.use('/',router)
app.listen(4000, () => console.log(`Express server running on port 4000`));