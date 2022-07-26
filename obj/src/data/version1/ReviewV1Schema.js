"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class ReviewV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('product_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('party_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('create_time', pip_services3_commons_nodex_2.TypeCode.DateTime);
        this.withOptionalProperty('update_time', pip_services3_commons_nodex_2.TypeCode.DateTime);
        this.withRequiredProperty('rating', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withOptionalProperty('testimonial', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('full_review', pip_services3_commons_nodex_2.TypeCode.Boolean);
        this.withOptionalProperty('helpful_count', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withOptionalProperty('abuse_count', pip_services3_commons_nodex_2.TypeCode.Integer);
    }
}
exports.ReviewV1Schema = ReviewV1Schema;
//# sourceMappingURL=ReviewV1Schema.js.map