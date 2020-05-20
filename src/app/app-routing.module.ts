import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleComponent } from './components/example/example.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
	{ path: 'app', component: ExampleComponent },
	{ path: '', component: ExampleComponent },
	{ path: '**', component: NotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
