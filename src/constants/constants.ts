export const API_URL = "http://localhost:8000";
export interface userInfoType {
  userDetails: {
    first_name: string;
    last_name: string;
    verified: boolean;
    _id: string;
    jwtToken?: string;
  };
  message: string;
}
