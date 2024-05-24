import * as faker from 'faker';
import { ObjectId } from 'mongodb';
import { User } from '../entity/user';

export const generateMockUser = (): User => ({
  _id: new ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});
