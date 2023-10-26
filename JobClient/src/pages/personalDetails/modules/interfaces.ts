export interface PersonalDetailsFormValues {
  FirstName: string;
  LastName: string;
  Id: string;
  Email: string;
  Pelephone: string;
  StreetId: string;
  StreetName: string;
  BornDate: Date | undefined;
  Sector: string;
  CountrySource: String;
  MaritalStatus: String;
  Gender: String;
  IsPublic: boolean;
  CityId: string;
  CityName: string;
}

export interface Params {
  userName: string;
  password: string;
  email: string;
  firstName:string;
  lastName:string;
}

export interface Props{
  values?: Params
}
