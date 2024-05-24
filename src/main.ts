import { config } from 'dotenv';
import * as faker from 'faker';
import { generateMockChat } from './mongo/mock/mock.chat';
import { generateMockMessage } from './mongo/mock/mock.message';
import { generateMockUser } from './mongo/mock/mock.user';
import { MongoService } from './mongo/mongo-service';

config();

async function fillDatabase() {
  const mongoService = new MongoService();
  await mongoService.initialize();
  await mongoService.clear();

  const usersCount = Number(process.env.MOCK_USER_COUNT);
  const userChatCount = Number(process.env.MOCK_USER_CHAT_COUNT);
  const minChatMemberCount = Number(process.env.MOCK_MIN_CHAT_MEMBER_COUNT);
  const maxChatMemberCount = Number(process.env.MOCK_MAX_CHAT_MEMBER_COUNT);
  const minMessageCount = Number(process.env.MOCK_MIN_MESSAGE_COUNT);
  const maxMessageCount = Number(process.env.MOCK_MAX_MESSAGE_COUNT);

  const users = Array.from({ length: usersCount }, () => generateMockUser());

  mongoService.usersCollection.insertMany(users);

  users.forEach((user, i) => {
    const chatMemberCount = faker.datatype.number({
      min: minChatMemberCount,
      max: maxChatMemberCount,
    });

    const chatMemberIds = Array.from(
      { length: chatMemberCount },
      () => users[faker.datatype.number({ min: 0, max: users.length - 1 })]._id,
    );

    const userChats = Array.from({ length: userChatCount }, () =>
      generateMockChat(chatMemberIds),
    );
    mongoService.chatsCollection.insertMany(userChats);

    userChats.forEach((chat, j) => {
      console.log('user:', i, 'chat:', j);

      const messageCount = faker.datatype.number({
        min: minMessageCount,
        max: maxMessageCount,
      });

      const messages = Array.from({ length: messageCount }, () =>
        generateMockMessage(
          chat._id,
          chatMemberIds[
            faker.datatype.number({ min: 0, max: chatMemberIds.length - 1 })
          ],
        ),
      );

      mongoService.messagesCollection.insertMany(messages);
    });
  });
}

fillDatabase();
