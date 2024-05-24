import { ObjectId } from 'mongodb';

export interface Chat {
  _id: ObjectId;
  members: Array<ObjectId>;
  createdAt: Date;
  updatedAt: Date;
}
