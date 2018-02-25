import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StaticSource } from './static-source.model';
import { StaticSourcePopupService } from './static-source-popup.service';
import { StaticSourceService } from './static-source.service';

@Component({
    selector: 'jhi-static-source-delete-dialog',
    templateUrl: './static-source-delete-dialog.component.html'
})
export class StaticSourceDeleteDialogComponent {

    staticSource: StaticSource;

    constructor(
        private staticSourceService: StaticSourceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.staticSourceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'staticSourceListModification',
                content: 'Deleted an staticSource'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-static-source-delete-popup',
    template: ''
})
export class StaticSourceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private staticSourcePopupService: StaticSourcePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.staticSourcePopupService
                .open(StaticSourceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
