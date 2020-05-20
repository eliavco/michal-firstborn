import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import { GoogleAnalyticsEventsService } from './../../services/GoogleAnalyticsEvents/GoogleAnalyticsEvents.service';
import { BabiesService } from './../../services/babies/babies.service';
import { AlertsService } from './../../services/alerts/alerts.service';

@Component({
	selector: 'bk-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	faCoffee = faCoffee;
	info;

	constructor(
		private googleAnalyticsEventsService: GoogleAnalyticsEventsService,
		private titleService: Title,
		private babiesService: BabiesService,
		private alertsService: AlertsService
	) { }

	ngOnInit() {
		this.titleService.setTitle(`${(window as any).bkBaseTitle} | בית`);
		this.babiesService.getInfoRating().subscribe((info: any) => {
			this.info = JSON.stringify(info);
		});
	}

	addEvent(eventName: string, eventCategory: string, eventAction: string, eventLabel?: string, eventValue?: number) {
		this.googleAnalyticsEventsService.eventEmmiter(eventName, eventCategory, eventAction, eventLabel, eventValue);
		this.alertsService.addToast('מה ניש');
	}

}
