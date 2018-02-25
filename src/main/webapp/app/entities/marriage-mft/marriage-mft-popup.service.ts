import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MarriageMft } from './marriage-mft.model';
import { MarriageMftService } from './marriage-mft.service';

@Injectable()
export class MarriageMftPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private marriageService: MarriageMftService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.marriageService.find(id)
                    .subscribe((marriageResponse: HttpResponse<MarriageMft>) => {
                        const marriage: MarriageMft = marriageResponse.body;
                        if (marriage.dateOfMarriage) {
                            marriage.dateOfMarriage = {
                                year: marriage.dateOfMarriage.getFullYear(),
                                month: marriage.dateOfMarriage.getMonth() + 1,
                                day: marriage.dateOfMarriage.getDate()
                            };
                        }
                        if (marriage.endOfMarriage) {
                            marriage.endOfMarriage = {
                                year: marriage.endOfMarriage.getFullYear(),
                                month: marriage.endOfMarriage.getMonth() + 1,
                                day: marriage.endOfMarriage.getDate()
                            };
                        }
                        this.ngbModalRef = this.marriageModalRef(component, marriage);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.marriageModalRef(component, new MarriageMft());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    marriageModalRef(component: Component, marriage: MarriageMft): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.marriage = marriage;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
