import { ProcessContainer } from 'pip-services3-container-nodex';

import { ReviewsServiceFactory } from '../build/ReviewsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

export class ReviewsProcess extends ProcessContainer {

    public constructor() {
        super("reviews", "Reviews microservice");
        this._factories.add(new ReviewsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
