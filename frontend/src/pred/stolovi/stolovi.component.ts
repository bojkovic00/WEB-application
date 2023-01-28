import { Component, OnInit } from '@angular/core';
import { Router, UrlHandlingStrategy } from '@angular/router';
import { Odeljenje } from 'src/app/model/odeljenje';
import { odeljenjeBaza } from 'src/app/model/odeljenjeBaza';
import { Preduzece } from 'src/app/model/preduzece';
import { racunIzdat } from 'src/app/model/racunIzdat';
import { Roba } from 'src/app/model/roba';
import { Table } from 'src/app/model/sto';
import { stoBaza } from 'src/app/model/stoBaza';
import { PreduzecaService } from 'src/app/preduzeca.service';

@Component({
  selector: 'app-stolovi',
  templateUrl: './stolovi.component.html',
  styleUrls: ['./stolovi.component.css', '../pred.component.css']
})
export class StoloviComponent implements OnInit {

  constructor(private router: Router, private preduzecaService: PreduzecaService) { }

  odeljenjaBaza: odeljenjeBaza[] = []
  stolovi: Table[] = [];


  ngOnInit(): void {
    this.odabranoOdeljenje = 0;
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    console.log(this.korisnik.korIme)
    this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe((data: Preduzece) => {

      this.korisnik = data;
      this.svaRoba = data.proizvodi;
      this.odeljenjaBaza = data.odeljenja;

      if (this.odeljenjaBaza == null || this.odeljenjaBaza.length == 0) {
        console.log("odeljenja")
        this.odeljenjaBaza.push({
          id: 0,
          naziv: "restoran",
          stolovi: []
        })


        this.preduzecaService.izmeniOdeljenja(this.korisnik.korIme, this.odeljenjaBaza).subscribe(data => { });
      }

      console.log(this.odeljenjaBaza)
      this.odeljenjaBaza[this.odabranoOdeljenje].stolovi.forEach(sto => {

        var st = new Table(sto.path_to_image, sto.width, sto.height,
          sto.id, sto.trenY, sto.trenX, this, sto.odeljenje, sto.tip, 1)
        this.stolovi.push(st);
        if (sto.zauzet == 1) {
          st.trenX = sto.trenX;
          st.trenY = sto.trenY;
          st.fja();
        }
        console.log(sto.trenX + " sto.trenX");
        st.trenX = sto.trenX;
        st.trenY = sto.trenY;



      })

      this.idStola = 0;
      this.odeljenjaBaza.forEach(od => {
        od.stolovi.forEach(element => {

          if (element.id > this.idStola) this.idStola = element.id;
        });

      })


      console.log(this.idStola + "   ID sTOLAAAAAA");
      this.idStola++;

    })

    this.si = 20;
    this.d = 10;
    for (let i = 0; i < 20; i++) {
      this.sirina[i] = i;

    }

    for (let j = 0; j < 10; j++) { this.duzina[j] = j; }



    this.odeljenja.push({ naziv: "restoran", stolovi: [] })
    this.izabranMagacin = ""
    //NIJE OK



  }


  korisnik: Preduzece;
  svaRoba: Roba[] = []

  prikaziOd = false;
  hideOdeljenje() {
    this.prikaziOd = false
  }
  odeljModal() { this.prikaziOd = true }

  hideSto() { this.prikaziDodaj = false }

  prikaziDodaj = false
  dodajSto() {
    this.prikaziDodaj = true
  }

  prikaziOdeljenje(naziv) {
    console.log("fja " + this.odeljenjaBaza[this.odabranoOdeljenje].stolovi.length + " odelj " + this.odabranoOdeljenje);

    if (this.odeljenjaBaza[this.odabranoOdeljenje].stolovi.length > 0) {
      console.log("iiii");
      this.stolovi[0].removeChilds(this.odeljenjaBaza[this.odabranoOdeljenje].stolovi.length)
    }

    this.odeljenjaBaza.forEach((od, index) => {
      if (od.naziv == naziv) {
        this.odabranoOdeljenje = index;
      }
    })
    console.log(this.odabranoOdeljenje);

    this.stolovi = []

    this.odeljenjaBaza[this.odabranoOdeljenje].stolovi.forEach(sto => {

      var st = new Table(sto.path_to_image, sto.width, sto.height,
        sto.id, sto.trenY, sto.trenX, this, sto.odeljenje, sto.tip, 1)
      this.stolovi.push(st);
      if (sto.zauzet == 1) {
        st.trenX = sto.trenX;
        st.trenY = sto.trenY;
        st.fja();
      }
      console.log(sto.trenX + " sto.trenX");
      st.trenX = sto.trenX;
      st.trenY = sto.trenY;



    })
  }

