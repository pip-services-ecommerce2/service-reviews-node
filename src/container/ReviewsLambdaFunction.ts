import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { ReviewsServiceFactory } from '../build/ReviewsServiceFactory';

export class ReviewsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("reviews", "Reviews function");
        this._dependencyResolver.put('controller', new Descriptor('service-reviews', 'controller', 'default', '*', '*'));
        this._factories.add(new ReviewsServiceFactory());
    }
}

export const handler = new ReviewsLambdaFunction().getHandler();