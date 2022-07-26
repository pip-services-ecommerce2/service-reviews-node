"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const ReviewsCommandSet_1 = require("./ReviewsCommandSet");
class ReviewsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(ReviewsController._defaultConfig);
        this._dependencyResolver.put('reviews-persistence', new pip_services3_commons_nodex_1.Descriptor('service-reviews', 'persistence', '*', 'reviews', '1.0'));
        this._dependencyResolver.put('ratings-persistence', new pip_services3_commons_nodex_1.Descriptor('service-reviews', 'persistence', '*', 'ratings', '1.0'));
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._reviewsPersistence = this._dependencyResolver.getOneRequired('reviews-persistence');
        this._ratingsPersistence = this._dependencyResolver.getOneRequired('ratings-persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new ReviewsCommandSet_1.ReviewsCommandSet(this);
        return this._commandSet;
    }
    getReviews(correlationId, filter, paging, sorting) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewsPersistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getReviewById(correlationId, reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._reviewsPersistence.getOneById(correlationId, reviewId);
        });
    }
    getPartyReview(correlationId, partyId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = yield this._reviewsPersistence.getPageByFilter(correlationId, pip_services3_commons_nodex_3.FilterParams.fromValue({
                party_id: partyId,
                product_id: productId
            }), null);
            let review = page && page.data.length > 0 ? page.data[0] : null;
            return review;
        });
    }
    getProductRating(correlationId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._ratingsPersistence.getOneById(correlationId, productId);
        });
    }
    submitReview(correlationId, review) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let rating;
            review.id = (_a = review.id) !== null && _a !== void 0 ? _a : pip_services3_commons_nodex_1.IdGenerator.nextLong();
            review.create_time = new Date(Date.now());
            review.update_time = new Date(Date.now());
            review = yield this._reviewsPersistence.create(correlationId, review);
            rating = yield this._ratingsPersistence.increment(correlationId, review.product_id, review.rating);
            return rating;
        });
    }
    updateReview(correlationId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldRating = 0;
            let rating;
            let data = yield this._reviewsPersistence.getOneById(correlationId, review.id);
            if (data == null) {
                throw new pip_services3_commons_nodex_1.NotFoundException(correlationId, 'NOT_FOUND', 'Review ' + review.id + ' was not found');
            }
            oldRating = data.rating;
            yield this._ratingsPersistence.decrement(correlationId, review.product_id, oldRating);
            review.update_time = new Date(Date.now());
            yield this._reviewsPersistence.update(correlationId, review);
            rating = yield this._ratingsPersistence.increment(correlationId, review.product_id, review.rating);
            return rating;
        });
    }
    reportHelpful(correlationId, reviewId, partyId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let review = yield this._reviewsPersistence.getOneById(correlationId, reviewId);
            review.update_time = new Date(Date.now());
            review.helpful_count = ((_a = review.helpful_count) !== null && _a !== void 0 ? _a : 0) + 1;
            review = yield this._reviewsPersistence.update(correlationId, review);
            return review;
        });
    }
    reportAbuse(correlationId, reviewId, partyId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let review = yield this._reviewsPersistence.getOneById(correlationId, reviewId);
            review.update_time = new Date(Date.now());
            review.abuse_count = ((_a = review.abuse_count) !== null && _a !== void 0 ? _a : 0) + 1;
            review = yield this._reviewsPersistence.update(correlationId, review);
            return review;
        });
    }
    deleteReviewById(correlationId, reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            let review = yield this._reviewsPersistence.deleteById(correlationId, reviewId);
            let rating = yield this._ratingsPersistence.decrement(correlationId, review.product_id, review.rating);
            return rating;
        });
    }
}
exports.ReviewsController = ReviewsController;
ReviewsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-reviews:persistence:*:*:1.0');
//# sourceMappingURL=ReviewsController.js.map