import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'bk-discover',
	templateUrl: './discover.component.html',
	styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

	constructor(
		private titleService: Title,
	) { }

	ngOnInit(): void {
		this.titleService.setTitle(`${(window as any).bkBaseTitle} | טבלת מובילים`);
	}

}
