import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Marriage } from './marriage.model';
import { MarriagePopupService } from './marriage-popup.service';
import { MarriageService } from './marriage.service';

@Component({
    selector: 'jhi-marriage-delete-dialog',
    templateUrl: './marriage-delete-dialog.component.html'
})
export class MarriageDeleteDialogComponent {

    marriage: Marriage;

    constructor(
        private marriageService: MarriageService,
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
    selector: 'jhi-marriage-delete-popup',
    template: ''
})
export class MarriageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private marriagePopupService: MarriagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.marriagePopupService
                .open(MarriageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
