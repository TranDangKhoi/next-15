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

export interface ILoginResponse extends IRegisterResponse {}

export interface IMessageResponse {
  message: string;
}
