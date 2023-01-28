import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KupciService } from '../kupci.service';
import { Preduzece } from '../model/preduzece';
import { Sifra } from '../model/sifra';
import { PreduzecaService } from '../preduzeca.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', '../login/login.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private kupciService: KupciService, private preduzecaService: PreduzecaService, private router: Router) { }

  prikaz = 1;

  pristigli() {
    this.prikaz = 1;
  }

  pregledIzvestaja() {
    this.prikaz = 2;
  }

  dodajKupca() {
    this.prikaz = 3;
  }

  dodajPreduzece() {
    this.prikaz = 4;
  }


  odgLice: string;
  pusername: string;
  psifra1: string;
  psifra2: string;
  telefon: string;
  pmail: string;
  pnaziv: string;
  padresa: string;
  pib: number;
  mbroj: string;

  message: string;
  poruka: string;

  registrujPreduzece() {
    this.message = "";
    this.poruka = "";

    if (this.odgLice == null || this.pusername == null || this.psifra1 == null || this.psifra2 == null || this.telefon == null || this.pmail == null || this.pnaziv == null || this.padresa == null || this.pib == null || this.mbroj == null) {
      this.message = "Niste uneli sva polja!";
      return;
    }
    else {

      let provera = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{7,11}$/;
      let peta = /^[A-Z]/;
      let em = /^(.+)@(\w+)(\.\w{2,3})+$/;

      if (!(provera.test(this.psifra1) && peta.test(this.psifra1))) {
        this.message = "Lozinka nije u dobrom formatu!";
        return;
      }
      else if (!(em.test(this.pmail))) {
        this.message = "Nije dobar email!";
        return;
      }
      else {
        if (this.psifra1 != this.psifra2) {
          this.message = "Lozinke se ne poklapaju!";
          return;
        }
        else {
          //PROVERA MESTA

          this.preduzecaService.pretraziKorIme(this.pusername).subscribe(

            (predFromDB: Preduzece) => {
              if (predFromDB != null) {
                this.message = "Korisnik sa datim korisničkim imenom već postoji!";
              } else {

                this.preduzecaService.registerAdmin(this.odgLice, this.pusername, this.psifra1, this.telefon, this.pmail, this.pnaziv, this.padresa, this.pib, this.mbroj, this.url).subscribe(

                  respObj => {
                    if (respObj['message'] == 'ok') {
                      this.message
                        = 'User added'
                    } else {
                      this.message = 'Error'
                    }
                  }
                )
              }
            })
        }


      }




    }


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

          if (img.width > 300 || img.width < 100 || img.height > 300 || img.height < 100) {
             this.message="Velicina slike mora biti izmedju 100px i 300px";
           // img.width = 100;
           // img.height = 100;
            return;
          }

          // this.preduzecaService.dodajLogo(this.korime, this.url).subscribe(data => console.log(data));
        }

      }
    }
  }




  kusername: string;
  ksifra: string;
  kime: string;
  kprezime: string;
  ktelefon: number;
  kbroj: number;

  mmessage: string;
  registrujKupca() {

    this.kupciService.registrujKupca(this.kusername, this.ksifra, this.kime, this.kprezime, this.ktelefon, this.kbroj).subscribe(respObj => {
      if (respObj['message'] == 'ok') {
        this.mmessage
          = 'User added'
      } else {
        this.mmessage = 'Error'
      }
    }
    )
  }

  preduzeca: Preduzece[] = [];


  ngOnInit(): void {
    this.preduzeca = [];

    this.preduzecaService.dohvSveZahteve().subscribe((data: Preduzece[]) => {
      this.preduzeca = data;
      this.preduzecaPrikaz = data;
    })
  }


  username: string;

  prihvatiZahtev(username) {
    this.preduzecaService.prihvatiZahtev(username, "aktivan").subscribe(resp => {
      // alert(resp['message'])

      this.ngOnInit()
    })
  }

  odbijZahtev(username) {

    this.preduzecaService.prihvatiZahtev(username, "neaktivan").subscribe(resp => {
      // alert(resp['message'])

      this.ngOnInit()


    })


  }
  aktiviraj(username) {

    this.preduzecaService.prihvatiZahtev(username, "aktivan").subscribe(resp => {
      //  alert(resp['message'])

      this.ngOnInit()
    })
  }
  deaktiviraj(username) {
    this.preduzecaService.prihvatiZahtev(username, "neaktivan").subscribe(resp => {
      //alert(resp['message'])

      this.ngOnInit()


    })
  }

  ///////////////////////////////////////////////

  naziv="";
  pibF="";
  datumOdd = "";
  datumDoo = "";

  datumOd = "2000-01-01";
  datumDo = "2030-01-01";
  preduzecaPrikaz: Preduzece[] = []

  ind: number[]

  filtriraj() {
    this.preduzecaPrikaz = [];
    /**
     *      pred.proizvodi.forEach((article, index) => {
      
            var article_name = article.naziv.toLowerCase();
            if(article.proizvodjac!=null) var article_pro = article.proizvodjac.toLowerCase();
            if (article_name.indexOf(this.naziv.toLowerCase()) !== -1) {
              console.log("ejeee")
               if (article_pro==null || article_pro.indexOf(this.proizvodjac.toLowerCase()) !== -1) {
              this.svi.push(article);
            this.pro.push(pred.pro[index])
              }
            }
          })
      
     */

     if (this.datumOd == "" || this.datumDo == "") {
       return;
     }
 

     this.datumOd=this.datumOdd;
     this.datumDo=this.datumDoo;
    console.log(this.naziv)

    this.preduzeca.forEach((pred, index) => {
      console.log(pred.naziv)
      var name = this.naziv;
      console.log("NAME " + name)
      console.log("MMMM " + pred.naziv.toLowerCase())
      if (pred.naziv.indexOf(name) !== -1) {

        if (pred.pib.indexOf(this.pibF) !== -1) {

          console.log("USAO")
          console.log("dd" + pred.naziv.toLowerCase())
          //  this.preduzecaPrikaz.splice(index,1)
          this.preduzecaPrikaz.push(pred);
        }
      }

    })


    this.preduzecaPrikaz.forEach((pred) => {
      console.log(pred.naziv + "sssssssssssss")
    })


  }










}
