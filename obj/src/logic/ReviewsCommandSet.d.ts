import { CommandSet } from 'pip-services3-commons-nodex';
import { IReviewsController } from './IReviewsController';
export declare class ReviewsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IReviewsController);
    private makeGetReviewsCommand;
    private makeGetReviewByIdCommand;
    private makeGetPartyReviewCommand;
    private makeGetProductRatingCommand;
    private makeSubmitReviewCommand;
    private makeUpdateReviewCommand;
    private makeReportHelpfulCommand;
    private makeReportAbuseCommand;
    private makeDeleteReviewByIdCommand;
}
