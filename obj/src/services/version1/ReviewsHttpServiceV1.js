"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class ReviewsHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/reviews');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-reviews', 'controller', 'default', '*', '1.0'));
    }
}
exports.ReviewsHttpServiceV1 = ReviewsHttpServiceV1;
//# sourceMappingURL=ReviewsHttpServiceV1.js.map