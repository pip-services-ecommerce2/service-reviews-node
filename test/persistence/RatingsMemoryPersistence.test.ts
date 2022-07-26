import { ConfigParams } from 'pip-services3-commons-nodex';

import { RatingsMemoryPersistence } from '../../src/persistence/RatingsMemoryPersistence';
import { RatingsPersistenceFixture } from './RatingsPersistenceFixture';

suite('RatingsMemoryPersistence', ()=> {
    let persistence: RatingsMemoryPersistence;
    let fixture: RatingsPersistenceFixture;
    
    setup(async () => {
        persistence = new RatingsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new RatingsPersistenceFixture(persistence);
        
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