import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MagaciniStanje } from 'src/app/model/magaciniStanje';
import { Preduzece } from 'src/app/model/preduzece';
import { Roba } from 'src/app/model/roba';
import { PreduzecaService } from 'src/app/preduzeca.service';

@Component({
  selector: 'app-robe',
  templateUrl: './robe.component.html',
  styleUrls: ['./robe.component.css']
})
export class RobeComponent implements OnInit {

  constructor(private router: Router, private preduzecaService: PreduzecaService) { }



  ngOnInit(): void {
    this.magStanje=[]
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    console.log(this.korisnik.korIme)
    this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe((data: Preduzece) => {

      this.korisnik = data;
      this.svaRoba = data.proizvodi;

      for (var i = 0; i < this.svaRoba.length; i++) {
        this.odabran[i] = false;

        if (i < 10) { this.robaStr[i] = this.svaRoba[i] }


        console.log("promenio")
      }

      this.brojevi = []
      for (var i = 0; i < this.svaRoba.length / 10 + ((this.svaRoba.length % 10 == 0) ? 1 : 0); i++) {
        this.brojevi.push(i + 1)

      }



      this.korisnik.magacini.forEach(m => {

        this.magStanje.push({ magacin: m.naziv, nabavnaCena: null, prodajnaCena: null, lager: null, minKol: null, maxKol: null })

      })
    })

    this.stopa = 0
    this.url = null;
  }


  korisnik: Preduzece;

  svaRoba: Roba[] = []
  robaStr: Roba[] = []
  brojevi: number[] = []
  magStanje: MagaciniStanje[] = []

  br = 1;

  promenaBr(br) {
    this.br = br;
    console.log(this.br)
    for (var i = 0; i < 10; i++) {
      if (this.svaRoba[i + (this.br - 1) * 10]) { this.robaStr[i] = this.svaRoba[i + (this.br - 1) * 10] } else { this.robaStr[i] = null }

    }

    //this.ngOnInit();
  }

  preth() {
    if (this.br != 1) { this.br--; }
    this.promenaBr(this.br);
  }

  next() {
    if (this.br < this.brojevi.length) { this.br++; }
    this.promenaBr(this.br);
  }





  sifra: number;
  naziv: string;
  jedMere: string;
  nabavnaCena: number;
  prodajnaCena: number;
  stopa: number;
  proizvodjac: string;
  magacinID: string;

  zemljaPorekla: string;
  straniNaziv: string;
  barkod: string;
  nazivProizvodjaca: string;
  carinskaTarifa: number;
  ekotaksa: number;
  akcize: number;
  minZalihe: number;
  maxZalihe: number;
  opis: string;
  deklaracija: string;

  lager: number;
  minKol: number;
  maxKol: number;

  proizvod: Roba;

  unosFlag = 0;
  unos() {
    this.unosFlag = 1;
  }


  messagePro = ""
  kaa = "";

  dodajProizvod() {

    if (this.sifra == null || this.naziv == null || this.jedMere == null || this.stopa == null) {
      this.messagePro = "Unesite sve opšte podatke"
      return;
    }
    if (this.url == null) {
      this.url = "../../assets/proizvMali.png";
    }

    //PROVERA SIFRE
    var isto = 0;
    this.svaRoba.forEach(data => {

      if (data.sifra == this.sifra) {
        this.messagePro = "Sifra mora biti jedinstvena!"
        isto = 1;
        console.log("ISTA SIFRA")

      }

    })
    if (isto) { return; }

    console.log(this.sifra, this.naziv, this.jedMere, this.stopa, this.proizvodjac)
    if (this.kaa == "") {
      this.proizvod = {
        sifra: this.sifra, naziv: this.naziv, jedMere: this.jedMere, stopa: this.stopa, proizvodjac: this.proizvodjac, zemljaPorekla: this.zemljaPorekla,
        straniNaziv: this.straniNaziv, barkod: this.barkod, nazivProizvodjaca: this.nazivProizvodjaca, carinskaTarifa: this.carinskaTarifa, ekotaksa: this.ekotaksa, akcize: this.akcize, minZalihe: this.minZalihe, maxZalihe: this.maxZalihe, opis: this.opis, deklaracija: this.deklaracija, magacini: this.magStanje
        , kkategorija: "", potkategorija: "", narucenaKolicina: 0, porez: 0, img: this.url
      }
    }else{
      this.proizvod = {
        sifra: this.sifra, naziv: this.naziv, jedMere: this.jedMere, stopa: this.stopa, proizvodjac: this.proizvodjac, zemljaPorekla: this.zemljaPorekla,
        straniNaziv: this.straniNaziv, barkod: this.barkod, nazivProizvodjaca: this.nazivProizvodjaca, carinskaTarifa: this.carinskaTarifa, ekotaksa: this.ekotaksa, akcize: this.akcize, minZalihe: this.minZalihe, maxZalihe: this.maxZalihe, opis: this.opis, deklaracija: this.deklaracija, magacini: this.magStanje
        , kkategorija: this.kaa, potkategorija: "", narucenaKolicina: 0, porez: 0, img: this.url
      }
    }


    this.preduzecaService.dodajProizvod(this.korisnik.korIme, this.proizvod).subscribe(
      resp => {
        // alert(resp['message'])
        this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe(

          (predFromDB: Preduzece) => {
            if (predFromDB != null) {
              this.svaRoba = predFromDB.proizvodi;

            }
          }

        )
        this.ngOnInit()
      })

    //this.ngOnInit()

    this.sifra = null;
    this.naziv = "";
    this.jedMere = "";
    this.nabavnaCena = null;
    this.prodajnaCena = null;
    this.stopa = null;
    this.proizvodjac = "";
    this.magacinID = "";

    this.zemljaPorekla = "";
    this.straniNaziv = "";
    this.barkod = "";
    this.nazivProizvodjaca = "";
    this.carinskaTarifa = null;
    this.ekotaksa = null;
    this.akcize = null;
    this.minZalihe = null;
    this.maxZalihe = null;
    this.opis = "";
    this.deklaracija = "";

    this.lager = null;
    this.minKol = null;
    this.maxKol = null;

    this.unosFlag = 0;
    this.messagePro = "";
    this.kaa="";
  }



