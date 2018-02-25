/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyfamilytreeTestModule } from '../../../test.module';
import { StaticSourceMftDialogComponent } from '../../../../../../main/webapp/app/entities/static-source-mft/static-source-mft-dialog.component';
import { StaticSourceMftService } from '../../../../../../main/webapp/app/entities/static-source-mft/static-source-mft.service';
import { StaticSourceMft } from '../../../../../../main/webapp/app/entities/static-source-mft/static-source-mft.model';
import { PersonMftService } from '../../../../../../main/webapp/app/entities/person-mft';

describe('Component Tests', () => {

    describe('StaticSourceMft Management Dialog Component', () => {
        let comp: StaticSourceMftDialogComponent;
        let fixture: ComponentFixture<StaticSourceMftDialogComponent>;
        let service: StaticSourceMftService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyfamilytreeTestModule],
                declarations: [StaticSourceMftDialogComponent],
                providers: [
                    PersonMftService,
                    StaticSourceMftService
                ]
            })
            .overrideTemplate(StaticSourceMftDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StaticSourceMftDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StaticSourceMftService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StaticSourceMft(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.staticSource = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'staticSourceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StaticSourceMft();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.staticSource = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'staticSourceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
