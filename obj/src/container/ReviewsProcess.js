"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const ReviewsServiceFactory_1 = require("../build/ReviewsServiceFactory");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class ReviewsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("reviews", "Reviews microservice");
        this._factories.add(new ReviewsServiceFactory_1.ReviewsServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.ReviewsProcess = ReviewsProcess;
//# sourceMappingURL=ReviewsProcess.js.map