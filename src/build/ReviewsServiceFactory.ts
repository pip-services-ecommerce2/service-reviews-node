import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { ReviewsMongoDbPersistence } from '../persistence/ReviewsMongoDbPersistence';
import { ReviewsFilePersistence } from '../persistence/ReviewsFilePersistence';
import { ReviewsMemoryPersistence } from '../persistence/ReviewsMemoryPersistence';

import { RatingsMemoryPersistence } from '../persistence/RatingsMemoryPersistence';
import { RatingsFilePersistence } from '../persistence/RatingsFilePersistence';
import { RatingsMongoDbPersistence } from '../persistence/RatingsMongoDbPersistence';

import { ReviewsController } from '../logic/ReviewsController';
import { ReviewsHttpServiceV1 } from '../services/version1/ReviewsHttpServiceV1';


export class ReviewsServiceFactory extends Factory {
    public static Descriptor = new Descriptor("service-reviews", "factory", "default", "default", "1.0");

    public static ReviewsMemoryPersistenceDescriptor = new Descriptor("service-reviews", "persistence", "memory", "reviews", "1.0");
    public static ReviewsFilePersistenceDescriptor = new Descriptor("service-reviews", "persistence", "file", "reviews", "1.0");
    public static ReviewsMongoDbPersistenceDescriptor = new Descriptor("service-reviews", "persistence", "mongodb", "reviews", "1.0");

    public static RatingsMemoryPersistenceDescriptor = new Descriptor("service-reviews", "persistence", "memory", "ratings", "1.0");
    public static RatingsFilePersistenceDescriptor = new Descriptor("service-reviews", "persistence", "file", "ratings", "1.0");
    public static RatingsMongoDbPersistenceDescriptor = new Descriptor("service-reviews", "persistence", "mongodb", "ratings", "1.0");

    public static ControllerDescriptor = new Descriptor("service-reviews", "controller", "default", "*", "1.0");
    public static HttpServiceDescriptor = new Descriptor("service-reviews", "service", "http", "*", "1.0");

    constructor() {
        super();
        
        this.registerAsType(ReviewsServiceFactory.ReviewsMemoryPersistenceDescriptor, ReviewsMemoryPersistence);
        this.registerAsType(ReviewsServiceFactory.ReviewsFilePersistenceDescriptor, ReviewsFilePersistence);
        this.registerAsType(ReviewsServiceFactory.ReviewsMongoDbPersistenceDescriptor, ReviewsMongoDbPersistence);

        this.registerAsType(ReviewsServiceFactory.RatingsMemoryPersistenceDescriptor, RatingsMemoryPersistence);
        this.registerAsType(ReviewsServiceFactory.RatingsFilePersistenceDescriptor, RatingsFilePersistence);
        this.registerAsType(ReviewsServiceFactory.RatingsMongoDbPersistenceDescriptor, RatingsMongoDbPersistence);

        this.registerAsType(ReviewsServiceFactory.ControllerDescriptor, ReviewsController);
        this.registerAsType(ReviewsServiceFactory.HttpServiceDescriptor, ReviewsHttpServiceV1);
    }

}
