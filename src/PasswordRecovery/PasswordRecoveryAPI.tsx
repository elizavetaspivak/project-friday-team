import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export type RestoreResponseType = {
    info: string
    error: string
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