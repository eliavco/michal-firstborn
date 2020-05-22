import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { BabiesService } from './../../services/babies/babies.service';
import { AlertsService } from './../../services/alerts/alerts.service';

import { faThumbsUp, faThumbsDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'bk-discover',
	templateUrl: './discover.component.html',
	styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
	info;
	faThumbsUp = faThumbsUp;
	faThumbsDown = faThumbsDown;
	faTrashAlt = faTrashAlt;

	constructor(
		private titleService: Title,
		private alertsService: AlertsService,
		private babiesService: BabiesService,
	) { }

	ngOnInit(): void {
		this.titleService.setTitle(`${(window as any).bkBaseTitle} | טבלת מובילים`);
		this.babiesService.getInfoRating().subscribe((info: any) => {
			this.info = info.documents;
			console.log(this.info);
		});
	}

	alertVoted() {
		if (!localStorage.vL) { localStorage.vL = 4; localStorage.ul = Date.now(); }
		else if (+localStorage.vL <= 0) {}
		else { localStorage.vL = +localStorage.vL - 1; }
		this.alertsService.addToast(`הצבעתך התקבלה! נותרו ${localStorage.vL} הצבעות`, false, 5);
	}

	alertUnvoted() {
		if (!localStorage.vL) { localStorage.vL = 4; localStorage.ul = Date.now(); }
		else { localStorage.vL = +localStorage.vL + 1; }
		this.alertsService.addToast(`הצבעתך בוטלה! נותרו ${localStorage.vL} הצבעות`, false, 5);
	}

	alertVotedComplete() {
		this.alertsService.addToast('סורי, נגמרו לך ההצבעות להיום', true, 5);
	}

	vote(id) {
		if (+localStorage.vL > 0 || !localStorage.vL) {
			this.babiesService.increaseRating(id).subscribe((val: any) => {
				if (!localStorage.vv) { localStorage.vv = JSON.stringify([]); }
				const mvv = JSON.parse(localStorage.vv);
				mvv.push(id);
				localStorage.vv = JSON.stringify(mvv);
				this.alertVoted();
				this.babiesService.getInfoRating().subscribe((info: any) => {
					this.info = info.documents;
				});
			});
		} else {
			this.alertVotedComplete();
		}
	}

	unvote(id) {
		if (+localStorage.vL >= 0 || !localStorage.vL) {
			this.babiesService.increaseRating(id, -1).subscribe((val: any) => {
				if (!localStorage.vv) { localStorage.vv = JSON.stringify([]); }
				const mvv = JSON.parse(localStorage.vv);
				mvv.splice(mvv.indexOf(id));
				localStorage.vv = JSON.stringify(mvv);
				this.alertUnvoted();
				this.babiesService.getInfoRating().subscribe((info: any) => {
					this.info = info.documents;
				});
			});
		}
	}

	checkNotSelf(id) {
		if (!localStorage.cy) { localStorage.cy = JSON.stringify([]); }
		const mcy = JSON.parse(localStorage.cy);
		return (!mcy.includes(id));
	}

	checkNotVoted(id) {
		if (!localStorage.vv) { localStorage.vv = JSON.stringify([]); }
		const mvv = JSON.parse(localStorage.vv);
		return (!mvv.includes(id));
	}

	delete(id) {
		this.babiesService.delete(id).subscribe(() => {
			if (!localStorage.cy) { localStorage.cy = JSON.stringify([]); }
			const mcy = JSON.parse(localStorage.cy);
			mcy.splice(mcy.indexOf(id));
			localStorage.cy = JSON.stringify(mcy);
			this.alertsService.addToast('נמחק');
			this.babiesService.getInfoRating().subscribe((info: any) => {
				this.info = info.documents;
			});
		});
	}

}
