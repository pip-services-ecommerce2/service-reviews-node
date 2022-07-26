import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { ReviewV1 } from '../data/version1/ReviewV1';
import { IReviewsPersistence } from './IReviewsPersistence';

export class ReviewsMemoryPersistence 
    extends IdentifiableMemoryPersistence<ReviewV1, string> 
    implements IReviewsPersistence {

    constructor() {
        super();
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let id = filter.getAsNullableString('id');
        let productId = filter.getAsNullableString('product_id');
        let partyId = filter.getAsNullableString('party_id');
        let fullReview = filter.getAsNullableBoolean('full_review');
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
            if (productId && item.product_id != productId) 
                return false;
            if (partyId && item.party_id != partyId) 
                return false;
            if (fullReview != null && item.full_review != fullReview) 
                return false;
            return true; 
        };
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ReviewV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }
}
