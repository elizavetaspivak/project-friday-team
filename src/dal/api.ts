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
        // если такая запись, то будет ошибка в URL, будет дважды повторяться: page=40&pageCount=6page=40&pageCount=6
        // return instance.get(`cards/pack?page=${getPackParams.page}&pageCount=${getPackParams.pageCount}`, {params: {...getPackParams}
        }).then(res => {
            // debugger
            return res
        })
    },
    createNewCardsPack(createData: CreateParamsType){
        return instance.post(`cards/pack`, {...createData})
    },
    deleteCardsPack(id: string){
        return instance.delete(`cards/pack`, {params: {id}})
    }
}

export type CreateCardParamsType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        rating?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
        type?: string
    }
}

export type GetCardsParams = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: number
    page?: number
    pageCount?: number
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

export const cardsAPI = {
    getCardsCard(getParams: GetCardsParams){
        return instance.get(`cards/card`, {params: {...getParams}})
    },
    createNewCardsCard(createData: CreateCardParamsType){
        return instance.post(`cards/card`, {...createData})
    },
    deleteCardsCard(id: string){
        return instance.delete(`cards/card`, {params : {id}})
    }
}
