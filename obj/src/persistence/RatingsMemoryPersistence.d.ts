import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { RatingV1 } from '../data/version1/RatingV1';
import { IRatingsPersistence } from './IRatingsPersistence';
export declare class RatingsMemoryPersistence extends IdentifiableMemoryPersistence<RatingV1, string> implements IRatingsPersistence {
    constructor();
    increment(correlationId: string, id: string, rating: number): Promise<RatingV1>;
    decrement(correlationId: string, id: string, rating: number): Promise<RatingV1>;
    private incrementRating;
    private decrementRating;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RatingV1>>;
}
