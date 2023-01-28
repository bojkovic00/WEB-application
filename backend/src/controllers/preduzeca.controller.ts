import { Console } from 'console';
import express, { response } from 'express'
import PredModel from '../models/preduzeca'
import SifreModel from '../models/sifre'
export class PreduzecaController {
    login = (req: express.Request, res: express.Response) => {
        console.log("pozvao server");
        //req body pakujem kod login komponente, znaci kako se zovu u login ts
        let username = req.body.username;


        PredModel.findOne({ 'korIme': username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        }
        )
    }


    register = (req: express.Request, res: express.Response) => {


        // let pred=new PredModel(req.body)

        let pred = new PredModel({
            odgLice: req.body.odgLice,
            korIme: req.body.pusername,
            lozinka: req.body.psifra1,
            telefon: req.body.telefon,
            mail: req.body.pmail,
            naziv: req.body.pnaziv,
            adresa: req.body.padresa,
            pib: req.body.pib,
            mbroj: req.body.mbroj,
            img: req.body.img,
            prihvacen: "",
            kategorija: "",
            sifra: "",
            pdv: "",
            racuni: "",
            magacini: [],
            kase: "",
            prvo:1
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

    registerAdmin = (req: express.Request, res: express.Response) => {


        // let pred=new PredModel(req.body)

        let pred = new PredModel({
            odgLice: req.body.odgLice,
            korIme: req.body.pusername,
            lozinka: req.body.psifra1,
            telefon: req.body.telefon,
            mail: req.body.pmail,
            naziv: req.body.pnaziv,
            adresa: req.body.padresa,
            pib: req.body.pib,
            mbroj: req.body.mbroj,
            img: req.body.img,
            prihvacen: "aktivan",
            kategorija: "",
            sifra: "",
            pdv: "",
            racuni: "",
            magacini: [],
            kase: "",
            prvo:1
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


    pretraziKorIme = (req: express.Request, res: express.Response) => {

        let username = req.body.pusername;

        PredModel.findOne({ 'korIme': username }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        }
        )

    }

    pretraziEmail = (req: express.Request, res: express.Response) => {

        let mail = req.body.mail;

        PredModel.findOne({ 'mail': mail }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        }
        )

    }

    dohvSveZahteve = (req: express.Request, res: express.Response) => {
        PredModel.find({}, (err, news) => {
            if (err) console.log(err)
            else res.json(news)
        })
    }


    obrisiPred = (req: express.Request, res: express.Response) => {
        let username = req.body.pusername;

        PredModel.deleteOne({ 'korIme': username }, (err, resp) => {
            if (err) console.log(err);
            else res.json({ 'message': 'ok' })
        })
    }

    prihvatiZahtev = (req: express.Request, res: express.Response) => {
        let username = req.body.pusername;
        let prihv = req.body.prihv;

        PredModel.updateOne({ 'korIme': username }, { $set: { 'prihvacen': prihv } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })
    }


    dohvSveSifre = (req: express.Request, res: express.Response) => {
        SifreModel.find({}, (err, news) => {
            if (err) console.log(err)
            else res.json(news)
        })
    }





    unosInformacija = (req: express.Request, res: express.Response) => {
        console.log("stigaooooo");

        let username = req.body.username;
        let kategorija = req.body.kategorija;

        console.log(username);
        console.log(kategorija);

        let sifra = req.body.sifra;
        let pdv = req.body.pdv;
        let racuni = req.body.racuni;
        let magacini = req.body.magacini;
        let kase = req.body.kase;

        PredModel.updateOne({ 'korIme': username }, { $set: { 'kategorija': kategorija, 'sifra': sifra, 'pdv': pdv, 'racuni': racuni, 'magacini': magacini, 'kase': kase,'prvo':0 } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })




    }

    potvrdaPromOpste = (req: express.Request, res: express.Response) => {


        let username = req.body.username;
        let odgLice = req.body.odgLice;
        let telefon = req.body.telefon;
        let mail = req.body.mail;


        PredModel.updateOne({ 'korIme': username }, { $set: { 'odgLice': odgLice, 'telefon': telefon, 'mail': mail } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })

    }


    potvrdaPromRacuna = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let racuni = req.body.racuni;



        PredModel.updateOne({ 'korIme': username }, { $set: { 'racuni': racuni } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })
    }


    potvrdaPromMagacina = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let magacini = req.body.magacini;


        PredModel.updateOne({ 'korIme': username }, { $set: { 'magacini': magacini } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })

    }
    potvrdaPromKasa = (req: express.Request, res: express.Response) => {
        console.log("stigao");

        let username = req.body.username;
        let kase = req.body.kase;


        PredModel.updateOne({ 'korIme': username }, { $set: { 'kase': kase } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })

    }


    dodajNarucioca = (req: express.Request, res: express.Response) => {
        console.log("stigao");

        let username = req.body.username;
        let narucilac = req.body.narucilac;


        PredModel.updateOne({ 'korIme': username }, { $push: { 'narucioci': narucilac } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })

    }


    pretraziPIB = (req: express.Request, res: express.Response) => {

        let pib = req.body.pib;
        PredModel.find({ 'pib': pib }, (err, news) => {
            if (err) console.log(err)
            else res.json(news)
        })


    }


    dodajProizvod = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let proizvod = req.body.proizvod;
        console.log("dodaj USAO")
        console.log(username)

        PredModel.updateOne({ 'korIme': username }, { $push: { 'proizvodi': proizvod } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })


    }

    izmeniProizvod = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let proizvodi = req.body.proizvodi;

        proizvodi.forEach((element, index) => { console.log(element.naziv) })

        PredModel.updateOne({ 'korIme': username }, { $set: { 'proizvodi': proizvodi } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })

    }


