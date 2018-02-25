import { BaseEntity } from './../../shared';

export class StaticSourceMft implements BaseEntity {
    constructor(
        public id?: number,
        public sourcePath?: string,
        public comment?: string,
        public people?: BaseEntity[],
    ) {
    }
}
