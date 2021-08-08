import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PhotoviewComponent } from './photoview/photoview.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: 'navbar', component:NavbarComponent}, 
  { path: 'photo', component:PhotoviewComponent}, 
  { path: 'footer', component:FooterComponent}, 
  { path: '**', redirectTo: '' }    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
