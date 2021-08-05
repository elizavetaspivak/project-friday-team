import {Dispatch} from 'redux';
import {cardsAPI, CardType, CreateCardParamsType, GetCardsParams} from '../dal/api';
import {setStatusAC} from './app-reducer';

//types
type initialStateType = typeof initialState
export type GetCardsActionType = ReturnType<typeof getCardsAC>
export type CreateCardActionType = ReturnType<typeof addCardAC>
export type ActionsCardsType = GetCardsActionType | CreateCardActionType


const initialState = {
    cards: [
        {
            answer: 'no answer',
            question: 'no question',
            cardsPack_id: '',
            grade: 4.987525071790364,
            rating: 0,
            shots: 1,
            type: 'card',
            user_id: '',
            created: '',
            updated: '',
            __v: 0,
            _id: ''
        },
    ],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 9,
    packUserId: ''
}


//reducer
export const cardsReducer = (state: initialStateType = initialState, action: ActionsCardsType): initialStateType => {
    switch (action.type) {
        case 'GET_CARDS': {
            return {...action.cards}
        }
        case 'CREATE_NEW_CARD': {
            let newState = state
            newState.cards.push(action.card)
            return {...newState}
        }
    }
    return state
}

//actions
const getCardsAC = (cards: initialStateType) => ({type: 'GET_CARDS', cards} as const)
const addCardAC = (card: CardType) => ({type: 'CREATE_NEW_CARD', card} as const)


//thunks
export const getCardsTC = (getParams: GetCardsParams) => (dispatch: Dispatch) => {
    dispatch(setStatusAC(true));
    cardsAPI.getCardsCard(getParams).then(res => {
            dispatch(getCardsAC(res.data))
        dispatch(setStatusAC(false));
        }
    )
}

export const createCardTC = (createData: CreateCardParamsType, getParams: GetCardsParams) => (dispatch: Dispatch) => {
    dispatch(setStatusAC(true));
    cardsAPI.createNewCardsCard(createData).then(res => {
            dispatch(addCardAC(res.data))
        dispatch(setStatusAC(false));
        }
    ).then(() =>
        cardsAPI.getCardsCard(getParams).then(res => {
                dispatch(getCardsAC(res.data))
            }
        )
    )
}

export const removeCardTC = (id: string, cardsPack_id: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC(true));
    cardsAPI.deleteCardsCard(id).then(() =>
        cardsAPI.getCardsCard({cardsPack_id}).then(res => {
                dispatch(getCardsAC(res.data))
            dispatch(setStatusAC(false));
            }
        )
    )
}
