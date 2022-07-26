import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { ReviewV1Schema } from '../data/version1/ReviewV1Schema';
import { IReviewsController } from './IReviewsController';

export class ReviewsCommandSet extends CommandSet {
    private _logic: IReviewsController;

    constructor(logic: IReviewsController) {
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

	private makeGetReviewsCommand(): ICommand {
		return new Command(
			"get_reviews",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                return await this._logic.getReviews(correlationId, filter, paging, null);
            }
		);
	}

	private makeGetReviewByIdCommand(): ICommand {
		return new Command(
			"get_review_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('review_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let reviewId = args.getAsString("review_id");
                return await this._logic.getReviewById(correlationId, reviewId);
            }
		);
	}

	private makeGetPartyReviewCommand(): ICommand {
		return new Command(
			"get_party_review",
			new ObjectSchema(true)
                .withRequiredProperty('party_id', TypeCode.String)
                .withRequiredProperty('product_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let partyId = args.getAsString("party_id");
                let productId = args.getAsString("product_id");
                return await this._logic.getPartyReview(correlationId, partyId, productId);
            }
		);
    }
    
	private makeGetProductRatingCommand(): ICommand {
		return new Command(
			"get_product_rating",
			new ObjectSchema(true)
                .withRequiredProperty('product_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let productId = args.getAsString("product_id");
                return await this._logic.getProductRating(correlationId, productId);
            }
		);
    }

	private makeSubmitReviewCommand(): ICommand {
		return new Command(
			"submit_review",
			new ObjectSchema(true)
				.withRequiredProperty('review', new ReviewV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let review = args.get("review");
                return await this._logic.submitReview(correlationId, review);
            }
		);
    }
    
    private makeUpdateReviewCommand(): ICommand {
		return new Command(
			"update_review",
			new ObjectSchema(true)
				.withRequiredProperty('review', new ReviewV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let review = args.get("review");
                let res = await this._logic.updateReview(correlationId, review);
                return res;
            }
		);
	}

	private makeReportHelpfulCommand(): ICommand {
		return new Command(
			"report_helpful",
			new ObjectSchema(true)
                .withRequiredProperty('review_id', TypeCode.String)
                .withRequiredProperty('party_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let reviewId = args.get("review_id");
                let partyId = args.get("party_id");
                return await this._logic.reportHelpful(correlationId, reviewId, partyId);
            }
		);
    }
    
	private makeReportAbuseCommand(): ICommand {
		return new Command(
			"report_abuse",
			new ObjectSchema(true)
                .withRequiredProperty('review_id', TypeCode.String)
                .withRequiredProperty('party_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let reviewId = args.get("review_id");
                let partyId = args.get("party_id");
                return await this._logic.reportAbuse(correlationId, reviewId, partyId);
            }
		);
	}
	
	private makeDeleteReviewByIdCommand(): ICommand {
		return new Command(
			"delete_review_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('review_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let reviewId = args.getAsNullableString("review_id");
                return await this._logic.deleteReviewById(correlationId, reviewId);
			}
		);
	}
}