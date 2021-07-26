import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export type CreateUserType = {
    email: string
    password: string
}

export const AuthAPI = {
    createUser(email: string, password: string) {
        return instance.post<CreateUserType>('/auth/register', {email, password});
    }
}