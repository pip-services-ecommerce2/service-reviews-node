import { ConfigParams, SortParams, IdGenerator, Descriptor, NotFoundException } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';

import { ReviewV1 } from '../data/version1/ReviewV1';
import { RatingV1 } from '../data/version1/RatingV1';

import { IReviewsPersistence } from '../persistence/IReviewsPersistence';
import { IReviewsController } from './IReviewsController';
import { ReviewsCommandSet } from './ReviewsCommandSet';
import { IRatingsPersistence } from '../persistence/IRatingsPersistence';

export class ReviewsController implements IConfigurable, IReferenceable, ICommandable, IReviewsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-reviews:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(ReviewsController._defaultConfig);
    private _reviewsPersistence: IReviewsPersistence;
    private _ratingsPersistence: IRatingsPersistence;
    private _commandSet: ReviewsCommandSet;

    public constructor() {
        this._dependencyResolver.put('reviews-persistence', new Descriptor('service-reviews', 'persistence', '*', 'reviews', '1.0'));
        this._dependencyResolver.put('ratings-persistence', new Descriptor('service-reviews', 'persistence', '*', 'ratings', '1.0'));
    }

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._reviewsPersistence = this._dependencyResolver.getOneRequired<IReviewsPersistence>('reviews-persistence');
        this._ratingsPersistence = this._dependencyResolver.getOneRequired<IRatingsPersistence>('ratings-persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new ReviewsCommandSet(this);
        return this._commandSet;
    }

    public async getReviews(correlationId: string, filter: FilterParams, paging: PagingParams, sorting: SortParams): Promise<DataPage<ReviewV1>> {
        return await this._reviewsPersistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getReviewById(correlationId: string, reviewId: string): Promise<ReviewV1> {
        return await this._reviewsPersistence.getOneById(correlationId, reviewId);
    }

    public async getPartyReview(correlationId: string, partyId: string, productId: string): Promise<ReviewV1> {
        let page = await this._reviewsPersistence.getPageByFilter(correlationId, FilterParams.fromValue({
            party_id: partyId,
            product_id: productId
        }), null);

        let review = page && page.data.length > 0 ? page.data[0] : null;

        return review;
    }

    public async getProductRating(correlationId: string, productId: string): Promise<RatingV1> {
        return await this._ratingsPersistence.getOneById(correlationId, productId);
    }

    public async submitReview(correlationId: string, review: ReviewV1): Promise<RatingV1> {

        let rating: RatingV1;

        review.id = review.id ?? IdGenerator.nextLong();
        review.create_time = new Date(Date.now());
        review.update_time = new Date(Date.now());

        review = await this._reviewsPersistence.create(correlationId, review);
        rating = await this._ratingsPersistence.increment(correlationId, review.product_id, review.rating);

        return rating;
    }

    public async updateReview(correlationId: string, review: ReviewV1): Promise<RatingV1> {
        let oldRating = 0;
        let rating: RatingV1;

        let data = await this._reviewsPersistence.getOneById(correlationId, review.id);

        if (data == null) {
            throw new NotFoundException(
                correlationId,
                'NOT_FOUND',
                'Review ' + review.id + ' was not found'
            );
        }

        oldRating = data.rating;

        await this._ratingsPersistence.decrement(correlationId, review.product_id, oldRating);

        review.update_time = new Date(Date.now());
        await this._reviewsPersistence.update(correlationId, review);

        rating = await this._ratingsPersistence.increment(correlationId, review.product_id, review.rating);

        return rating;
    }

    public async reportHelpful(correlationId: string, reviewId: string, partyId: string): Promise<ReviewV1> {
        let review: ReviewV1 = await this._reviewsPersistence.getOneById(correlationId, reviewId);

        review.update_time = new Date(Date.now());
        review.helpful_count = (review.helpful_count ?? 0) + 1;

        review = await this._reviewsPersistence.update(correlationId, review);

        return review;
    }

    public async reportAbuse(correlationId: string, reviewId: string, partyId: string): Promise<ReviewV1> {
        let review: ReviewV1 = await this._reviewsPersistence.getOneById(correlationId, reviewId);

        review.update_time = new Date(Date.now());
        review.abuse_count = (review.abuse_count ?? 0) + 1;

        review = await this._reviewsPersistence.update(correlationId, review);

        return review;
    }

    public async deleteReviewById(correlationId: string, reviewId: string): Promise<RatingV1> {
        let review: ReviewV1 = await this._reviewsPersistence.deleteById(correlationId, reviewId);
        let rating: RatingV1 = await this._ratingsPersistence.decrement(correlationId, review.product_id, review.rating);

        return rating;
    }
}
