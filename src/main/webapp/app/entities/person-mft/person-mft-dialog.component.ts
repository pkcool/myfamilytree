import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PersonMft } from './person-mft.model';
import { PersonMftPopupService } from './person-mft-popup.service';
import { PersonMftService } from './person-mft.service';
import { StaticSourceMft, StaticSourceMftService } from '../static-source-mft';

@Component({
    selector: 'jhi-person-mft-dialog',
    templateUrl: './person-mft-dialog.component.html'
})
export class PersonMftDialogComponent implements OnInit {

    person: PersonMft;
    isSaving: boolean;

    fathers: PersonMft[];

    mothers: PersonMft[];

    spouses: PersonMft[];

    staticsources: StaticSourceMft[];
    dateOfBirthDp: any;
    dateOfDeathDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private personService: PersonMftService,
        private staticSourceService: StaticSourceMftService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService
            .query({filter: 'person-is-null'})
            .subscribe((res: HttpResponse<PersonMft[]>) => {
                if (!this.person.fatherId) {
                    this.fathers = res.body;
                } else {
                    this.personService
                        .find(this.person.fatherId)
                        .subscribe((subRes: HttpResponse<PersonMft>) => {
                            this.fathers = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personService
            .query({filter: 'person-is-null'})
            .subscribe((res: HttpResponse<PersonMft[]>) => {
                if (!this.person.motherId) {
                    this.mothers = res.body;
                } else {
                    this.personService
                        .find(this.person.motherId)
                        .subscribe((subRes: HttpResponse<PersonMft>) => {
                            this.mothers = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personService
            .query({filter: 'person-is-null'})
            .subscribe((res: HttpResponse<PersonMft[]>) => {
                if (!this.person.spouseId) {
                    this.spouses = res.body;
                } else {
                    this.personService
                        .find(this.person.spouseId)
                        .subscribe((subRes: HttpResponse<PersonMft>) => {
                            this.spouses = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.staticSourceService.query()
            .subscribe((res: HttpResponse<StaticSourceMft[]>) => { this.staticsources = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.person.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personService.update(this.person));
        } else {
            this.subscribeToSaveResponse(
                this.personService.create(this.person));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PersonMft>>) {
        result.subscribe((res: HttpResponse<PersonMft>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PersonMft) {
        this.eventManager.broadcast({ name: 'personListModification', content: 'OK'});
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

    trackStaticSourceById(index: number, item: StaticSourceMft) {
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
    selector: 'jhi-person-mft-popup',
    template: ''
})
export class PersonMftPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonMftPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personPopupService
                    .open(PersonMftDialogComponent as Component, params['id']);
            } else {
                this.personPopupService
                    .open(PersonMftDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
