import express from 'express'
import { PreduzecaController } from '../controllers/preduzeca.controller'

const preduzecaRouter = express.Router();

preduzecaRouter.route('/login').post(
    (req, res) => new PreduzecaController().login(req, res)
)

preduzecaRouter.route('/register').post(
    (req, res) => new PreduzecaController().register(req, res)
)

preduzecaRouter.route('/pretraziKorIme').post(
    (req, res) => new PreduzecaController().pretraziKorIme(req, res)
)

preduzecaRouter.route('/pretraziEmail').post(
    (req, res) => new PreduzecaController().pretraziEmail(req, res)
)

preduzecaRouter.route('/dohvSveZahteve').get(
    (req, res) => new PreduzecaController().dohvSveZahteve(req, res)
)

preduzecaRouter.route('/obrisiPred').post(
    (req, res) => new PreduzecaController().obrisiPred(req, res)
)

preduzecaRouter.route('/prihvatiZahtev').post(
    (req, res) => new PreduzecaController().prihvatiZahtev(req, res)
)

preduzecaRouter.route('/dohvSveSifre').get((req, res) => new PreduzecaController().dohvSveSifre(req, res))


preduzecaRouter.route('/unosInformacija').post(
    (req, res) => new PreduzecaController().unosInformacija(req, res)
)

preduzecaRouter.route('/potvrdaPromOpste').post(
    (req, res) => new PreduzecaController().potvrdaPromOpste(req, res)
)

preduzecaRouter.route('/potvrdaPromRacuna').post(
    (req, res) => new PreduzecaController().potvrdaPromRacuna(req, res)
)

preduzecaRouter.route('/potvrdaPromMagacina').post(
    (req, res) => new PreduzecaController().potvrdaPromMagacina(req, res)
)

preduzecaRouter.route('/potvrdaPromKasa').post(
    (req, res) => new PreduzecaController().potvrdaPromKasa(req, res)
)


preduzecaRouter.route('/dodajNarucioca').post(
    (req, res) => new PreduzecaController().dodajNarucioca(req, res)
)

preduzecaRouter.route('/pretraziPIB').post(
    (req, res) => new PreduzecaController().pretraziPIB(req, res)
)

preduzecaRouter.route('/dodajProizvod').post(
    (req, res) => new PreduzecaController().dodajProizvod(req, res)
)



preduzecaRouter.route('/izmeniProizvod').post(
    (req, res) => new PreduzecaController().izmeniProizvod(req, res)
)


preduzecaRouter.route('/obrisiProizvod').post(
    (req, res) => new PreduzecaController().obrisiProizvod(req, res)
)

preduzecaRouter.route('/dodajStavkuRacuna').post(
    (req, res) => new PreduzecaController().dodajStavkuRacuna(req, res)
)

preduzecaRouter.route('/dodajStavkuZatvoren').post(
    (req, res) => new PreduzecaController().dodajStavkuZatvoren(req, res)
)


preduzecaRouter.route('/file').post(
    (req, res)  => new PreduzecaController().file(req, res)
       
  
)

preduzecaRouter.route('/dodajPazar').post(
    (req, res)  => new PreduzecaController().dodajPazar(req, res)
       
  
)

preduzecaRouter.route('/dodajSto').post(
    (req, res)  => new PreduzecaController().dodajSto(req, res)
       
  
)


preduzecaRouter.route('/promeniStatus').post(
    (req, res)  => new PreduzecaController().promeniStatus(req, res)
       
  
)

preduzecaRouter.route('/izmeniOdeljenja').post(
    (req, res)  => new PreduzecaController().izmeniOdeljenja(req, res)
       
  
)


preduzecaRouter.route('/azurirajKor').post(
    (req, res)  => new PreduzecaController().azurirajKor(req, res)
       
  
)


preduzecaRouter.route('/filtrirajProizvode').post(
    (req, res)  => new PreduzecaController().filtrirajProizvode(req, res)
       
  
)


preduzecaRouter.route('/registerAdmin').post(
    (req, res)  => new PreduzecaController().registerAdmin(req, res)
       
  
)










export default preduzecaRouter;