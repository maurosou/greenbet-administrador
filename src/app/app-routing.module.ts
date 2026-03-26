import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/painel/dashboard',
		pathMatch: 'full',
	},
	{
		path: 'login',
		loadChildren: () => import('./views/login/login.module').then((m) => m.LoginModule),
	},
	{
		path: 'painel',
		loadChildren: () => import('./views/painel/painel.module').then((m) => m.PainelModule),
		canActivate: [authGuard],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
