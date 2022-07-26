import { RatingsFilePersistence } from '../../src/persistence/RatingsFilePersistence';
import { RatingsPersistenceFixture } from './RatingsPersistenceFixture';

suite('RatingsFilePersistence', ()=> {
    let persistence: RatingsFilePersistence;
    let fixture: RatingsPersistenceFixture;
    
    setup(async () => {
        persistence = new RatingsFilePersistence('./data/ratings.test.json');

        fixture = new RatingsPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
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