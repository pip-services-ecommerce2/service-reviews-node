import { ReviewsFilePersistence } from '../../src/persistence/ReviewsFilePersistence';
import { ReviewsPersistenceFixture } from './ReviewsPersistenceFixture';

suite('ReviewsFilePersistence', ()=> {
    let persistence: ReviewsFilePersistence;
    let fixture: ReviewsPersistenceFixture;
    
    setup(async () => {
        persistence = new ReviewsFilePersistence('./data/reviews.test.json');

        fixture = new ReviewsPersistenceFixture(persistence);

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