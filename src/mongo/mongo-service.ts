import { Collection, Db, MongoClient } from 'mongodb';
import { Chat } from './entity/chat';
import { Message } from './entity/message';
import { User } from './entity/user';

export class MongoService {
  private client: MongoClient;
  private db: Db;
  usersCollection: Collection<User>;
  chatsCollection: Collection<Chat>;
  messagesCollection: Collection<Message>;

  constructor() {
    this.client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
  }

  private setCollections = async () => {
    this.usersCollection = this.db.collection(process.env.USERS_COLLECTION);
    this.chatsCollection = this.db.collection(process.env.CHATS_COLLECTION);
    this.messagesCollection = this.db.collection(
      process.env.MESSAGES_COLLECTION,
    );
    await this.messagesCollection.createIndex(
      { body: 'text' },
      { background: false },
    );
  };

  initialize = async () => {
    try {
      await this.client.connect();
      this.db = this.client.db(process.env.DATABASE_NAME);

      this.setCollections();
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
  };

  clear = async () => {
    await this.usersCollection.drop();
    await this.chatsCollection.drop();
    await this.messagesCollection.drop();

    this.setCollections();
  };

  searchMessagesByText = async (text: string) => {
    return await this.messagesCollection
      .find({
        $text: { $search: text },
      })
      .toArray();
  };
}
