import {Dispatch} from 'redux';
import {
    CreateParamsType, GetPackParams,
    tableAPI
} from '../dal/api';
import {AppRootStateType} from './store';
import {setStatusAC} from './app-reducer';

const InitialState = {
    cardPacks: [
        {
            _id: '',
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
    // user_id: ''
}

export type InitialStateType = typeof InitialState

export const tableReducer = (state: InitialStateType = InitialState, action: ActionsTableType): InitialStateType => {
    switch (action.type) {
        case 'SET_PACKS': {
            return {...action.data}
        }
        case 'SET_PAGE': {
            return {...state, page:action.page}
        }
        case 'SET_PACKS_TOTAL_COUNT': {
            // debugger
            return {...state, cardPacksTotalCount:action.count}
        }
        // case 'SET-PACK-NAME':
        //     return {...state, packName: action.packName}
            
        default:
            return state
    }
}

//action
const setPacksListAC = (data: InitialStateType) => ({type: 'SET_PACKS', data} as const)
//pagination
export const setPageAC = (page:number) => ({type: 'SET_PAGE', page} as const)
export const setPacksTotalCountAC = (count:number) => ({type: 'SET_PACKS_TOTAL_COUNT', count} as const)
// export const setFilter = (packName: string) => ({
//     type: 'SET-PACK-NAME', packName
// } as const)

// type action
export type SetPacksListAT = ReturnType<typeof setPacksListAC>
export type SetPageACT = ReturnType<typeof setPageAC>
export type setPacksTotalCountACT = ReturnType<typeof setPacksTotalCountAC>
// export type setFilterACT=ReturnType<typeof setFilter>

export type ActionsTableType = SetPacksListAT |SetPageACT | setPacksTotalCountACT 
// |setFilterACT



// thunk

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
        // debugger
        // dispatch(setPageAC(params.page))
        // dispatch(setFilter(params.packName))
        dispatch(setStatusAC(true));
        tableAPI.getCardsPack(cardsParamsModel).then(res => {
                dispatch(setPacksListAC(res.data))
                dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount));
            dispatch(setStatusAC(false));
            }
        )
    }

export const CreatNewPackListTC = (newPackData: CreateParamsType, getPackParams: GetPackParams) => (dispatch: Dispatch) => {
    dispatch(setStatusAC(true));
    tableAPI.createNewCardsPack(newPackData)
        .then(() =>
            tableAPI.getCardsPack(getPackParams).then(res => {
                    dispatch(setPacksListAC(res.data))
                dispatch(setStatusAC(false));
                }
            )
        )
}

export const DeletePackListTC = (id: string, getPackParams: GetPackParams = {}) => (dispatch: Dispatch) => {
    dispatch(setStatusAC(true));
    tableAPI.deleteCardsPack(id)
        .then(() =>
            tableAPI.getCardsPack(getPackParams).then(res => {
                    dispatch(setPacksListAC(res.data))
                dispatch(setStatusAC(false));
                }
            )
        )
}