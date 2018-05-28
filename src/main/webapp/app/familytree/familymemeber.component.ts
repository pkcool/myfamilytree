import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import {FamilyMember} from './familymemeber.model';
import {FamilyMemberService} from './familymember.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'jhi-family-member-detail',
    templateUrl: './family-member-detail.html'
})
export class FamilyMemberComponent implements OnInit, OnDestroy {

    familyMember: FamilyMember;
    private subscription: Subscription;

    constructor(
        private familyMemberSvc: FamilyMemberService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
    }

    load(id) {
        this.familyMemberSvc.find(id)
            .subscribe((response: HttpResponse<FamilyMember>) => {
                this.familyMember = response.body;
            });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
