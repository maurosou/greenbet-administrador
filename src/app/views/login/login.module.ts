import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { EntrarComponent } from './entrar/entrar.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [EntrarComponent],
	imports: [CommonModule, LoginRoutingModule, SharedModule, MaterialModule, FormsModule],
})
export class LoginModule {}
