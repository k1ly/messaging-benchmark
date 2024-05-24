import { config } from 'dotenv';
import * as faker from 'faker';
import { MongoService } from './mongo-service';

config();

describe('MongoService', () => {
  let mongoService: MongoService;

  beforeAll(async () => {
    mongoService = new MongoService();
    await mongoService.initialize();
  });

  const thresholdTimeMs = Number(process.env.SEARCH_TEST_THRESHOLD_TIME_MS);
  jest.setTimeout(thresholdTimeMs);

  it('should measure time taken for full-text message search', async () => {
    const iterations = Number(process.env.SEARCH_TEST_ITERATIONS);
    const minWordCount = Number(process.env.SEARCH_TEST_MIN_WORD_COUNT);
    const maxWordCount = Number(process.env.SEARCH_TEST_MAX_WORD_COUNT);

    let totalTime = 0;
    for (let i = 0; i < iterations; i++) {
      const startTime = Date.now();

      const text = faker.lorem.words(
        faker.datatype.number({
          min: minWordCount,
          max: maxWordCount,
        }),
      );
      await mongoService.searchMessagesByText(text);

      const endTime = Date.now();

      const executionTime = endTime - startTime;
      console.log(`Iteration ${i + 1}: ${executionTime} ms`);

      totalTime += executionTime;
    }

    const averageTime = totalTime / iterations;
    console.log(`Average time taken for search: ${averageTime} ms`);

    expect(averageTime).toBeLessThanOrEqual(thresholdTimeMs);
  });
});
