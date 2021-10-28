import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PhotoviewComponent } from './photoview/photoview.component';
import { FooterComponent } from './footer/footer.component';
import { ViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
  { path: 'navbar', component:NavbarComponent}, 
  { path: 'photo', component:PhotoviewComponent}, 
  { path: 'footer', component:FooterComponent}, 
  { path: '', component:ViewerComponent},       // this is the home 
  { path: '**', redirectTo: '' }    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
