import axios from "axios";

const instance = axios.create({
  baseURL: "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});
export const loginApi = {
   login(data: LoginType) {
     return instance.post<ResponseLoginType>(`auth/login`, data);
   },
   logout() {
     return instance.delete<DeleteLoginResponseType>(`auth/me`);
   },
 };

 export type LoginType = {
   email: string;
   password: string;
   rememberMe: boolean;
 }

 export type ResponseLoginType = {
   _id: string;	
   email: string;	
   name: string;	
   avatar?: string;	
   publicCardPacksCount: number; // количество колод	 
   created: Date; 	
   updated: Date;	
   isAdmin: boolean;	
   verified: boolean; // подтвердил ли почту	
   rememberMe: boolean;	
   error?: string;	
 };
 export type DeleteLoginResponseType = {
  info: string
  error: string;	
 };