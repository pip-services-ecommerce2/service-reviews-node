"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class RatingV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('rating_0_count', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withOptionalProperty('rating_1_count', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withOptionalProperty('rating_2_count', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withOptionalProperty('rating_3_count', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withOptionalProperty('rating_4_count', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withOptionalProperty('rating_5_count', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withRequiredProperty('total_count', pip_services3_commons_nodex_2.TypeCode.Integer);
    }
}
exports.RatingV1Schema = RatingV1Schema;
//# sourceMappingURL=RatingV1Schema.js.map