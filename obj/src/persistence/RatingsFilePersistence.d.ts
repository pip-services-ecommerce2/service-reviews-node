import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { RatingsMemoryPersistence } from './RatingsMemoryPersistence';
import { RatingV1 } from '../data/version1/RatingV1';
export declare class RatingsFilePersistence extends RatingsMemoryPersistence {
    protected _persister: JsonFilePersister<RatingV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
