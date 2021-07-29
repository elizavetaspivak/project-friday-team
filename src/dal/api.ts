import axios from "axios";

export type LoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

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
  info: string;
  error: string;
};

const instance = axios.create({
  baseURL: "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

export type CreateUserType = {
  email: string;
  password: string;
};

export type RestoreResponseType = {
    info: string
    error: string
}

export const AuthAPI = {
  createUser(email: string, password: string) {
    return instance.post<CreateUserType>("/auth/register", { email, password });
  },
  login(data: LoginType) {
    return instance.post<ResponseLoginType>(`auth/login`, data);
  },
  logout() {
    return instance.delete<DeleteLoginResponseType>(`auth/me`);
  },
  me() {
    return instance.post<ResponseLoginType>(`auth/me`, {});
  
  },
  createUser(email: string, password: string) {
    return instance.post<CreateUserType>('/auth/register', {email, password});
  }
}

export const RestoreAPI = {
    restore(email: string) {
        return instance.post<RestoreResponseType>('auth/forgot',
            {
                email,
                message: "password recovery link: <a href='http://localhost:3000/project-friday-team#/newpassword/$token$'>link</a>"
            },);
    },
    create(password: string, token: any) {
        return instance.post<RestoreResponseType>('auth/set-new-password', {password, resetPasswordToken: token})
    }
}
