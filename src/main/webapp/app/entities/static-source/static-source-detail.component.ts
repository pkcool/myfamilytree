import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StaticSource } from './static-source.model';
import { StaticSourceService } from './static-source.service';

@Component({
    selector: 'jhi-static-source-detail',
    templateUrl: './static-source-detail.component.html'
})
export class StaticSourceDetailComponent implements OnInit, OnDestroy {

    staticSource: StaticSource;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private staticSourceService: StaticSourceService,
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
            .subscribe((staticSourceResponse: HttpResponse<StaticSource>) => {
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
