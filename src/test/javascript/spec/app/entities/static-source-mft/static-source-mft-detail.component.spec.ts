/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MyfamilytreeTestModule } from '../../../test.module';
import { StaticSourceMftDetailComponent } from '../../../../../../main/webapp/app/entities/static-source-mft/static-source-mft-detail.component';
import { StaticSourceMftService } from '../../../../../../main/webapp/app/entities/static-source-mft/static-source-mft.service';
import { StaticSourceMft } from '../../../../../../main/webapp/app/entities/static-source-mft/static-source-mft.model';

describe('Component Tests', () => {

    describe('StaticSourceMft Management Detail Component', () => {
        let comp: StaticSourceMftDetailComponent;
        let fixture: ComponentFixture<StaticSourceMftDetailComponent>;
        let service: StaticSourceMftService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyfamilytreeTestModule],
                declarations: [StaticSourceMftDetailComponent],
                providers: [
                    StaticSourceMftService
                ]
            })
            .overrideTemplate(StaticSourceMftDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StaticSourceMftDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StaticSourceMftService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StaticSourceMft(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.staticSource).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
