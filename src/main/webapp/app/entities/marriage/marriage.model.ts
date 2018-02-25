import { BaseEntity } from './../../shared';

export class Marriage implements BaseEntity {
    constructor(
        public id?: number,
        public dateOfMarriage?: any,
        public endOfMarriage?: any,
        public notes?: string,
        public maleId?: number,
        public femaleId?: number,
    ) {
    }
}
