const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { ReviewV1 } from '../../../src/data/version1/ReviewV1';
import { ReviewsMemoryPersistence } from '../../../src/persistence/ReviewsMemoryPersistence';
import { ReviewsController } from '../../../src/logic/ReviewsController';
import { ReviewsHttpServiceV1 } from '../../../src/services/version1/ReviewsHttpServiceV1';
import { TestModel } from '../../data/TestModel';
import { RatingsMemoryPersistence } from '../../../src/persistence/RatingsMemoryPersistence';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let REVIEW1: ReviewV1 = TestModel.createReview1();
let REVIEW2: ReviewV1 = TestModel.createReview2();


suite('ReviewsHttpServiceV1', () => {
    let service: ReviewsHttpServiceV1;
    let rest: any;

    suiteSetup(async () => {
        let reviewsPersistence = new ReviewsMemoryPersistence();
        let ratingsPersistence = new RatingsMemoryPersistence();
        let controller = new ReviewsController();

        service = new ReviewsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-reviews', 'persistence', 'memory', 'reviews', '1.0'), reviewsPersistence,
            new Descriptor('service-reviews', 'persistence', 'memory', 'ratings', '1.0'), ratingsPersistence,
            new Descriptor('service-reviews', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-reviews', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });

    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });


    test('CRUD Operations', async () => {

        let review1:ReviewV1;

        // Create one Review
        let rating = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/reviews/submit_review',
                {
                    review: REVIEW1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(rating);

        // Create another Review
        rating = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/reviews/submit_review',
                {
                    review: REVIEW2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(rating);

        // Get all Reviews
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/reviews/get_reviews',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        review1 = page.data[0];

        // Get Review by id
        let review = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/reviews/get_review_by_id',
                {
                    review_id: REVIEW1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(review);
        TestModel.assertEqualReviewV1(review, REVIEW1);

        // Get party Review
        review = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/reviews/get_party_review',
                {
                    party_id: REVIEW1.party_id,
                    product_id: REVIEW1.product_id,
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(review);
        TestModel.assertEqualReviewV1(review, REVIEW1);

        // Get product rating
        review = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/reviews/get_product_rating',
                {
                    product_id: REVIEW1.product_id,
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(rating);
        assert.equal(rating.rating_0_count, 1);
        assert.isUndefined(rating.rating_1_count);
        assert.isUndefined(rating.rating_2_count);
        assert.equal(rating.rating_3_count, 1);
        assert.isUndefined(rating.rating_4_count);
        assert.isUndefined(rating.rating_5_count);
        assert.equal(rating.total_count, 2);

        // Update Review
        review1.rating = 5;
        review1.testimonial = "Update Test msg";

        rating = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/reviews/update_review',
                {
                    review: review1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(rating);
        assert.equal(rating.rating_0_count, 0);
        assert.isUndefined(rating.rating_1_count);
        assert.isUndefined(rating.rating_2_count);
        assert.equal(rating.rating_3_count, 1);
        assert.isUndefined(rating.rating_4_count);
        assert.equal(rating.rating_5_count, 1);
        assert.equal(rating.total_count, 2);

        // Get Review by id
        review = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/reviews/get_review_by_id',
                {
                    review_id: review1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(review);
        TestModel.assertEqualReviewV1(review, review1);

        // Report Review helpful
        review = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/reviews/report_helpful',
                {
                    review_id: REVIEW1.id,
                    party_id: REVIEW1.party_id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(review);
        assert.equal(review.helpful_count, 1);

        // Report Review abuse
        review = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/reviews/report_abuse',
                {
                    review_id: REVIEW2.id,
                    party_id: REVIEW2.party_id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(review);
        assert.equal(review.abuse_count, 1);

        // Delete Review
        let result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/reviews/delete_review_by_id',
                {
                    review_id: REVIEW1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(result);

        // Try to get delete Review
        result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/reviews/get_review_by_id',
                {
                    review_id: REVIEW1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        //assert.isNull(result);
    });
});