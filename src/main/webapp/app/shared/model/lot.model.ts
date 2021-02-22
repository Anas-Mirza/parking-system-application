export interface ILot {
  id?: number;
  name?: string;
  address?: string;
  zipcode?: string;
  maxslots?: number;
  availableslots?: number;
  isopen?: boolean;
}

export const defaultValue: Readonly<ILot> = {
  isopen: false,
};
