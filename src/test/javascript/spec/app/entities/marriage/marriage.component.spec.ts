/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyfamilytreeTestModule } from '../../../test.module';
import { MarriageComponent } from '../../../../../../main/webapp/app/entities/marriage/marriage.component';
import { MarriageService } from '../../../../../../main/webapp/app/entities/marriage/marriage.service';
import { Marriage } from '../../../../../../main/webapp/app/entities/marriage/marriage.model';

describe('Component Tests', () => {

    describe('Marriage Management Component', () => {
        let comp: MarriageComponent;
        let fixture: ComponentFixture<MarriageComponent>;
        let service: MarriageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyfamilytreeTestModule],
                declarations: [MarriageComponent],
                providers: [
                    MarriageService
                ]
            })
            .overrideTemplate(MarriageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MarriageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarriageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Marriage(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.marriages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
