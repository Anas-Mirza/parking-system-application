import { IUser } from 'app/shared/model/user.model';

export interface IWallet {
  id?: number;
  money?: number;
  user?: IUser;
}

export const defaultValue: Readonly<IWallet> = {};
