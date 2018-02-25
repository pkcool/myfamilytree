/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyfamilytreeTestModule } from '../../../test.module';
import { StaticSourceMftDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/static-source-mft/static-source-mft-delete-dialog.component';
import { StaticSourceMftService } from '../../../../../../main/webapp/app/entities/static-source-mft/static-source-mft.service';

describe('Component Tests', () => {

    describe('StaticSourceMft Management Delete Component', () => {
        let comp: StaticSourceMftDeleteDialogComponent;
        let fixture: ComponentFixture<StaticSourceMftDeleteDialogComponent>;
        let service: StaticSourceMftService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyfamilytreeTestModule],
                declarations: [StaticSourceMftDeleteDialogComponent],
                providers: [
                    StaticSourceMftService
                ]
            })
            .overrideTemplate(StaticSourceMftDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StaticSourceMftDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StaticSourceMftService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
