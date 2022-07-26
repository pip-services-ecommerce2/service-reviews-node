import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { RatingV1 } from '../data/version1/RatingV1';
import { IRatingsPersistence } from './IRatingsPersistence';
export declare class RatingsMongoDbPersistence extends IdentifiableMongoDbPersistence<RatingV1, string> implements IRatingsPersistence {
    constructor();
    private composeFilter;
    increment(correlationId: string, id: string, rating: number): Promise<RatingV1>;
    decrement(correlationId: string, id: string, rating: number): Promise<RatingV1>;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RatingV1>>;
}