  odeljenja: Odeljenje[] = []

  odabranoOdeljenje: number;


  novoOdeljenje() {

    this.odeljenjaBaza.push({ id: 2, naziv: this.nazivOdlj, stolovi: [] })

    this.preduzecaService.izmeniOdeljenja(this.korisnik.korIme, this.odeljenjaBaza).subscribe(data => { });


  }

  nazivOdlj: string;

  ////////////////////////////KLIK NA DUGME ZA RASPORED STOLOVA VRV U ON INIT!!
  rasporedStolova() {


    this.odeljenja[this.odabranoOdeljenje].stolovi.forEach(sto => {

      sto.fja2(sto.path_to_image);

    })

  }





  idStola: number;
  sirinaStola="";
  visinaStola="";

  tipStola = "";
  messageSto = "";

  x = 1;
  y = 1;
  noviSto() {
    //DODATI I ZA DIMENZIJU PROVERU
    if (this.tipStola == ""|| this.sirinaStola==""|| this.visinaStola=="") {
      this.messageSto = "Unesite sva polja";
      return;
    }
   // this.sirinaStola = "140px"
    //this.visinaStola = "140px"
    console.log(this.sirinaStola)
    console.log(this.visinaStola)
    console.log(this.odabranoOdeljenje)
    if (this.tipStola == "okrugli") {
      var st = new Table("../../../assets/stoPng.png", this.sirinaStola, this.visinaStola,
        this.idStola, 76, 76, this, this.odabranoOdeljenje, "okrugli", 0)

      var novi = {
        path_to_image: "../../../assets/stoPng.png",
        width: this.sirinaStola,
        height: this.visinaStola,
        id: this.idStola,
        pos_top: 76,
        pos_left: 76,
        odeljenje: this.odabranoOdeljenje,
        tip: "okrugli",
        trenX: 76,
        trenY: 76,
        zauzet: 0

      }
      this.stolovi.push(st)
      this.odeljenjaBaza[this.odabranoOdeljenje].stolovi.push(novi);
      this.preduzecaService.izmeniOdeljenja(this.korisnik.korIme, this.odeljenjaBaza).subscribe(data => {
      });

      // this.preduzecaService.dodajSto(this.korisnik.korIme, novi).subscribe(data => { })
    } else {
      var st = new Table("../../../assets/stoKvadrat.jpg", this.sirinaStola, this.visinaStola, this.idStola, 71 * this.x + this.x * 3 + 2, 71 * this.y + this.y * 3 + 2, this, this.odabranoOdeljenje, "pravougaoni", 0);
      var novi = {
        path_to_image: "../../../assets/stoKvadrat.jpg",
        width: this.sirinaStola,
        height: this.visinaStola,
        id: this.idStola,
        pos_top: 76,
        pos_left: 76,
        odeljenje: this.odabranoOdeljenje,
        tip: "pravougaoni",
        trenX: 76,
        trenY: 76,
        zauzet: 0
      }
      this.stolovi.push(st)
      this.odeljenjaBaza[this.odabranoOdeljenje].stolovi.push(novi);
      this.preduzecaService.izmeniOdeljenja(this.korisnik.korIme, this.odeljenjaBaza).subscribe(data => {

      
      });


      // this.preduzecaService.dodajSto(this.korisnik.korIme, novi).subscribe(data => { })
    }

    // console.log("ns " + this.odeljenja[this.odabranoOdeljenje].stolovi.length + " odelj " + this.odabranoOdeljenje);
    
    this.idStola++;
    this.tipStola ="";this.sirinaStola=""; this.visinaStola="";
  }


  duzina: number[] = [];
  sirina: number[] = [];


  si: number;
  d: number




  id: number;




  showModal: boolean = false;
  hide() {
    this.showModal = false;


  }





  kliknuoId: number;

