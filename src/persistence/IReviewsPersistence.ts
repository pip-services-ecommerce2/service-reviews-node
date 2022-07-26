import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';

import { ReviewV1 } from '../data/version1/ReviewV1';

export interface IReviewsPersistence extends IGetter<ReviewV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ReviewV1>>;

    getOneById(correlationId: string, id: string): Promise<ReviewV1>;
        
    create(correlation_id: string, review: ReviewV1): Promise<ReviewV1>;

    update(correlation_id: string, review: ReviewV1): Promise<ReviewV1>;

    deleteById(correlationId: string, id: string): Promise<ReviewV1>;
}
