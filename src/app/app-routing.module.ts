import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EdituserComponent } from './components/users/edituser/edituser.component';
import { UsersCreateComponent } from './components/users/users-create/users-create.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';



const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},

  { path:'users-list',component:UsersListComponent},
  { path:'users-create',component:UsersCreateComponent,title:"Create user"},
  { path: 'edituser', component: EdituserComponent ,title:'user Edit' },

  { path: 'products', component: ProductListComponent ,title:'Product list' },
  { path: 'create-product', component: ProductCreateComponent ,title:'Create product' },
  { path: 'editproduct/:id', component: ProductEditComponent ,title:'Edit product' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