  otvoriRacun() {


    this.stolovi.forEach(sto => {

      if (sto.id == this.kliknuoId) {
        sto.fja()
        this.odeljenjaBaza.forEach(o => {
          if (o.id == this.odabranoOdeljenje) {
            o.stolovi.forEach(sto => {
              if (sto.id == this.kliknuoId) {

                sto.zauzet = 1;
              }
            })

          }
        })


      }
    })



    this.preduzecaService.izmeniOdeljenja(this.korisnik.korIme, this.odeljenjaBaza).subscribe(data => {
    });


  }
  idijevi: number[];


  narucenoKor: racunIzdat[] = [];
  proiz: Roba[] = [];

  izabranMagacin: string;
  message: string;

  cene: number[] = []
  porezi: number[] = []
  kolicine: number[] = []

  narucenaKolicina=0;

  naruci(proizvod) {

    if (this.narucenaKolicina == 0) {
      this.message = "Unesite kolicinu"
      return;
    }
    if (this.izabranMagacin == "") {
      this.message = "Unesite magacin"
      return;
    }
    var prodajnaCENA;
    this.proiz = []
    this.narucenoKor = [];

    this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe((data: Preduzece) => {
      this.korisnik = data;
      this.narucenoKor = this.korisnik.naruceno;

      this.proiz.push(proizvod);

      //azurirati broj proizvoda u magacinu
      
      proizvod.magacini.forEach(m => {
        //console.log("PPPPP")
        //console.log(m.magacin +     " " + this.izabranMagacin)

        if (m.magacin == this.izabranMagacin) {
          // console.log("poklapa se")

          if (m.lager - this.narucenaKolicina < 0) {
            this.message = "Nema dovoljno proizvoda na stanju";
            return;
          }

          m.lager -= this.narucenaKolicina;
          prodajnaCENA = m.prodajnaCena;

          console.log(prodajnaCENA);
          //IZMENA U BAZIIIIIIIIIIIIIIII
         
          this.preduzecaService.izmeniProizvod(this.korisnik.korIme, this.svaRoba).subscribe(
            resp => {

            })

        }
      })

      //uneti u bazu info o narucivanju
      var postoji = false;
      this.narucenoKor.forEach(data => {

        if (data.idStola == this.kliknuoId) {
          postoji = true;
          //uvecati ukupan porez
          data.porez += this.narucenaKolicina * (proizvod.stopa / 100 * Number(prodajnaCENA));
          console.log(data.porez);

          data.iznos += Number(this.narucenaKolicina) * Number(prodajnaCENA);
          console.log(data.iznos);

          data.proizvod.push(proizvod);
          data.cene.push(Number(prodajnaCENA));
          data.porezi.push(this.narucenaKolicina * (Number(proizvod.stopa) / 100 * Number(prodajnaCENA)))
          data.kolicine.push(this.narucenaKolicina)
          console.log("por" + this.narucenaKolicina * (Number(proizvod.stopa) / 100 * Number(prodajnaCENA)))
          console.log("por" + this.narucenaKolicina)
          console.log("por" + Number(proizvod.stopa))
          console.log("por" + Number(prodajnaCENA))

        }
      })

      if (!postoji) {
        console.log(this.narucenaKolicina + " " + proizvod.stopa + " " + prodajnaCENA)
        var por = this.narucenaKolicina * (proizvod.stopa / 100 * Number(prodajnaCENA));
        console.log(por)

        this.cene = []
        this.porezi = []
        this.kolicine = []

        this.cene.push(Number(prodajnaCENA))
        this.porezi.push(por)
        this.kolicine.push(Number(this.narucenaKolicina))
        console.log("por" + por)

        this.narucenoKor.push({ idStola: this.kliknuoId, proizvod: this.proiz, porez: por, kupacLicna: 0, otvoren: true, datum: null, nazivPred: this.korisnik.naziv, nazivOdeljenja: this.odabranoOdeljenje, iznos: Number(prodajnaCENA)*Number(this.narucenaKolicina), nacinPlacanja: null, cene: this.cene, porezi: this.porezi, kolicine: this.kolicine })
      }

      this.preduzecaService.dodajStavkuRacuna(this.korisnik.korIme, this.narucenoKor).subscribe(
        resp => {
          console.log("azur")
          //vrati narucenu kol na 0

        }
      )



    })








  }

















}
