/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyfamilytreeTestModule } from '../../../test.module';
import { StaticSourceComponent } from '../../../../../../main/webapp/app/entities/static-source/static-source.component';
import { StaticSourceService } from '../../../../../../main/webapp/app/entities/static-source/static-source.service';
import { StaticSource } from '../../../../../../main/webapp/app/entities/static-source/static-source.model';

describe('Component Tests', () => {

    describe('StaticSource Management Component', () => {
        let comp: StaticSourceComponent;
        let fixture: ComponentFixture<StaticSourceComponent>;
        let service: StaticSourceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyfamilytreeTestModule],
                declarations: [StaticSourceComponent],
                providers: [
                    StaticSourceService
                ]
            })
            .overrideTemplate(StaticSourceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StaticSourceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StaticSourceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StaticSource(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.staticSources[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
