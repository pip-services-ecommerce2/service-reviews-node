const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { ReviewV1 } from '../../src/data/version1/ReviewV1';
import { ReviewsLambdaFunction } from '../../src/container/ReviewsLambdaFunction';
import { TestModel } from '../data/TestModel';

let REVIEW1: ReviewV1 = TestModel.createReview1();
let REVIEW2: ReviewV1 = TestModel.createReview2();

suite('ReviewsLambdaFunction', () => {
    let lambda: ReviewsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-reviews:persistence:memory:reviews:1.0',
            'persistence.descriptor', 'service-reviews:persistence:memory:ratings:1.0',
            'controller.descriptor', 'service-reviews:controller:default:default:1.0'
        );

        lambda = new ReviewsLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });

    suiteTeardown(async () => {
        await lambda.close(null);
    });

    test('CRUD Operations', async () => {
        // Create one Review
        let rating = await lambda.act(
            {
                role: 'reviews',
                cmd: 'submit_review',
                review: REVIEW1
            }
        );

        assert.isObject(rating);

        // Create another Review
        rating = await lambda.act(
            {
                role: 'reviews',
                cmd: 'submit_review',
                review: REVIEW2
            }
        );

        assert.isObject(rating);

        // Get all Reviews
        let page = await lambda.act(
            {
                role: 'reviews',
                cmd: 'get_reviews'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Get Review by id
        let review = await lambda.act(
            {
                role: 'reviews',
                cmd: 'get_review_by_id',
                review_id: REVIEW1.id
            }
        );

        assert.isObject(review);
        TestModel.assertEqualReviewV1(review, REVIEW1);

        // Get party Review
        review = await lambda.act(
            {
                role: 'reviews',
                cmd: 'get_party_review',
                party_id: REVIEW1.party_id,
                product_id: REVIEW1.product_id,
            }
        );

        assert.isObject(review);
        TestModel.assertEqualReviewV1(review, REVIEW1);

        // Get product rating
        rating = await lambda.act(
            {
                role: 'reviews',
                cmd: 'get_product_rating',
                product_id: REVIEW1.product_id,
            }
        );

        assert.isObject(rating);
        assert.equal(rating.rating_0_count, 1);
        assert.isUndefined(rating.rating_1_count);
        assert.isUndefined(rating.rating_2_count);
        assert.equal(rating.rating_3_count, 1);
        assert.isUndefined(rating.rating_4_count);
        assert.isUndefined(rating.rating_5_count);
        assert.equal(rating.total_count, 2);

        // Report Review helpful
        review = await lambda.act(
            {
                role: 'reviews',
                cmd: 'report_helpful',
                review_id: REVIEW1.id,
                party_id: REVIEW1.party_id
            }
        );

        assert.isObject(review);
        assert.equal(review.helpful_count, 1);

        // Report Review abuse
        review = await lambda.act(
            {
                role: 'reviews',
                cmd: 'report_abuse',
                review_id: REVIEW2.id,
                party_id: REVIEW2.party_id
            }
        );

        assert.isObject(review);
        assert.equal(review.abuse_count, 1);

        // Delete Review
        await lambda.act(
            {
                role: 'reviews',
                cmd: 'delete_review_by_id',
                review_id: REVIEW1.id,
            }
        );

        // Try to get delete Review
        review = await lambda.act(
            {
                role: 'reviews',
                cmd: 'get_review_by_id',
                review_id: REVIEW1.id,
            }
        );
        
        assert.isNull(review || null);
    });
});