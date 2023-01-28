import express, { response } from 'express'
import AdminModel from '../models/admin'

export class AdminController {
    login = (req: express.Request, res: express.Response) => {
        console.log("pozvao server");
        //req body pakujem kod login komponente, znaci kako se zovu u login ts
        let username = req.body.username;
     

        AdminModel.findOne({ 'korime': username}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        }
        )
    }



}