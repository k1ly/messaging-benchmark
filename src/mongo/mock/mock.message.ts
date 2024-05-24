import * as faker from 'faker';
import { ObjectId } from 'mongodb';
import { Message } from '../entity/message';

export const generateMockMessage = (chatId, senderId): Message => {
  const minMessageFileCount = Number(process.env.MOCK_MIN_MESSAGE_FILE_COUNT);
  const maxMessageFileCount = Number(process.env.MOCK_MAX_MESSAGE_FILE_COUNT);
  const minMessageMediaCount = Number(process.env.MOCK_MIN_MESSAGE_MEDIA_COUNT);
  const maxMessageMediaCount = Number(process.env.MOCK_MAX_MESSAGE_MEDIA_COUNT);
  const minMessageLinkCount = Number(process.env.MOCK_MIN_MESSAGE_LINK_COUNT);
  const maxMessageLinkCount = Number(process.env.MOCK_MAX_MESSAGE_LINK_COUNT);
  return {
    _id: new ObjectId(),
    chatId,
    senderId,
    body: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    files: Array.from(
      {
        length: faker.datatype.number({
          min: minMessageFileCount,
          max: maxMessageFileCount,
        }),
      },
      () => ({
        id: new ObjectId(),
        name: faker.system.fileName(),
        url: faker.internet.url(),
      }),
    ),
    media: Array.from(
      {
        length: faker.datatype.number({
          min: minMessageMediaCount,
          max: maxMessageMediaCount,
        }),
      },
      () => ({
        id: new ObjectId(),
        url: faker.image.imageUrl(),
      }),
    ),
    links: Array.from(
      {
        length: faker.datatype.number({
          min: minMessageLinkCount,
          max: maxMessageLinkCount,
        }),
      },
      () => ({
        id: new ObjectId(),
        url: faker.internet.url(),
      }),
    ),
    reply: null,
    canSee: [],
    deletedFor: [],
    readFor: [],
  };
};
