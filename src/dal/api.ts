import axios from 'axios';

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
    baseURL: 'http://localhost:7542/2.0/',
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

export type ResponsePackType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    _v: number
}

export type CreateParamsType = {
    cardsPack: {
        name?: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private?: boolean
        type?: string
    }
}

export type GetPackParams = {
    packName?:string
    min?:number
    max?:number
    sortPacks?:string
    page?:number
    pageCount?:number
    user_id?:string
}

export const AuthAPI = {
    createUser(email: string, password: string) {
        return instance.post<CreateUserType>('/auth/register', {email, password});
    },
    login(data: LoginType) {
        return instance.post<ResponseLoginType>(`auth/login`, data);
    },
    logout() {
        return instance.delete<DeleteLoginResponseType>(`auth/me`, {});
    },
    me() {
        debugger
        return instance.post<ResponseLoginType>(`auth/me`, {});

    }
}

export const RestoreAPI = {
    restore(email: string) {
        return instance.post<RestoreResponseType>('auth/forgot',
            {
                email,
                message: 'password recovery link: <a href=\'https://elizavetaspivak.github.io/project-friday-team#/newpassword/$token$\'>link</a>'
            },);
    },
    create(password: string, token: any) {
        return instance.post<RestoreResponseType>('auth/set-new-password', {password, resetPasswordToken: token})
    }
}

export const tableAPI = {
    getCardsPack(getPackParams: GetPackParams) {
        return instance.get(`cards/pack`, {params: {...getPackParams}
        }).then(res => {
            return res
        })
    },
    createNewCardsPack(createData: CreateParamsType){
        return instance.post(`cards/pack`, {...createData})
    }
}
