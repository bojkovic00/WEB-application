import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { KupciService } from '../kupci.service';
import { Admin } from '../model/admin';
import { Kupac } from '../model/kupac';
import { Preduzece } from '../model/preduzece';
import { PreduzecaService } from '../preduzeca.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private adminService: AdminService, private preduzecaService: PreduzecaService, private router: Router) { }

  ngOnInit(): void {
  }

  password: string;
  username: string;
  poruka: string;




  login() {
    if (this.username == null || this.password == null) {
      this.poruka = " Unesite sva polja";

      return; }

    console.log("pozvao login fun");
    this.adminService.login(this.username).subscribe(
      (userFromDB: Admin) => {
        if (userFromDB != null) {
          if (userFromDB.lozinka == this.password) {
            this.router.navigate(['admin']);
          }
          else {
            this.poruka = "Pogresna lozinka";
          }
        } else {
          this.poruka = "Pogresan username";


        }
      }
    )
  }










}