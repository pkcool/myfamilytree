/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyfamilytreeTestModule } from '../../../test.module';
import { MarriageMftDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/marriage-mft/marriage-mft-delete-dialog.component';
import { MarriageMftService } from '../../../../../../main/webapp/app/entities/marriage-mft/marriage-mft.service';

describe('Component Tests', () => {

    describe('MarriageMft Management Delete Component', () => {
        let comp: MarriageMftDeleteDialogComponent;
        let fixture: ComponentFixture<MarriageMftDeleteDialogComponent>;
        let service: MarriageMftService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyfamilytreeTestModule],
                declarations: [MarriageMftDeleteDialogComponent],
                providers: [
                    MarriageMftService
                ]
            })
            .overrideTemplate(MarriageMftDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MarriageMftDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarriageMftService);
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
