import { Injectable } from '@angular/core';
import { ConfigFormModel } from '../models/config-form.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root',
})
export class ConfigService {
	controller = 'config';

	constructor(private api: ApiService) {}

	get(): Observable<ConfigFormModel> {
		return this.api.get<ConfigFormModel>(`${this.controller}`);
	}

	post(model: ConfigFormModel): Observable<boolean> {
		return this.api.post<boolean>(`${this.controller}`, model);
	}
}
