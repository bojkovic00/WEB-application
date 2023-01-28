import express, { response } from 'express'
import KupciModel from '../models/kupci'
import PredModel from '../models/preduzeca'

export class KupciController {
    login = (req: express.Request, res: express.Response) => {
        console.log("pozvao server");
        //req body pakujem kod login komponente, znaci kako se zovu u login ts
        let username = req.body.username;
     

        KupciModel.findOne({ 'korime': username}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        }
        )
    }

    pretraziKorIme = (req: express.Request, res: express.Response) => {
        console.log("pozvao server");
        //req body pakujem kod login komponente, znaci kako se zovu u login ts
        let username = req.body.username;
     

        KupciModel.findOne({ 'korime': username}, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        }
        )
    }


    registrujKupca = (req: express.Request, res: express.Response) => {


        // let pred=new PredModel(req.body)

        let pred = new KupciModel({
            korime: req.body.kusername,
            lozinka: req.body.ksifra,
            ime: req.body.kime,
            prezime: req.body.kprezime,
            telefon: req.body.ktelefon,
            brojlk:req.body.kbroj,
        })

        pred.save(
            (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" })
                }
                else res.json({ "message": "ok" })
            }


        )


    }



    dohvSvaPreduzeca = (req: express.Request, res: express.Response) => {


        PredModel.find({ }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        }
        )





    }


}