import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { BabiesService } from './../../services/babies/babies.service';
import { AlertsService } from './../../services/alerts/alerts.service';

@Component({
	selector: 'bk-discover',
	templateUrl: './discover.component.html',
	styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
	info;

	constructor(
		private titleService: Title,
		private alertsService: AlertsService,
		private babiesService: BabiesService,
	) { }

	ngOnInit(): void {
		this.titleService.setTitle(`${(window as any).bkBaseTitle} | טבלת מובילים`);
		this.babiesService.getInfoRating().subscribe((info: any) => {
			this.info = info.documents;
		});
	}

	alertVoted() {
		if (!localStorage.vL) { localStorage.vL = 4; localStorage.ul = Date.now() }
		else if (+localStorage.vL <= 0) {}
		else { localStorage.vL = +localStorage.vL - 1; }
		this.alertsService.addToast(`הצבעתך התקבלה! נותרו ${localStorage.vL} הצבעות`, false, 5);
	}

	alertVotedComplete() {
		this.alertsService.addToast('סורי, נגמרו לך ההצבעות להיום', true, 5);
	}

	vote(id) {
		if (+localStorage.vL > 0 || !localStorage.vL) {
			this.babiesService.increaseRating(id).subscribe((val: any) => {
				this.alertVoted();
				this.babiesService.getInfoRating().subscribe((info: any) => {
					this.info = info.documents;
				});
			});
		} else {
			this.alertVotedComplete();
		}
	}

	checkNotSelf(id) {
		const mcy = JSON.parse(localStorage.cy);
		return (!mcy.includes(id));
	}

}
