import express from 'express'
import { KupciController } from '../controllers/kupci.controller'

const kupciRouter = express.Router();

kupciRouter.route('/login').post(
    (req, res) => new KupciController().login(req, res)
)

kupciRouter.route('/pretraziKorIme').post(
    (req, res) => new KupciController().pretraziKorIme(req, res)
)



kupciRouter.route('/registrujKupca').post(
    (req, res) => new KupciController().registrujKupca(req, res)
)


kupciRouter.route('/dohvSvaPreduzeca').get(
    (req, res) => new KupciController().dohvSvaPreduzeca(req, res)
)



export default kupciRouter;