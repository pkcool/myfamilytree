import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StaticSource } from './static-source.model';
import { StaticSourcePopupService } from './static-source-popup.service';
import { StaticSourceService } from './static-source.service';
import { Person, PersonService } from '../person';

@Component({
    selector: 'jhi-static-source-dialog',
    templateUrl: './static-source-dialog.component.html'
})
export class StaticSourceDialogComponent implements OnInit {

    staticSource: StaticSource;
    isSaving: boolean;

    people: Person[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private staticSourceService: StaticSourceService,
        private personService: PersonService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService.query()
            .subscribe((res: HttpResponse<Person[]>) => { this.people = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<StaticSource>>) {
        result.subscribe((res: HttpResponse<StaticSource>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StaticSource) {
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

    trackPersonById(index: number, item: Person) {
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
    selector: 'jhi-static-source-popup',
    template: ''
})
export class StaticSourcePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private staticSourcePopupService: StaticSourcePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.staticSourcePopupService
                    .open(StaticSourceDialogComponent as Component, params['id']);
            } else {
                this.staticSourcePopupService
                    .open(StaticSourceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
