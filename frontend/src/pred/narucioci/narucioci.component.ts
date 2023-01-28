import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Narucilac } from 'src/app/model/narucilac';
import { Preduzece } from 'src/app/model/preduzece';
import { PreduzecaService } from 'src/app/preduzeca.service';

@Component({
  selector: 'app-narucioci',
  templateUrl: './narucioci.component.html',
  styleUrls: ['./narucioci.component.css']
})
export class NaruciociComponent implements OnInit {

  constructor(private router: Router, private preduzecaService: PreduzecaService) { }



  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
console.log(this.korisnik.korIme)
    this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe((data: Preduzece) => {

      this.korisnik = data;


    })


  }


korisnik:Preduzece;






nodgLice: string;
npusername: string;
npsifra1: string;
npsifra2: string;
ntelefon: string;
npmail: string;
npnaziv: string;
npadresa: string;
npib: number;
nmbroj: string;


nmessage: string;
nporuka: string;

registrujNarucioca() {
  console.log("registruj");

  this.nmessage = "";
  this.nporuka = "";

  if (this.nodgLice == null || this.npusername == null || this.npsifra1 == null || this.npsifra2 == null || this.ntelefon == null || this.npmail == null || this.npnaziv == null || this.npadresa == null || this.npib == null || this.nmbroj == null) {
    this.nmessage = "Niste uneli sva polja!";
    return;
  }
  else {

    let provera = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{7,}$/;
    let peta = /^[A-Z]/;
    let em = /^(.+)@(\w+)(\.\w{2,3})+$/;

    if (!(provera.test(this.npsifra1) && peta.test(this.npsifra1))) {
      this.nmessage = "Lozinka nije u dobrom formatu!";
      return;
    }
    else if (!(em.test(this.npmail))) {
      this.nmessage = "Nije dobar email!";
      return;
    }
    else {
      if (this.npsifra1 != this.npsifra2) {
        this.nmessage = "Lozinke se ne poklapaju!";
        return;
      }
      else {
        //PROVERA MESTA

        this.preduzecaService.pretraziKorIme(this.npusername).subscribe(

          (predFromDB: Preduzece) => {
            if (predFromDB != null) {
              this.nmessage = "Korisnik sa datim korisničkim imenom već postoji!";
            } else {

              this.preduzecaService.register(this.nodgLice, this.npusername, this.npsifra1, this.ntelefon, this.npmail, this.npnaziv, this.npadresa, this.npib, this.nmbroj,this.url).subscribe(

                respObj => {
                  if (respObj['message'] == 'ok') {
                    this.nmessage
                      = 'User added'

                    this.preduzecaService.pretraziKorIme(this.npusername).subscribe(

                      (predFromDB: Preduzece) => {
                        if (predFromDB != null) {
                          this.nizabraniN = predFromDB;

                          this.nnarucilac = { preduzece: this.nizabraniN, brDana: this.nbrDana, procenatRabata: this.nprocenatRabata }

                          this.preduzecaService.dodajNarucioca(this.korisnik.korIme, this.nnarucilac).subscribe(
                            resp => {
                              // alert(resp['message'])
                            })

                        }
                      })


                  } else {
                    this.nmessage = 'Error'
                  }
                }
              )
            }
          })
      }


    }




  }



}

nPIB: number;


preduzecaNiz: Preduzece[] = []
pretraziPIB() {


  this.preduzecaService.pretraziPIB(this.nPIB).subscribe(

    (predFromDB: Preduzece[]) => {
      this.preduzecaNiz = predFromDB;

    })


}
nizabraniN: Preduzece;
nbrDana: number;
nprocenatRabata: number;

nnarucilac: Narucilac;


/////za pibbbb
izabraniN: Preduzece;
brDana: number;
procenatRabata: number;

narucilac: Narucilac;

dodajNarucioca() {
  console.log(this.izabraniN.korIme, this.brDana, this.procenatRabata)
  this.narucilac = { preduzece: this.izabraniN, brDana: this.brDana, procenatRabata: this.procenatRabata }

  this.preduzecaService.dodajNarucioca(this.korisnik.korIme, this.narucilac).subscribe(
    resp => {
      //  alert(resp['message'])



    }


  )


}




////////////////////////////////////////////////

image;
url: string | ArrayBuffer;

korime: string
handleFileInput(event) {
  this.korime = "pred4"
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
         // alert("Velicina slike mora biti izmedju 100px i 300px");
img.width=100;
img.height=100;
          //return;
        }

       // this.preduzecaService.dodajLogo(this.korime, this.url).subscribe(data => console.log(data));
      }

    }
  }
}





}
