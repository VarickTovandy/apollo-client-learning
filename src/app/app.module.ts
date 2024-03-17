import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client/core';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './auth/auth.guard';



const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'schools',
    loadChildren: () => import('./schools-management/schools-management.module').then((m) => m.SchoolsManagementModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'title',
    loadChildren: () => import('./title-management/title-management.module').then((m) => m.TitleManagementModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('./users-management/users-management.module').then((m) => m.UsersManagementModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'promo',
    loadChildren: () => import('./promo-management/promo-management.module').then((m) => m.PromoManagementModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
]




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules }),
    HomeModule,
    SharedModule,
  ],
  exports: [
    RouterModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
