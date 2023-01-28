import { Component, OnInit } from '@angular/core';
import { Preduzece } from '../model/preduzece';
import { PreduzecaService } from '../preduzeca.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css', '../login/login.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private preduzecaService: PreduzecaService) { }

  odgLice: string;
  pusername: string;
  psifra1: string;
  psifra2: string;
  telefon: string;
  pmail: string;
  pnaziv: string;
  padresa: string;
  pib: string;
  mbroj: string;



  message: string = " ";
  poruka: string = " ";

  ngOnInit(): void {

  }

  register() {
    console.log("registruj");

    this.message = "";
    this.poruka = "";

    if (this.odgLice == null || this.pusername == null || this.psifra1 == null || this.psifra2 == null || this.telefon == null || this.pmail == null || this.pnaziv == null || this.padresa == null || this.pib == null || this.mbroj == null || this.url == null) {
      this.message = "Niste uneli sva polja!";
      console.log(this.message);
      return;
    }
    else {
     // let provera = /^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{7,11}$/;
      
     let provera =/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{7,11}$/
     let em = /^(.+)@(\w+)(\.\w{2,3})+$/;
      let pibb = /^[1-9][0-9]{8}$/;

      if (!(provera.test(this.psifra1))) {
        this.message = "Lozinka nije u dobrom formatu!";
        return;
      }
      else if (!(em.test(this.pmail))) {
        this.message = "Nije dobar email!";
        return;
      } else if (!(pibb.test(this.pib))) {
        this.message = "Nije dobar pib!";
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


                this.preduzecaService.pretraziEmail(this.pmail).subscribe((data: Preduzece) => {

                  if (data != null) {
                    this.message = "Korisnik sa datim mail-om već postoji!";
                  } else {

                    this.preduzecaService.register(this.odgLice, this.pusername, this.psifra1, this.telefon, this.pmail, this.pnaziv, this.padresa, this.pib, this.mbroj, this.url).subscribe(

                      respObj => {
                        if (respObj['message'] == 'ok') {
                          this.message= 'Uspesno ste se registrovali!'
                        } else {
                          this.message = 'Greska'
                        }
                      })

                  }


                })




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






}
