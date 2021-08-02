import {Dispatch} from 'redux';
import {
    CreateParamsType, GetPackParams,
    ResponsePackType,
    tableAPI
} from '../dal/api';
import {setErrorAC} from './app-reducer';
import {AppRootStateType} from './store';

const InitialState = {
    cardPacks: [
        {
            _id: null,
            user_id: null,
            name: "no Name",
            path: null,
            cardsCount: 25,
            grade: 0,
            shots: 0,
            rating: 0,
            type: "pack" as const,
            created: null,
            updated: null,
            __v: 0
        },
    ],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 6,
    token: '',
    tokenDeathTime: 0,
    sortPacks: '',
    packName: '',
    minParam: 0,
    maxParam: 103,
    user_id: undefined
}

type InitialStateType = typeof InitialState

export const tableReducer = (state: InitialStateType = InitialState, action: ActionsTableType): InitialStateType => {
    switch (action.type) {
        case 'SET_PACKS': {
            return {...action.data}
        }
        default:
            return state
    }
}

const setPacksListAC = (data: InitialStateType) => ({type: 'SET_PACKS', data} as const)

export type SetPacksListAT = ReturnType<typeof setPacksListAC>
export type ActionsTableType = SetPacksListAT

export const setPacksListTC = (params: GetPackParams = {}) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const tablesReducer = getState().table
        const cardsParamsModel: GetPackParams = {
            packName: tablesReducer.packName,
            min: tablesReducer.minParam,
            max: tablesReducer.maxParam,
            sortPacks: tablesReducer.sortPacks,
            page: tablesReducer.page,
            pageCount: tablesReducer.pageCount,
            user_id: tablesReducer.user_id,
            ...params
        }
        tableAPI.getCardsPack(cardsParamsModel).then(res => {
                dispatch(setPacksListAC(res.data))
            }
        )
    }

export const CreatNewPackListTC = (newPackData: CreateParamsType, getPackParams: GetPackParams) => (dispatch: Dispatch) => {
    tableAPI.createNewCardsPack(newPackData)
        .then(() =>
            tableAPI.getCardsPack(getPackParams).then(res => {
                    dispatch(setPacksListAC(res.data))
                }
            )
        )
}