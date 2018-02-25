/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyfamilytreeTestModule } from '../../../test.module';
import { MarriageMftComponent } from '../../../../../../main/webapp/app/entities/marriage-mft/marriage-mft.component';
import { MarriageMftService } from '../../../../../../main/webapp/app/entities/marriage-mft/marriage-mft.service';
import { MarriageMft } from '../../../../../../main/webapp/app/entities/marriage-mft/marriage-mft.model';

describe('Component Tests', () => {

    describe('MarriageMft Management Component', () => {
        let comp: MarriageMftComponent;
        let fixture: ComponentFixture<MarriageMftComponent>;
        let service: MarriageMftService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyfamilytreeTestModule],
                declarations: [MarriageMftComponent],
                providers: [
                    MarriageMftService
                ]
            })
            .overrideTemplate(MarriageMftComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MarriageMftComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MarriageMftService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MarriageMft(123)],
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
