import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StaticSourceMft } from './static-source-mft.model';
import { StaticSourceMftPopupService } from './static-source-mft-popup.service';
import { StaticSourceMftService } from './static-source-mft.service';

@Component({
    selector: 'jhi-static-source-mft-delete-dialog',
    templateUrl: './static-source-mft-delete-dialog.component.html'
})
export class StaticSourceMftDeleteDialogComponent {

    staticSource: StaticSourceMft;

    constructor(
        private staticSourceService: StaticSourceMftService,
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
    selector: 'jhi-static-source-mft-delete-popup',
    template: ''
})
export class StaticSourceMftDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private staticSourcePopupService: StaticSourceMftPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.staticSourcePopupService
                .open(StaticSourceMftDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
