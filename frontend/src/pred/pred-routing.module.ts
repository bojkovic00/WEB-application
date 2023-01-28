import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IzvestajiComponent } from './izvestaji/izvestaji.component';
import { NaruciociComponent } from './narucioci/narucioci.component';
import { OpstiComponent } from './opsti/opsti.component';
import { PredComponent } from './pred.component';
import { PromenaComponent } from './promena/promena.component';
import { RacuniComponent } from './racuni/racuni.component';
import { RasporedComponent } from './raspored/raspored.component';
import { RobeComponent } from './robe/robe.component';
import { StoloviComponent } from './stolovi/stolovi.component';

const routes: Routes = [{ path: '', component: PredComponent,children:[
  {
    path: '',
    component: OpstiComponent
  },
  
  {
    path: 'opsti',
    component: OpstiComponent


  },
  {
    path: 'narucioci',
    component: NaruciociComponent


  },
  {
    path: 'izvestaji',
    component: IzvestajiComponent


  },
  {
    path: 'racuni',
    component: RacuniComponent


  }, {
    path: 'raspored',
    component: RasporedComponent


  }, {
    path: 'robe',
    component: RobeComponent


  },
  {
    path: 'stolovi',
    component: StoloviComponent


  },
  {
    path: 'promena',
    component: PromenaComponent


  }












]




}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredRoutingModule { }
