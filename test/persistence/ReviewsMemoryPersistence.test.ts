import { ConfigParams } from 'pip-services3-commons-nodex';

import { ReviewsMemoryPersistence } from '../../src/persistence/ReviewsMemoryPersistence';
import { ReviewsPersistenceFixture } from './ReviewsPersistenceFixture';

suite('ReviewsMemoryPersistence', ()=> {
    let persistence: ReviewsMemoryPersistence;
    let fixture: ReviewsPersistenceFixture;
    
    setup(async () => {
        persistence = new ReviewsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new ReviewsPersistenceFixture(persistence);
        
        await persistence.open(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

});