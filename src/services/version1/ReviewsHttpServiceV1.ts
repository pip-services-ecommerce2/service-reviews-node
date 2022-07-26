import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class ReviewsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/reviews');
        this._dependencyResolver.put('controller', new Descriptor('service-reviews', 'controller', 'default', '*', '1.0'));
    }
}