const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { ReviewV1 } from '../../src/data/version1/ReviewV1';

import { IReviewsPersistence } from '../../src/persistence/IReviewsPersistence';
import { TestModel } from '../data/TestModel';

let REVIEW1: ReviewV1 = TestModel.createReview1();
let REVIEW2: ReviewV1 = TestModel.createReview2();
let REVIEW3: ReviewV1 = TestModel.createReview3();

export class ReviewsPersistenceFixture {
    private _persistence: IReviewsPersistence;

    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreateReviews() {
        // Create one Review
        let review = await this._persistence.create(null, REVIEW1);

        assert.isObject(review);
        TestModel.assertEqualReviewV1(review, REVIEW1);

        // Create another Review
        review = await this._persistence.create(null, REVIEW2);

        assert.isObject(review);
        TestModel.assertEqualReviewV1(review, REVIEW2);

        // Create yet another Review
        review = await this._persistence.create(null, REVIEW3);

        assert.isObject(review);
        TestModel.assertEqualReviewV1(review, REVIEW3);
    }

    public async testCrudOperations() {
        let review1: ReviewV1;

        // Create items
        await this.testCreateReviews();

        // Get all Reviews
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        review1 = page.data[0];

        // Update the Review
        review1.testimonial = 'Updated Review 1';

        let review = await this._persistence.update(null, review1);

        assert.isObject(review);
        assert.equal(review.testimonial, 'Updated Review 1');

        review1 = review;

        // Delete Review
        await this._persistence.deleteById(null, review1.id);

        // Try to get delete Review
        review = await this._persistence.getOneById(null, review1.id);

        assert.isNull(review || null);
    }

    public async testGetWithFilter() {
        // Create Reviews
        await this.testCreateReviews();

        // Get Reviews filtered by party id
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                party_id: '1'
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 1);

        // Get Reviews by product id
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                product_id: '1'
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        // Get Reviews by full review
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                full_review: true
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get Reviews by ids
        page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                ids: ['1', '3']
            }),
            new PagingParams()
        );

        assert.isObject(page);
        // PayPal manages ids by itself
        // assert.lengthOf(page.data, 2);
    }

}
