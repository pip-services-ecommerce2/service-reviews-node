import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { ReviewV1 } from '../data/version1/ReviewV1';
import { IReviewsPersistence } from './IReviewsPersistence';
export declare class ReviewsMemoryPersistence extends IdentifiableMemoryPersistence<ReviewV1, string> implements IReviewsPersistence {
    constructor();
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ReviewV1>>;
}
