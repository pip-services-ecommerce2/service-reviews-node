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
exports.ReviewsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const ReviewV1Schema_1 = require("../data/version1/ReviewV1Schema");
class ReviewsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetReviewsCommand());
        this.addCommand(this.makeGetReviewByIdCommand());
        this.addCommand(this.makeGetPartyReviewCommand());
        this.addCommand(this.makeGetProductRatingCommand());
        this.addCommand(this.makeSubmitReviewCommand());
        this.addCommand(this.makeUpdateReviewCommand());
        this.addCommand(this.makeReportHelpfulCommand());
        this.addCommand(this.makeReportAbuseCommand());
        this.addCommand(this.makeDeleteReviewByIdCommand());
    }
    makeGetReviewsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_reviews", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getReviews(correlationId, filter, paging, null);
        }));
    }
    makeGetReviewByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_review_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('review_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let reviewId = args.getAsString("review_id");
            return yield this._logic.getReviewById(correlationId, reviewId);
        }));
    }
    makeGetPartyReviewCommand() {
        return new pip_services3_commons_nodex_2.Command("get_party_review", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('party_id', pip_services3_commons_nodex_6.TypeCode.String)
            .withRequiredProperty('product_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let partyId = args.getAsString("party_id");
            let productId = args.getAsString("product_id");
            return yield this._logic.getPartyReview(correlationId, partyId, productId);
        }));
    }
    makeGetProductRatingCommand() {
        return new pip_services3_commons_nodex_2.Command("get_product_rating", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('product_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let productId = args.getAsString("product_id");
            return yield this._logic.getProductRating(correlationId, productId);
        }));
    }
    makeSubmitReviewCommand() {
        return new pip_services3_commons_nodex_2.Command("submit_review", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('review', new ReviewV1Schema_1.ReviewV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let review = args.get("review");
            return yield this._logic.submitReview(correlationId, review);
        }));
    }
    makeUpdateReviewCommand() {
        return new pip_services3_commons_nodex_2.Command("update_review", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('review', new ReviewV1Schema_1.ReviewV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let review = args.get("review");
            let res = yield this._logic.updateReview(correlationId, review);
            return res;
        }));
    }
    makeReportHelpfulCommand() {
        return new pip_services3_commons_nodex_2.Command("report_helpful", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('review_id', pip_services3_commons_nodex_6.TypeCode.String)
            .withRequiredProperty('party_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let reviewId = args.get("review_id");
            let partyId = args.get("party_id");
            return yield this._logic.reportHelpful(correlationId, reviewId, partyId);
        }));
    }
    makeReportAbuseCommand() {
        return new pip_services3_commons_nodex_2.Command("report_abuse", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('review_id', pip_services3_commons_nodex_6.TypeCode.String)
            .withRequiredProperty('party_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let reviewId = args.get("review_id");
            let partyId = args.get("party_id");
            return yield this._logic.reportAbuse(correlationId, reviewId, partyId);
        }));
    }
    makeDeleteReviewByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_review_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('review_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let reviewId = args.getAsNullableString("review_id");
            return yield this._logic.deleteReviewById(correlationId, reviewId);
        }));
    }
}
exports.ReviewsCommandSet = ReviewsCommandSet;
//# sourceMappingURL=ReviewsCommandSet.js.map