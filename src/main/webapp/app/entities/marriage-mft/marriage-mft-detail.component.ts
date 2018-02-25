import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MarriageMft } from './marriage-mft.model';
import { MarriageMftService } from './marriage-mft.service';

@Component({
    selector: 'jhi-marriage-mft-detail',
    templateUrl: './marriage-mft-detail.component.html'
})
export class MarriageMftDetailComponent implements OnInit, OnDestroy {

    marriage: MarriageMft;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private marriageService: MarriageMftService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMarriages();
    }

    load(id) {
        this.marriageService.find(id)
            .subscribe((marriageResponse: HttpResponse<MarriageMft>) => {
                this.marriage = marriageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMarriages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'marriageListModification',
            (response) => this.load(this.marriage.id)
        );
    }
}