  odabran: boolean[] = [];

  obrisiPro = false;
  hideObrisiPro() { this.obrisiPro = false; }
  obrisiProizvodMod() { this.obrisiPro = true; }

  stari: Roba;
  odaberiProizvod(pro, index) {
    this.index = index;
    this.stari = pro;
    this.odabran[index + (this.br - 1) * 10] = !this.odabran[index + (this.br - 1) * 10];
    console.log(index + (this.br - 1) * 10);
    this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe(

      (predFromDB: Preduzece) => {
        if (predFromDB != null) {
          this.svaRoba = predFromDB.proizvodi;

        }
      }

    )

    //  console.log(this.odabran)


  }


  izmenaFlag = 0;
  izmena() {

    this.izmenaFlag = 1;
  }


  izmeniProizvod() {

    console.log(this.index + (this.br - 1) * 10);


    this.svaRoba[this.index + (this.br - 1) * 10] = this.stari
    console.log(this.index + (this.br - 1) * 10)
    console.log(this.svaRoba[this.index + (this.br - 1) * 10])

    this.preduzecaService.izmeniProizvod(this.korisnik.korIme, this.svaRoba).subscribe(
      resp => {

        this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe(

          (predFromDB: Preduzece) => {
            if (predFromDB != null) {
              this.svaRoba = predFromDB.proizvodi;
            }

            this.odabran[this.index + (this.br - 1) * 10] = !this.odabran[this.index + (this.br - 1) * 10];
          }
        )

        this.izmenaFlag = 0;
      })

  }

  index: number;

  obrisiProizvod() {
    for (var i = 0; i < this.robaStr.length; i++) {
      this.svaRoba[i + (this.br - 1) * 10] = this.robaStr[i]

    }
    this.odabran[this.index + (this.br - 1) * 10] = !this.odabran[this.index + (this.br - 1) * 10];


    this.preduzecaService.obrisiProizvod(this.korisnik.korIme, this.stari).subscribe(
      resp => {
        // alert(resp['message'])
        this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe(

          (predFromDB: Preduzece) => {
            if (predFromDB != null) {
              this.svaRoba = predFromDB.proizvodi;

              for (var i = 0; i < 10; i++) {
                if (this.svaRoba[i + (this.br - 1) * 10]) { this.robaStr[i] = this.svaRoba[i + (this.br - 1) * 10] } else { this.robaStr[i] = null }

              }
              this.brojevi = []
              for (var i = 0; i < this.svaRoba.length / 10 + ((this.svaRoba.length % 10 == 0) ? 1 : 0); i++) {
                this.brojevi.push(i + 1)

              }


            }
          }

        )
      }


    )



  }



  //////DOPUNSKI
  prikaz3 = 1;

  opstiPodaci() {
    this.prikaz3 = 1;
  }

  dopunskiPodaci() {
    this.prikaz3 = 2;
  }
  ceneistanjeRobe() {
    this.prikaz3 = 3;
  }
  //////////////////////
  prikaz1 = 1;

  opstiPodaci1() {
    this.prikaz1 = 1;
  }

  dopunskiPodaci1() {
    this.prikaz1 = 2;
  }
  ceneistanjeRobe1() {
    this.prikaz1 = 3;
  }




  image;
  url: string | ArrayBuffer;

  handleFileInput(event) {

    let file = event.target.files[0];

    this.image = file;
    console.log(file, "  file koji se salje")

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        var img = new Image();
        img.src = reader.result as string;
        console.log(img.src)
        this.url = reader.result;
        img.onload = () => {


        }

      }
    }
  }







}
