/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MyfamilytreeTestModule } from '../../../test.module';
import { MarriageMftDetailComponent } from '../../../../../../main/webapp/app/entities/marriage-mft/marriage-mft-detail.component';
import { MarriageMftService } from '../../../../../../main/webapp/app/entities/marriage-mft/marriage-mft.service';
import { MarriageMft } from '../../../../../../main/webapp/app/entities/marriage-mft/marriage-mft.model';

describe('Component Tests', () => {

    describe('MarriageMft Management Detail Component', () => {
        let comp: MarriageMftDetailComponent;
        let fixture: ComponentFixture<MarriageMftDetailComponent>;
        let service: MarriageMftService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyfamilytreeTestModule],
                declarations: [MarriageMftDetailComponent],
                providers: [
                    MarriageMftService
                ]
            })
            .overrideTemplate(MarriageMftDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MarriageMftDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarriageMftService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MarriageMft(123)
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
