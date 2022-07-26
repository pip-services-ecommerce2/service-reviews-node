import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { RatingsMemoryPersistence } from './RatingsMemoryPersistence';
import { RatingV1 } from '../data/version1/RatingV1';

export class RatingsFilePersistence extends RatingsMemoryPersistence {
	protected _persister: JsonFilePersister<RatingV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<RatingV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}