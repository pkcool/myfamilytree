/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MyfamilytreeTestModule } from '../../../test.module';
import { StaticSourceDetailComponent } from '../../../../../../main/webapp/app/entities/static-source/static-source-detail.component';
import { StaticSourceService } from '../../../../../../main/webapp/app/entities/static-source/static-source.service';
import { StaticSource } from '../../../../../../main/webapp/app/entities/static-source/static-source.model';

describe('Component Tests', () => {

    describe('StaticSource Management Detail Component', () => {
        let comp: StaticSourceDetailComponent;
        let fixture: ComponentFixture<StaticSourceDetailComponent>;
        let service: StaticSourceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyfamilytreeTestModule],
                declarations: [StaticSourceDetailComponent],
                providers: [
                    StaticSourceService
                ]
            })
            .overrideTemplate(StaticSourceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StaticSourceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StaticSourceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StaticSource(123)
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
