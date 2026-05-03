export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserDocument extends IUser {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}