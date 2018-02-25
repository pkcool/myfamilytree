import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MarriageMft } from './marriage-mft.model';
import { MarriageMftPopupService } from './marriage-mft-popup.service';
import { MarriageMftService } from './marriage-mft.service';

@Component({
    selector: 'jhi-marriage-mft-delete-dialog',
    templateUrl: './marriage-mft-delete-dialog.component.html'
})
export class MarriageMftDeleteDialogComponent {

    marriage: MarriageMft;

    constructor(
        private marriageService: MarriageMftService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.marriageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'marriageListModification',
                content: 'Deleted an marriage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-marriage-mft-delete-popup',
    template: ''
})
export class MarriageMftDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private marriagePopupService: MarriageMftPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.marriagePopupService
                .open(MarriageMftDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
