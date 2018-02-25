/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MyfamilytreeTestModule } from '../../../test.module';
import { MarriageDetailComponent } from '../../../../../../main/webapp/app/entities/marriage/marriage-detail.component';
import { MarriageService } from '../../../../../../main/webapp/app/entities/marriage/marriage.service';
import { Marriage } from '../../../../../../main/webapp/app/entities/marriage/marriage.model';

describe('Component Tests', () => {

    describe('Marriage Management Detail Component', () => {
        let comp: MarriageDetailComponent;
        let fixture: ComponentFixture<MarriageDetailComponent>;
        let service: MarriageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyfamilytreeTestModule],
                declarations: [MarriageDetailComponent],
                providers: [
                    MarriageService
                ]
            })
            .overrideTemplate(MarriageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MarriageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarriageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Marriage(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.marriage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
