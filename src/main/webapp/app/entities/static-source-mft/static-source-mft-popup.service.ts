import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { StaticSourceMft } from './static-source-mft.model';
import { StaticSourceMftService } from './static-source-mft.service';

@Injectable()
export class StaticSourceMftPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private staticSourceService: StaticSourceMftService

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
                this.staticSourceService.find(id)
                    .subscribe((staticSourceResponse: HttpResponse<StaticSourceMft>) => {
                        const staticSource: StaticSourceMft = staticSourceResponse.body;
                        this.ngbModalRef = this.staticSourceModalRef(component, staticSource);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.staticSourceModalRef(component, new StaticSourceMft());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    staticSourceModalRef(component: Component, staticSource: StaticSourceMft): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.staticSource = staticSource;
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
