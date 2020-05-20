import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Page } from './../../interfaces/page';

@Component({
	selector: 'bk-global-navbar',
	templateUrl: './global-navbar.component.html',
	styleUrls: ['./global-navbar.component.scss']
})
export class GlobalNavbarComponent implements OnInit {
	pages: Page[] = [
		{ title: 'Home', link: '/' },
		{ title: 'Discover', link: '/discover' },
		{ title: 'Checkout', link: '/checkout' },
	];

	constructor(private router: Router) {
		this.router.events.subscribe(val => { if (val instanceof NavigationEnd) { this.makeActive(); } });
	}

	makeActive(): void {
		const path = window.location.pathname;
		this.pages.forEach(page => {
			if (page.link === path) {
				page.active = true;
			} else {
				page.active = false;
			}
		});
	}

	ngOnInit(): void {
	}

}
