import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StaticSourceMft } from './static-source-mft.model';
import { StaticSourceMftService } from './static-source-mft.service';

@Component({
    selector: 'jhi-static-source-mft-detail',
    templateUrl: './static-source-mft-detail.component.html'
})
export class StaticSourceMftDetailComponent implements OnInit, OnDestroy {

    staticSource: StaticSourceMft;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private staticSourceService: StaticSourceMftService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStaticSources();
    }

    load(id) {
        this.staticSourceService.find(id)
            .subscribe((staticSourceResponse: HttpResponse<StaticSourceMft>) => {
                this.staticSource = staticSourceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStaticSources() {
        this.eventSubscriber = this.eventManager.subscribe(
            'staticSourceListModification',
            (response) => this.load(this.staticSource.id)
        );
    }
}
