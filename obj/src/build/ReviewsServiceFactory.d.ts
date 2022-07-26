import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
export declare class ReviewsServiceFactory extends Factory {
    static Descriptor: Descriptor;
    static ReviewsMemoryPersistenceDescriptor: Descriptor;
    static ReviewsFilePersistenceDescriptor: Descriptor;
    static ReviewsMongoDbPersistenceDescriptor: Descriptor;
    static RatingsMemoryPersistenceDescriptor: Descriptor;
    static RatingsFilePersistenceDescriptor: Descriptor;
    static RatingsMongoDbPersistenceDescriptor: Descriptor;
    static ControllerDescriptor: Descriptor;
    static HttpServiceDescriptor: Descriptor;
    constructor();
}
