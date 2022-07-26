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
exports.RatingsMongoDbPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class RatingsMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('ratings');
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        // Filter ids
        let ids = filter.getAsObject('ids');
        if (typeof ids === 'string')
            ids = ids.split(',');
        if (Array.isArray(ids))
            criteria.push({ _id: { $in: ids } });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    increment(correlationId, id, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {
                _id: id
            };
            let update;
            if (rating <= 0)
                update = { $inc: { rating_0_count: 1, total_count: 1 } };
            else if (rating == 1)
                update = { $inc: { rating_1_count: 1, total_count: 1 } };
            else if (rating == 2)
                update = { $inc: { rating_2_count: 1, total_count: 1 } };
            else if (rating == 3)
                update = { $inc: { rating_3_count: 1, total_count: 1 } };
            else if (rating == 4)
                update = { $inc: { rating_4_count: 1, total_count: 1 } };
            else if (rating >= 5)
                update = { $inc: { rating_5_count: 1, total_count: 1 } };
            let options = {
                upsert: true,
                returnOriginal: false
            };
            let result = yield this._collection.findOneAndUpdate(criteria, update, options);
            let item = result ? this.convertToPublic(result.value) : null;
            if (item)
                this._logger.trace(correlationId, "Updated in %s with id = %s", this._collection, item.id);
            else
                this._logger.trace(correlationId, "Item %s was not found", id);
            return item;
        });
    }
    decrement(correlationId, id, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = {
                _id: id
            };
            let update;
            if (rating <= 0)
                update = { $inc: { rating_0_count: -1, total_count: -1 } };
            else if (rating == 1)
                update = { $inc: { rating_1_count: -1, total_count: -1 } };
            else if (rating == 2)
                update = { $inc: { rating_2_count: -1, total_count: -1 } };
            else if (rating == 3)
                update = { $inc: { rating_3_count: -1, total_count: -1 } };
            else if (rating == 4)
                update = { $inc: { rating_4_count: -1, total_count: -1 } };
            else if (rating >= 5)
                update = { $inc: { rating_5_count: -1, total_count: -1 } };
            let options = {
                returnOriginal: false
            };
            let result = yield this._collection.findOneAndUpdate(criteria, update, options);
            let item = result ? this.convertToPublic(result.value) : null;
            if (item)
                this._logger.trace(correlationId, "Updated in %s with id = %s", this._collection, item.id);
            else
                this._logger.trace(correlationId, "Item %s was not found", id);
            return item;
        });
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, null, null);
        });
    }
}
exports.RatingsMongoDbPersistence = RatingsMongoDbPersistence;
//# sourceMappingURL=RatingsMongoDbPersistence.js.map