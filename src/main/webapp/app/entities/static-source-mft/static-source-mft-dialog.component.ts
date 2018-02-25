import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StaticSourceMft } from './static-source-mft.model';
import { StaticSourceMftPopupService } from './static-source-mft-popup.service';
import { StaticSourceMftService } from './static-source-mft.service';
import { PersonMft, PersonMftService } from '../person-mft';

@Component({
    selector: 'jhi-static-source-mft-dialog',
    templateUrl: './static-source-mft-dialog.component.html'
})
export class StaticSourceMftDialogComponent implements OnInit {

    staticSource: StaticSourceMft;
    isSaving: boolean;

    people: PersonMft[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private staticSourceService: StaticSourceMftService,
        private personService: PersonMftService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService.query()
            .subscribe((res: HttpResponse<PersonMft[]>) => { this.people = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.staticSource.id !== undefined) {
            this.subscribeToSaveResponse(
                this.staticSourceService.update(this.staticSource));
        } else {
            this.subscribeToSaveResponse(
                this.staticSourceService.create(this.staticSource));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StaticSourceMft>>) {
        result.subscribe((res: HttpResponse<StaticSourceMft>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StaticSourceMft) {
        this.eventManager.broadcast({ name: 'staticSourceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonById(index: number, item: PersonMft) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-static-source-mft-popup',
    template: ''
})
export class StaticSourceMftPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private staticSourcePopupService: StaticSourceMftPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.staticSourcePopupService
                    .open(StaticSourceMftDialogComponent as Component, params['id']);
            } else {
                this.staticSourcePopupService
                    .open(StaticSourceMftDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
