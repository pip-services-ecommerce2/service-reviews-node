"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const ReviewsMemoryPersistence_1 = require("./ReviewsMemoryPersistence");
class ReviewsFilePersistence extends ReviewsMemoryPersistence_1.ReviewsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.ReviewsFilePersistence = ReviewsFilePersistence;
//# sourceMappingURL=ReviewsFilePersistence.js.map