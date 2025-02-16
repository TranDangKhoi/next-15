export interface IAccount {
  id: number;
  name: string;
  email: string;
}

export interface IRegisterResponse {
  data: {
    token: string;
    account: IAccount;
  };
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ILoginResponse extends IRegisterResponse {}

export interface IMessageResponse {
  message: string;
}
