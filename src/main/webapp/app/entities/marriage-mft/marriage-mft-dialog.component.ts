import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MarriageMft } from './marriage-mft.model';
import { MarriageMftPopupService } from './marriage-mft-popup.service';
import { MarriageMftService } from './marriage-mft.service';
import { PersonMft, PersonMftService } from '../person-mft';

@Component({
    selector: 'jhi-marriage-mft-dialog',
    templateUrl: './marriage-mft-dialog.component.html'
})
export class MarriageMftDialogComponent implements OnInit {

    marriage: MarriageMft;
    isSaving: boolean;

    males: PersonMft[];

    females: PersonMft[];
    dateOfMarriageDp: any;
    endOfMarriageDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private marriageService: MarriageMftService,
        private personService: PersonMftService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService
            .query({filter: 'marriage-is-null'})
            .subscribe((res: HttpResponse<PersonMft[]>) => {
                if (!this.marriage.maleId) {
                    this.males = res.body;
                } else {
                    this.personService
                        .find(this.marriage.maleId)
                        .subscribe((subRes: HttpResponse<PersonMft>) => {
                            this.males = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personService
            .query({filter: 'marriage-is-null'})
            .subscribe((res: HttpResponse<PersonMft[]>) => {
                if (!this.marriage.femaleId) {
                    this.females = res.body;
                } else {
                    this.personService
                        .find(this.marriage.femaleId)
                        .subscribe((subRes: HttpResponse<PersonMft>) => {
                            this.females = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.marriage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.marriageService.update(this.marriage));
        } else {
            this.subscribeToSaveResponse(
                this.marriageService.create(this.marriage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MarriageMft>>) {
        result.subscribe((res: HttpResponse<MarriageMft>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MarriageMft) {
        this.eventManager.broadcast({ name: 'marriageListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-marriage-mft-popup',
    template: ''
})
export class MarriageMftPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private marriagePopupService: MarriageMftPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.marriagePopupService
                    .open(MarriageMftDialogComponent as Component, params['id']);
            } else {
                this.marriagePopupService
                    .open(MarriageMftDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
