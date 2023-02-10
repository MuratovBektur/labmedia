export interface IUser {
  id: string;
  username: string;
  email: string;
  registrationDateString: string;
  registrationDate: Date;
  rating: number;
}
export interface IUserFetched {
  id: string;
  username: string;
  email: string;
  registration_date: string;
  rating: number;
}
export type TUserSortType = "rating" | "registrationDate";
export type TUserSortOrder = "asc" | "desc";
export type TUserSort = {
  type: TUserSortType;
  order: TUserSortOrder;
} | null;
