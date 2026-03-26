import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { environment } from 'src/config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _token = btoa('app-token');
	private _lingua = btoa('app-lingua');

	private jwtHelper = new JwtHelperService();

	constructor(private platformLocation: PlatformLocation, private router: Router) {}

	get token(): string | null {
		var storage = sessionStorage.getItem(this._token);
		if (storage == null || storage == undefined) return null;
		return storage;
	}

	set token(value: string | null) {
		if (value) sessionStorage.setItem(this._token, value);
		else sessionStorage.removeItem(this._token);
	}

	get lingua(): string {
		var storage = sessionStorage.getItem(this._lingua);
		if (storage) return storage;
		else {
			sessionStorage.setItem(this._lingua, environment.linguaPadrao);
			return environment.linguaPadrao;
		}
	}

	set lingua(value: string | null) {
		if (value) {
			sessionStorage.setItem(this._lingua, value);
		} else {
			sessionStorage.setItem(this._lingua, environment.linguaPadrao);
		}
	}

	logado(): boolean {
		return this.token != null;
	}

	async sair() {
		this.token = null;
	}

	get usuario() {
		return this.jwtHelper.decodeToken(this.token!);
	}

	get id() {
		return this.usuario['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
	}

	get nome() {
		return this.usuario['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
	}

	get login() {
		return this.usuario['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
	}

	get email() {
		return this.usuario['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
	}

	linkReferencia(): string {
		return location.origin + this.platformLocation.getBaseHrefFromDOM() + 'u/' + this.id;
	}

	logar(token: string) {
		this.token = token;
		location.href = '/';
	}
}
