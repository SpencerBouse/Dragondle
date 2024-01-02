import { ObjectId } from 'mongodb';

type Hint = {
  level: string;
  hint: string;
}
export type Character = {
  _id: String;
  name: string;
  image: string;
  hints: [Hint];
} 