import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { RatingV1 } from '../data/version1/RatingV1';
export interface IRatingsPersistence extends IGetter<RatingV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RatingV1>>;
    getOneById(correlationId: string, id: string): Promise<RatingV1>;
    increment(correlationId: string, id: string, rating: number): Promise<RatingV1>;
    decrement(correlationId: string, id: string, rating: number): Promise<RatingV1>;
    deleteById(correlationId: string, id: string): Promise<RatingV1>;
}
