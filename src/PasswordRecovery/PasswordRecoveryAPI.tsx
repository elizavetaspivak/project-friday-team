import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export type RestoreResponseType = {
   email:string
}

export const RestoreAPI = {
    restore(email: string) {
        return instance.post<RestoreResponseType>('auth/forgot',
            {
                email,
                message: "password recovery link:<a href='http://localhost:3000/project-friday-team#/newPassword/$token$'>"
            },);
    }
}