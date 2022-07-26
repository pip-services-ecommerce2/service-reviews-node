import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class ReviewV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('product_id', TypeCode.String);
        this.withRequiredProperty('party_id', TypeCode.String);

        this.withOptionalProperty('create_time', TypeCode.DateTime);
        this.withOptionalProperty('update_time', TypeCode.DateTime);

        this.withRequiredProperty('rating', TypeCode.Integer);
        this.withOptionalProperty('testimonial', TypeCode.String);
        this.withOptionalProperty('full_review', TypeCode.Boolean);

        this.withOptionalProperty('helpful_count', TypeCode.Integer);
        this.withOptionalProperty('abuse_count', TypeCode.Integer);
    }
}
