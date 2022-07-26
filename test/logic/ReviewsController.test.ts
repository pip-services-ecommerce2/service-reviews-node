const assert = require('chai').assert;

import { ConfigParams, IdGenerator } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { ReviewsMemoryPersistence } from '../../src/persistence/ReviewsMemoryPersistence';
import { ReviewsController } from '../../src/logic/ReviewsController';
import { RatingsMemoryPersistence } from '../../src/persistence/RatingsMemoryPersistence';
import { ReviewV1 } from '../../src/data/version1/ReviewV1';
import { TestModel } from '../data/TestModel';

let REVIEW1: ReviewV1 = TestModel.createReview1();
let REVIEW2: ReviewV1 = TestModel.createReview2();

suite('ReviewsController', () => {
    let reviewsPersistence: ReviewsMemoryPersistence;
    let ratingsPersistence: RatingsMemoryPersistence;
    let controller: ReviewsController;

    setup(async () => {
        reviewsPersistence = new ReviewsMemoryPersistence();
        reviewsPersistence.configure(new ConfigParams());

        ratingsPersistence = new RatingsMemoryPersistence();
        ratingsPersistence.configure(new ConfigParams());

        controller = new ReviewsController();
        controller.configure(new ConfigParams());

        let references = References.fromTuples(
            new Descriptor('service-reviews', 'persistence', 'memory', 'reviews', '1.0'), reviewsPersistence,
            new Descriptor('service-reviews', 'persistence', 'memory', 'ratings', '1.0'), ratingsPersistence,
            new Descriptor('service-reviews', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);

        await reviewsPersistence.open(null);
    });

    teardown(async () => {
        await reviewsPersistence.close(null);
    });

    test('CRUD Operations', async () => {
        let review1: ReviewV1;

        // Create one Review
        let rating = await controller.submitReview(null, REVIEW1);

        assert.isObject(rating);

        // Create another Review
        rating = await controller.submitReview(null, REVIEW2);

        assert.isObject(rating);

        // Get all Reviews
        let page = await controller.getReviews(null, null, null, null);

        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        review1 = Object.assign({}, page.data[0]);

        // Get Review by id
        let review = await controller.getReviewById(null, REVIEW1.id); 

        assert.isObject(review);
        TestModel.assertEqualReviewV1(review, REVIEW1);

        // Get party Review
        review = await controller.getPartyReview(null, REVIEW1.party_id, REVIEW1.product_id);

        assert.isObject(review);
        TestModel.assertEqualReviewV1(review, REVIEW1);
        
        // Get product rating
        rating = await controller.getProductRating(null, REVIEW1.product_id);

        assert.isObject(rating);
        assert.equal(rating.rating_0_count, 1);
        assert.isUndefined(rating.rating_1_count);
        assert.isUndefined(rating.rating_2_count);
        assert.equal(rating.rating_3_count, 1);
        assert.isUndefined(rating.rating_4_count);
        assert.isUndefined(rating.rating_5_count);
        assert.equal(rating.total_count, 2);

        // Update review
        review1.rating = 5;
        review1.testimonial = "Update Test msg";

        rating = await controller.updateReview(null, review1);

        assert.isObject(rating);
        assert.equal(rating.rating_0_count, 0);
        assert.isUndefined(rating.rating_1_count);
        assert.isUndefined(rating.rating_2_count);
        assert.equal(rating.rating_3_count, 1);
        assert.isUndefined(rating.rating_4_count);
        assert.equal(rating.rating_5_count, 1);
        assert.equal(rating.total_count, 2);

        // Get Review by id
        review = await controller.getReviewById(null, review1.id);

        assert.isObject(review);
        TestModel.assertEqualReviewV1(review, review1);
        
        // Report Review helpful
        review = await controller.reportHelpful(null, REVIEW1.id, REVIEW1.party_id);

        assert.isObject(review);
        assert.equal(review.helpful_count, 1);

        // Report Review abuse
        review = await controller.reportAbuse(null, REVIEW2.id, REVIEW2.party_id);

        assert.isObject(review);
        assert.equal(review.abuse_count, 1);
        
        // Delete Review
        let result = await controller.deleteReviewById(null, REVIEW1.id);

        // assert.isNull(result);

        // Try to get delete Review
        result = await controller.getReviewById(null, REVIEW1.id);

        // assert.isNull(result);
    });
});