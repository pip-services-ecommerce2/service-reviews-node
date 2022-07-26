import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { RatingV1 } from '../data/version1/RatingV1';
import { IRatingsPersistence } from './IRatingsPersistence';

export class RatingsMemoryPersistence
    extends IdentifiableMemoryPersistence<RatingV1, string>
    implements IRatingsPersistence {

    constructor() {
        super();
    }

    public async increment(correlationId: string, id: string, rating: number): Promise<RatingV1> {
        let item: RatingV1 = await this.getOneById(correlationId, id);
        
        if (item) {
            this.incrementRating(item, rating);
            item = await this.update(correlationId, item);
        }
        else {
            item = new RatingV1();
            item.id = id;
            this.incrementRating(item, rating);
            item = await this.create(correlationId, item);
        }

        return item;
    }

    public async decrement(correlationId: string, id: string, rating: number): Promise<RatingV1> {
        let item = await this.getOneById(correlationId, id);

        if (item) {
            this.decrementRating(item, rating);
            item = await this.update(correlationId, item);
        }

        return item;
    }

    private incrementRating(item: RatingV1, rating: number) {
        switch (rating) {
            case 0: item.rating_0_count = (item.rating_0_count ?? 0) + 1; break;
            case 1: item.rating_1_count = (item.rating_1_count ?? 0) + 1; break;
            case 2: item.rating_2_count = (item.rating_2_count ?? 0) + 1; break;
            case 3: item.rating_3_count = (item.rating_3_count ?? 0) + 1; break;
            case 4: item.rating_4_count = (item.rating_4_count ?? 0) + 1; break;
            case 5: item.rating_5_count = (item.rating_5_count ?? 0) + 1; break;
            default:
                break;
        }

        item.total_count = (item.total_count ?? 0) + 1;
    }

    private decrementRating(item: RatingV1, rating: number) {
        switch (rating) {
            case 0: item.rating_0_count = (item.rating_0_count ?? 0) - 1; break;
            case 1: item.rating_1_count = (item.rating_1_count ?? 0) - 1; break;
            case 2: item.rating_2_count = (item.rating_2_count ?? 0) - 1; break;
            case 3: item.rating_3_count = (item.rating_3_count ?? 0) - 1; break;
            case 4: item.rating_4_count = (item.rating_4_count ?? 0) - 1; break;
            case 5: item.rating_5_count = (item.rating_5_count ?? 0) - 1; break;
            default:
                break;
        }

        item.total_count = (item.total_count ?? 0) - 1;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

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

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RatingV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }
}
