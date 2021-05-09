export interface IUser {
  _id?: string;
  username: string;
  password: string;
  email: {
    verify: boolean;
    data: string;
  }
}

export interface IUserJWT {
  username: string;
  email: string;
  iat?: number;
  exp: number;
}

export interface IUserRequest {
  username: string;
  password: string;
  email: string;
}
