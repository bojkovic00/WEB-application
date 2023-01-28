import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kasa } from '../model/kasa';
import { Magacin } from '../model/magacin';
import { Preduzece } from '../model/preduzece';
import { Racun } from '../model/racun';
import { Sifra } from '../model/sifra';
import { PreduzecaService } from '../preduzeca.service';









@Component({
  selector: 'app-preduzeca',
  templateUrl: './preduzeca.component.html',
  styleUrls: ['./preduzeca.component.css', '../login/login.component.css']
})
export class PreduzecaComponent implements OnInit {

  constructor(private preduzecaService: PreduzecaService, private router: Router) { }






  sifre: Sifra[] = [];

  ngOnInit(): void {
    this.pdv = 0;
    // this.username = "pred4";
    this.brKasa = 1;
    this.brMagacina = 1;
    this.pozicija = 0;
    console.log("broj kasa   " + this.brKasa);
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    //console.log(this.korisnik.korIme)
    this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe((data: Preduzece) => {

      this.korisnik = data;

    })


    this.preduzecaService.dohvSveSifre().subscribe((data: Sifra[]) => {
      this.sifre = data;
    })
  }

  korisnik: Preduzece;

  message: string;

  idMag;
  nazivMag;

  //username = "pred4";

  brRacuna = 0;
  brMagacina: number;
  brKasa: number = 1;

  brojRacuna;
  nazivBanke;
  Lokacija = "";
  Tip = "";

  prod: string;
  pozicija = 0;

  kase: Kasa[] = [];

  racuni: Racun[] = []

  magacini: Magacin[] = []

  izabraneSifre: Sifra[] = []

  pdv: number;

  nastaviDalje() {
    //unos svega ovoga u bazu 
    //izab sifre , magacini

    if (this.korisnik.korIme == null || this.prod == null || this.izabraneSifre == null || this.pdv == null || this.racuni == null || this.magacini == null || this.kase) {
      this.message="unesite sva polja"
     // return;
    }

    console.log(this.izabraneSifre);
    console.log(this.korisnik.korIme);
    this.preduzecaService.unosInformacija(this.korisnik.korIme, this.prod, this.izabraneSifre, this.pdv, this.racuni, this.magacini, this.kase).subscribe(resp => {
      //alert(resp['message'])
      this.router.navigate(['pred']);
      this.ngOnInit()
    })


    // if (this.prod == "p") { this.router.navigate(['prodavnica']); } else { this.router.navigate(['ugostitelj']) }
  }
  pozicijaMag = 0;
  noviMagacini() {
    this.magacini = [];
    this.pozicijaMag = 0;

  }
  sledeciMag() {
    this.magacini.push({ brMag: this.pozicijaMag, naziv: this.nazivMag })
    this.pozicijaMag++;
  }


  noveKase() {
    this.kase = [];
    console.log(this.brKasa);
    this.pozicija = 0;
  }

  sledeci() {
    // console.log(this.kase[this.pozicija].Lokacija + " " + this.kase[this.pozicija].Tip + "     pozicija: " + this.pozicija);
    this.kase.push({ Lokacija: this.Lokacija, Tip: this.Tip });
    this.pozicija++;

  }

  dodajRacun() {
    let provera = /^[0-9]{3}-[0-9]{12}-[0-9]{2}$/

    if (!(provera.test(this.brojRacuna))) {
      this.message = "Broj racuna nije u dobrom formatu!";
      return;
    }

    this.racuni.push({ brRacuna: this.brojRacuna, nazivBanke: this.nazivBanke });
    this.brRacuna++;

    for (var i = 0; i < this.racuni.length; i++) {
      console.log(this.racuni[i]);
      this.brojRacuna = "";
      this.nazivBanke = "";

    }

  }




  selektujSifru(id, naziv) {
    console.log("sssssss")
    this.izabraneSifre.push({ sifra: id, naziv: naziv });
    this.izabraneSifre.forEach((element, index) => { console.log(element.naziv) })
  }
  diselektujSifru(id) {
    var pomSifra = -1;
    this.izabraneSifre.forEach((element, index) => {
      if (element.sifra == id) index
    });
    delete this.izabraneSifre[pomSifra];
    this.izabraneSifre.forEach((element, index) => { console.log(element.naziv) })
  }

  promenaSifre(event: any) {
    console.log("promena")
    this.izabraneSifre = [];

    var values = event.target.options;

    var opt: any;
    for (var i = 0, iLen = values.length; i < iLen; i++) {
      opt = values[i];
      console.log(i);
      if (opt.selected) {
        console.log("selektuje " + i)
        this.izabraneSifre.push(this.sifre[i]);

      }
      else {
        console.log("deselekt  " + i)
        this.diselektujSifru(i);
        this.izabraneSifre.reduce
      }
    }

  }




}
