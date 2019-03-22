import { JsonProperty } from 'js-ts-mapper';

export class BaseFilterResult {
    constructor() {}

    @JsonProperty()
    pageSize: number;

    @JsonProperty()
    pageNumber: number;

    @JsonProperty()
    pageCount: number;

    @JsonProperty()
    totalCount: number;
}
