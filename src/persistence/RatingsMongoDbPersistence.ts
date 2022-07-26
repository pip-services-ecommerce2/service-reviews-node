import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { RatingV1 } from '../data/version1/RatingV1';
import { IRatingsPersistence } from './IRatingsPersistence';

export class RatingsMongoDbPersistence
    extends IdentifiableMongoDbPersistence<RatingV1, string>
    implements IRatingsPersistence {

    constructor() {
        super('ratings');
    }

    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

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

    public async increment(correlationId: string, id: string, rating: number): Promise<RatingV1> {
        let criteria = {
            _id: id
        };

        let update: any;

        if (rating <= 0) update = { $inc: { rating_0_count: 1, total_count: 1 } };
        else if (rating == 1)  update = { $inc: { rating_1_count: 1, total_count: 1 } };
        else if (rating == 2)  update = { $inc: { rating_2_count: 1, total_count: 1 } };
        else if (rating == 3)  update = { $inc: { rating_3_count: 1, total_count: 1 } };
        else if (rating == 4)  update = { $inc: { rating_4_count: 1, total_count: 1 } };
        else if (rating >= 5)  update = { $inc: { rating_5_count: 1, total_count: 1 } };

        let options = {
            upsert: true,
            returnOriginal: false
        };

        let result = await this._collection.findOneAndUpdate(criteria, update, options);
        let item = result ? this.convertToPublic(result.value) : null;

        if (item)
            this._logger.trace(correlationId, "Updated in %s with id = %s", this._collection, item.id);
        else
            this._logger.trace(correlationId, "Item %s was not found", id);

        return item;
    }

    public async decrement(correlationId: string, id: string, rating: number): Promise<RatingV1> {
            let criteria = {
                _id: id
            };
    
            let update: any;
    
            if (rating <= 0) update = { $inc: { rating_0_count: -1, total_count: -1 } };
            else if (rating == 1)  update = { $inc: { rating_1_count: -1, total_count: -1 } };
            else if (rating == 2)  update = { $inc: { rating_2_count: -1, total_count: -1 } };
            else if (rating == 3)  update = { $inc: { rating_3_count: -1, total_count: -1 } };
            else if (rating == 4)  update = { $inc: { rating_4_count: -1, total_count: -1 } };
            else if (rating >= 5)  update = { $inc: { rating_5_count: -1, total_count: -1 } };
    
            let options = {
                returnOriginal: false
            };
    
            let result = await this._collection.findOneAndUpdate(criteria, update, options);
            let item = result ? this.convertToPublic(result.value) : null;
            
            if (item)
                this._logger.trace(correlationId, "Updated in %s with id = %s", this._collection, item.id);
            else
                this._logger.trace(correlationId, "Item %s was not found", id);

            return item;
    
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RatingV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

}
