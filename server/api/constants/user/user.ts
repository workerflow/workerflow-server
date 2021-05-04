export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: {
    verify: boolean;
    data: string;
  }
}
