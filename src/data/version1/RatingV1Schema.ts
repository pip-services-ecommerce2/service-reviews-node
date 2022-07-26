import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class RatingV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('id', TypeCode.String);
        this.withOptionalProperty('rating_0_count', TypeCode.Integer);
        this.withOptionalProperty('rating_1_count', TypeCode.Integer);
        this.withOptionalProperty('rating_2_count', TypeCode.Integer);
        this.withOptionalProperty('rating_3_count', TypeCode.Integer);
        this.withOptionalProperty('rating_4_count', TypeCode.Integer);
        this.withOptionalProperty('rating_5_count', TypeCode.Integer);
        this.withRequiredProperty('total_count', TypeCode.Integer);
    }
}
