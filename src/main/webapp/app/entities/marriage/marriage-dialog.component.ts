import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Marriage } from './marriage.model';
import { MarriagePopupService } from './marriage-popup.service';
import { MarriageService } from './marriage.service';
import { Person, PersonService } from '../person';

@Component({
    selector: 'jhi-marriage-dialog',
    templateUrl: './marriage-dialog.component.html'
})
export class MarriageDialogComponent implements OnInit {

    marriage: Marriage;
    isSaving: boolean;

    males: Person[];

    females: Person[];
    dateOfMarriageDp: any;
    endOfMarriageDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private marriageService: MarriageService,
        private personService: PersonService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService
            .query({filter: 'marriage-is-null'})
            .subscribe((res: HttpResponse<Person[]>) => {
                if (!this.marriage.maleId) {
                    this.males = res.body;
                } else {
                    this.personService
                        .find(this.marriage.maleId)
                        .subscribe((subRes: HttpResponse<Person>) => {
                            this.males = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personService
            .query({filter: 'marriage-is-null'})
            .subscribe((res: HttpResponse<Person[]>) => {
                if (!this.marriage.femaleId) {
                    this.females = res.body;
                } else {
                    this.personService
                        .find(this.marriage.femaleId)
                        .subscribe((subRes: HttpResponse<Person>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<Marriage>>) {
        result.subscribe((res: HttpResponse<Marriage>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Marriage) {
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

    trackPersonById(index: number, item: Person) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-marriage-popup',
    template: ''
})
export class MarriagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private marriagePopupService: MarriagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.marriagePopupService
                    .open(MarriageDialogComponent as Component, params['id']);
            } else {
                this.marriagePopupService
                    .open(MarriageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
