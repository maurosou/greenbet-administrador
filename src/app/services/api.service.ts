import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObservableInput, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/config';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	constructor(private toast: ToastrService, private authService: AuthService, private http: HttpClient) {}

	get header() {
		var token = this.authService.token;
		if (token == null) return new HttpHeaders({ 'Content-Type': 'application/json' });
		else
			return new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			});
	}

	get<T>(url: string) {
		return this.http
			.get<T>(`${environment.url}/${environment.moduloApi}/${url}`, {
				headers: this.header,
			})
			.pipe(catchError((err) => this.tratarErro(err)));
	}

	post<T>(url: string, body: any) {
		return this.http
			.post<T>(`${environment.url}/${environment.moduloApi}/${url}`, body, {
				headers: this.header,
			})
			.pipe(catchError((err) => this.tratarErro(err)));
	}

	put<T>(url: string, body: any) {
		return this.http
			.put<T>(`${environment.url}/${environment.moduloApi}/${url}`, body, {
				headers: this.header,
			})
			.pipe(catchError((err) => this.tratarErro(err)));
	}

	delete<T>(url: string) {
		return this.http
			.delete<T>(`${environment.url}/${environment.moduloApi}/${url}`, {
				headers: this.header,
			})
			.pipe(catchError((err) => this.tratarErro(err)));
	}

	tratarErro(err: any): ObservableInput<any> {
		if (typeof err.error != 'string') {
			var mensagem = Object.values(err.error).flat().join('<br>');
			this.toast.error(mensagem);
		} else {
			this.toast.error(err.error);
			console.log(err.error);
		}

		throw err;
	}
}
