export interface IParcel {
  id: number;
  parcel: string;
  surface: number;
  culture: string;
  owner: string;
  history: {
    culture: string;
    date: string;
    duration: number;
    planned: number;
    result: number;
  }[];
}
export interface IUser {
  email: string;
  password: string;
  messagesSent: {
    parcel: string;
    to: string;
    content: string;
  }[];
}
