import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./landing-page/components/landing-page.component";


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  // importer les le module facesnap uniquement si la route commence par /facesnaps, obligatoire pour le lazy loading
  { path: 'facesnaps', loadChildren: () => import('./face-snaps/face-snaps.module').then(module => module.FaceSnapsModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule
{

}
