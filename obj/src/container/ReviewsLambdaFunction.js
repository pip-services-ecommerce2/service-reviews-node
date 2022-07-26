"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.ReviewsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const ReviewsServiceFactory_1 = require("../build/ReviewsServiceFactory");
class ReviewsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("reviews", "Reviews function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-reviews', 'controller', 'default', '*', '*'));
        this._factories.add(new ReviewsServiceFactory_1.ReviewsServiceFactory());
    }
}
exports.ReviewsLambdaFunction = ReviewsLambdaFunction;
exports.handler = new ReviewsLambdaFunction().getHandler();
//# sourceMappingURL=ReviewsLambdaFunction.js.map