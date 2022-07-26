const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { RatingV1 } from '../../src/data/version1/RatingV1';

import { IRatingsPersistence } from '../../src/persistence/IRatingsPersistence';
import { TestModel } from '../data/TestModel';

let RATING1: RatingV1 = TestModel.createRating1();
let RATING2: RatingV1 = TestModel.createRating2();
let RATING3: RatingV1 = TestModel.createRating3();

export class RatingsPersistenceFixture {
    private _persistence: IRatingsPersistence;

    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreateRatings() {
        // Create one Rating
        let rating = await this._persistence.increment(null, '1', 3);

        assert.isObject(rating);
        TestModel.assertEqualRatingV1(rating, RATING1);

        // Create another Rating
        rating = await this._persistence.increment(null, '2', 1);

        assert.isObject(rating);
        TestModel.assertEqualRatingV1(rating, RATING2);

        // Create yet another Rating
        rating = await this._persistence.increment(null, '3', 5);

        assert.isObject(rating);
        TestModel.assertEqualRatingV1(rating, RATING3);
    }

    public async testCrudOperations() {
        let rating1: RatingV1;

        // Create items
        await this.testCreateRatings();

        // Get all Ratings
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );


        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        rating1 = page.data[0];

        // Increment the Rating
        let rating = await this._persistence.increment(null, rating1.id, 5);

        assert.isObject(rating);
        assert.equal(rating.id, rating1.id);
        assert.equal(rating.rating_3_count, 1);
        assert.equal(rating.rating_5_count, 1);

        rating1 = rating;

        // Decrement the Rating
        rating = await this._persistence.decrement(null, rating1.id, 5);

        assert.isObject(rating);
        assert.equal(rating.id, rating1.id);
        assert.equal(rating.rating_3_count, 1);
        assert.equal(rating.rating_5_count, 0);

        rating1 = rating;
        
        // Delete Rating
        await this._persistence.deleteById(null, rating1.id);

        // Try to get delete Rating
        rating = await this._persistence.getOneById(null, rating1.id);

        assert.isNull(rating || null);
    }

    public async testGetWithFilter() {
        // Create Ratings
        await this.testCreateRatings();

        // Get Ratings by ids
        let page = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                ids: ['1', '3']
            }),
            new PagingParams()
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);
    }

}
