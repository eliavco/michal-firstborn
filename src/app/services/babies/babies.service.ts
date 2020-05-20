import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

declare let backendUrl: string;

@Injectable({
	providedIn: 'root'
})
export class BabiesService {

	constructor(private httpClient: HttpClient) { }

	getInfo() {
		return this.httpClient.get(backendUrl + '/webApi/api/v1/babies');
	}

	getInfoRating() {
		return this.httpClient.get(backendUrl + '/webApi/api/v1/babies?order=-rating');
	}


}
