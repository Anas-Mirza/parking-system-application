import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { ILot } from 'app/shared/model/lot.model';

export interface IBooking {
  id?: number;
  vehicleno?: string;
  entrytime?: string;
  exittime?: string;
  user?: IUser;
  lot?: ILot;
}

export const defaultValue: Readonly<IBooking> = {};