    obrisiProizvod = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let proizvod = req.body.proizvod;

        PredModel.updateOne({ 'korIme': username, 'proizvodi.sifra': proizvod.sifra }, { $pull: { 'proizvodi': proizvod } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'deleeted' })
        })


    }




    dodajStavkuRacuna = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let rac = req.body.rac;




        PredModel.updateOne({ 'korIme': username }, { $set: { 'naruceno': rac } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })


    }


    dodajStavkuZatvoren = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let rac = req.body.rac;




        PredModel.updateOne({ 'korIme': username }, { $push: { 'zatvoreno': rac } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })


    }


    file = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let file = req.body.file;

        PredModel.updateOne({ 'korIme': username }, { $set: { 'img': file } }, (err, resp) => {
            if (err) console.log(err)
            res.json({ 'message': 'updated' })
        })

    }




    dodajPazar = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let rac = req.body.rac;

        console.log("pazar stigao")


        PredModel.updateOne({ 'korIme': username }, { $set: { 'pazari': rac } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })


    }


    dodajSto = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let sto = req.body.sto;


        PredModel.updateOne({ 'korIme': username }, { $push: { 'stolovi': sto } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })



    }

    promeniStatus= (req: express.Request, res: express.Response) => {

        console.log("promena status")
        let username = req.body.username;
        let id = req.body.id;
        let zauzet = req.body.zauzet; 


        PredModel.updateOne({ 'korIme': username,'stolovi.id': id }, { $set: { 'stolovi.$.zauzet': zauzet } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })



    }



    izmeniOdeljenja = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let odeljenja = req.body.odeljenja;




        PredModel.updateOne({ 'korIme': username }, { $set: { 'odeljenja': odeljenja } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })


    }


    azurirajKor = (req: express.Request, res: express.Response) => {

        let username = req.body.username;
        let sifra = req.body.sifra;




        PredModel.updateOne({ 'korIme': username }, { $set: { 'lozinka': sifra } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'updated' })
        })


    }




    filtrirajProizvode = (req: express.Request, res: express.Response) => {

        let naziv = req.body.naziv;
    
    
        
    
    
    
    }







}

