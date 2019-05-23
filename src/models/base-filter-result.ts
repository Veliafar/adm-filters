import { JsonProperty } from 'js-ts-mapper';

export class BaseFilterResult {
    
    constructor() {}

    // tslint:disable-next-line: member-ordering
    @JsonProperty()
    pageSize: number;

    // tslint:disable-next-line: member-ordering
    @JsonProperty()
    pageNumber: number;

    // tslint:disable-next-line: member-ordering
    @JsonProperty()
    pageCount: number;

    // tslint:disable-next-line: member-ordering
    @JsonProperty()
    totalCount: number;
}
