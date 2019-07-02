import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { CarNewComponent } from './components/car-new/car-new.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

const routes: Routes = [
    {path: '', component: DefaultComponent },
    {path: 'home', component: DefaultComponent },
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'create-car', component: CarNewComponent},
    {path: 'edit-car/:id', component: CarEditComponent},
    {path: 'car-detail/:id', component: CarDetailComponent},
    {path: '**', component: DefaultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [RegisterComponent, LoginComponent, DefaultComponent, CarNewComponent, CarEditComponent, CarDetailComponent];

