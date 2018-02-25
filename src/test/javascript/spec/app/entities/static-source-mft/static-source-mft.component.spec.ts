/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyfamilytreeTestModule } from '../../../test.module';
import { StaticSourceMftComponent } from '../../../../../../main/webapp/app/entities/static-source-mft/static-source-mft.component';
import { StaticSourceMftService } from '../../../../../../main/webapp/app/entities/static-source-mft/static-source-mft.service';
import { StaticSourceMft } from '../../../../../../main/webapp/app/entities/static-source-mft/static-source-mft.model';

describe('Component Tests', () => {

    describe('StaticSourceMft Management Component', () => {
        let comp: StaticSourceMftComponent;
        let fixture: ComponentFixture<StaticSourceMftComponent>;
        let service: StaticSourceMftService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyfamilytreeTestModule],
                declarations: [StaticSourceMftComponent],
                providers: [
                    StaticSourceMftService
                ]
            })
            .overrideTemplate(StaticSourceMftComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StaticSourceMftComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StaticSourceMftService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StaticSourceMft(123)],
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
