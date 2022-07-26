import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { SortParams } from 'pip-services3-commons-nodex';
import { RatingV1 } from '../data/version1';

import { ReviewV1 } from '../data/version1/ReviewV1';

export interface IReviewsController {
    getReviews(correlationId: string, filter: FilterParams, paging: PagingParams, sorting: SortParams): Promise<DataPage<ReviewV1>>;

    getReviewById(correlationId: string, reviewId: string): Promise<ReviewV1>;

    getPartyReview(correlationId: string, partyId: string, productId: string): Promise<ReviewV1>;

    getProductRating(correlationId: string, productId: string): Promise<RatingV1>;

    submitReview(correlationId: string, review: ReviewV1): Promise<RatingV1>;

    updateReview(correlationId: string, review: ReviewV1): Promise<RatingV1>;

    reportHelpful(correlationId: string, reviewId: string, partyId: string): Promise<ReviewV1>;

    reportAbuse(correlationId: string, reviewId: string, partyId: string): Promise<ReviewV1>;

    deleteReviewById(correlationId: string, reviewId: string): Promise<RatingV1>;
}
