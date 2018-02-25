import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Person } from './person.model';
import { PersonPopupService } from './person-popup.service';
import { PersonService } from './person.service';
import { StaticSource, StaticSourceService } from '../static-source';

@Component({
    selector: 'jhi-person-dialog',
    templateUrl: './person-dialog.component.html'
})
export class PersonDialogComponent implements OnInit {

    person: Person;
    isSaving: boolean;

    fathers: Person[];

    mothers: Person[];

    spouses: Person[];

    staticsources: StaticSource[];
    dateOfBirthDp: any;
    dateOfDeathDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private personService: PersonService,
        private staticSourceService: StaticSourceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService
            .query({filter: 'person-is-null'})
            .subscribe((res: HttpResponse<Person[]>) => {
                if (!this.person.fatherId) {
                    this.fathers = res.body;
                } else {
                    this.personService
                        .find(this.person.fatherId)
                        .subscribe((subRes: HttpResponse<Person>) => {
                            this.fathers = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personService
            .query({filter: 'person-is-null'})
            .subscribe((res: HttpResponse<Person[]>) => {
                if (!this.person.motherId) {
                    this.mothers = res.body;
                } else {
                    this.personService
                        .find(this.person.motherId)
                        .subscribe((subRes: HttpResponse<Person>) => {
                            this.mothers = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.personService
            .query({filter: 'person-is-null'})
            .subscribe((res: HttpResponse<Person[]>) => {
                if (!this.person.spouseId) {
                    this.spouses = res.body;
                } else {
                    this.personService
                        .find(this.person.spouseId)
                        .subscribe((subRes: HttpResponse<Person>) => {
                            this.spouses = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.staticSourceService.query()
            .subscribe((res: HttpResponse<StaticSource[]>) => { this.staticsources = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<Person>>) {
        result.subscribe((res: HttpResponse<Person>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Person) {
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

    trackPersonById(index: number, item: Person) {
        return item.id;
    }

    trackStaticSourceById(index: number, item: StaticSource) {
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
    selector: 'jhi-person-popup',
    template: ''
})
export class PersonPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personPopupService
                    .open(PersonDialogComponent as Component, params['id']);
            } else {
                this.personPopupService
                    .open(PersonDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
