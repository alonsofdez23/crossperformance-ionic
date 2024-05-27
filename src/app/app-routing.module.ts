import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'clases',
    loadChildren: () => import('./pages/clases/clases.module').then( m => m.ClasesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'monitor-modal',
    loadChildren: () => import('./modals/monitor-modal/monitor-modal.module').then( m => m.MonitorModalPageModule)
  },
  {
    path: 'entreno-modal',
    loadChildren: () => import('./modals/entreno-modal/entreno-modal.module').then( m => m.EntrenoModalPageModule)
  },
  {
    path: 'atleta-modal',
    loadChildren: () => import('./modals/atleta-modal/atleta-modal.module').then( m => m.AtletaModalPageModule)
  },
  {
    path: 'add-clase',
    loadChildren: () => import('./modals/add-clase/add-clase.module').then( m => m.AddClasePageModule)
  },
  {
    path: 'add-entreno',
    loadChildren: () => import('./modals/add-entreno/add-entreno.module').then( m => m.AddEntrenoPageModule)
  },
  {
    path: 'pagos',
    loadChildren: () => import('./pages/pagos/pagos.module').then( m => m.PagosPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'admin-user',
    loadChildren: () => import('./pages/admin-user/admin-user.module').then( m => m.AdminUserPageModule)
  },
  {
    path: 'add-entreno-to-clase',
    loadChildren: () => import('./modals/add-entreno-to-clase/add-entreno-to-clase.module').then( m => m.AddEntrenoToClasePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
