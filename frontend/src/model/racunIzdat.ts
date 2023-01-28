import { Roba } from "./roba";

export class racunIzdat {
  idStola: number;
  proizvod: Array<Roba>;
  porez: number;
  kupacLicna: number;
  otvoren: boolean;
  datum: Date;

  nazivPred: string;
  nazivOdeljenja: number
  iznos: number;
  nacinPlacanja: string;

  cene: number[];
  porezi: number[];
  kolicine: number[];


}