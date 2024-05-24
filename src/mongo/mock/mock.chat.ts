import * as faker from 'faker';
import { ObjectId } from 'mongodb';
import { Chat } from '../entity/chat';

export const generateMockChat = (members: Array<ObjectId>): Chat => ({
  _id: new ObjectId(),
  members,
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});
