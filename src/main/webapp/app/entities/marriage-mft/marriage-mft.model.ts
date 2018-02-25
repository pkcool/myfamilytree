import { BaseEntity } from './../../shared';

export class MarriageMft implements BaseEntity {
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
