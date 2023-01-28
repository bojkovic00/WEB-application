import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preduzece } from 'src/app/model/preduzece';
import { PreduzecaService } from 'src/app/preduzeca.service';

@Component({
  selector: 'app-promena',
  templateUrl: './promena.component.html',
  styleUrls: ['./promena.component.css']
})
export class PromenaComponent implements OnInit {

  constructor(private router: Router, private preduzecaService: PreduzecaService) { }

  ngOnInit(): void {

    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    console.log(this.korisnik.korIme)
    this.preduzecaService.pretraziKorIme(this.korisnik.korIme).subscribe((data: Preduzece) => {

      this.korisnik = data;


    })

  }

  korisnik: Preduzece;



  poruka: string;
  ksifra1: string = "";
  ksifra2: string = "";
  stara: string = "";


  myModa: string;





  konacno() {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));

    if (this.ksifra1 == "" || this.ksifra2 == "" || this.stara == "") {
      this.poruka = "Morate uneti sva polja!";
    }
    else {
      if (this.stara != this.korisnik.lozinka) {
        this.poruka = "Nije ispravna stara lozinka";

      }
      else {
        if (this.ksifra1 != this.ksifra2) {
          this.poruka = "Ne poklapaju se lozinke! Unesite ponovo";
        }
        else {
          let provera = /^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{7,11}$/



          if (!(provera.test(this.ksifra1))) {
            console.log(this.ksifra1);
            this.poruka = "Lozinka nije u dobrom formatu! Unesite ponovo";
          }
          else {
            if (this.korisnik.lozinka != this.ksifra1) {
              this.korisnik.lozinka = this.ksifra1;
              this.preduzecaService.azurirajKor(this.korisnik, this.ksifra1).subscribe(data => { });

              this.router.navigate(['/login']);

            }
            else {
              this.poruka = "Lozinka mora da se razlikuje od prethodne!";
            }
          }
        }

      }


    }

  }














}
