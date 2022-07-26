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
exports.RatingsMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const RatingV1_1 = require("../data/version1/RatingV1");
class RatingsMemoryPersistence extends pip_services3_data_nodex_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    increment(correlationId, id, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = yield this.getOneById(correlationId, id);
            if (item) {
                this.incrementRating(item, rating);
                item = yield this.update(correlationId, item);
            }
            else {
                item = new RatingV1_1.RatingV1();
                item.id = id;
                this.incrementRating(item, rating);
                item = yield this.create(correlationId, item);
            }
            return item;
        });
    }
    decrement(correlationId, id, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = yield this.getOneById(correlationId, id);
            if (item) {
                this.decrementRating(item, rating);
                item = yield this.update(correlationId, item);
            }
            return item;
        });
    }
    incrementRating(item, rating) {
        var _a, _b, _c, _d, _e, _f, _g;
        switch (rating) {
            case 0:
                item.rating_0_count = ((_a = item.rating_0_count) !== null && _a !== void 0 ? _a : 0) + 1;
                break;
            case 1:
                item.rating_1_count = ((_b = item.rating_1_count) !== null && _b !== void 0 ? _b : 0) + 1;
                break;
            case 2:
                item.rating_2_count = ((_c = item.rating_2_count) !== null && _c !== void 0 ? _c : 0) + 1;
                break;
            case 3:
                item.rating_3_count = ((_d = item.rating_3_count) !== null && _d !== void 0 ? _d : 0) + 1;
                break;
            case 4:
                item.rating_4_count = ((_e = item.rating_4_count) !== null && _e !== void 0 ? _e : 0) + 1;
                break;
            case 5:
                item.rating_5_count = ((_f = item.rating_5_count) !== null && _f !== void 0 ? _f : 0) + 1;
                break;
            default:
                break;
        }
        item.total_count = ((_g = item.total_count) !== null && _g !== void 0 ? _g : 0) + 1;
    }
    decrementRating(item, rating) {
        var _a, _b, _c, _d, _e, _f, _g;
        switch (rating) {
            case 0:
                item.rating_0_count = ((_a = item.rating_0_count) !== null && _a !== void 0 ? _a : 0) - 1;
                break;
            case 1:
                item.rating_1_count = ((_b = item.rating_1_count) !== null && _b !== void 0 ? _b : 0) - 1;
                break;
            case 2:
                item.rating_2_count = ((_c = item.rating_2_count) !== null && _c !== void 0 ? _c : 0) - 1;
                break;
            case 3:
                item.rating_3_count = ((_d = item.rating_3_count) !== null && _d !== void 0 ? _d : 0) - 1;
                break;
            case 4:
                item.rating_4_count = ((_e = item.rating_4_count) !== null && _e !== void 0 ? _e : 0) - 1;
                break;
            case 5:
                item.rating_5_count = ((_f = item.rating_5_count) !== null && _f !== void 0 ? _f : 0) - 1;
                break;
            default:
                break;
        }
        item.total_count = ((_g = item.total_count) !== null && _g !== void 0 ? _g : 0) - 1;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let ids = filter.getAsObject('ids');
        // Process ids filter
        if (typeof ids === 'string')
            ids = ids.split(',');
        if (!Array.isArray(ids))
            ids = null;
        return (item) => {
            if (id && item.id != id)
                return false;
            if (ids && ids.indexOf(item.id) < 0)
                return false;
            return true;
        };
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
exports.RatingsMemoryPersistence = RatingsMemoryPersistence;
//# sourceMappingURL=RatingsMemoryPersistence.js.map