import { ObjectId } from 'mongodb';

export interface Message {
  _id: ObjectId;
  chatId: ObjectId;
  senderId: ObjectId;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  files: Array<{ id: ObjectId; name: string; url: string }>;
  media: Array<{ id: ObjectId; url: string }>;
  links: Array<{ id: ObjectId; url: string }>;
  reply: Message | null;
  canSee: Array<ObjectId>;
  deletedFor: Array<ObjectId>;
  readFor: Array<ObjectId>;
}
