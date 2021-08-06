import { CreateParamsType, GetPackParams, tableAPI } from "../dal/api"
import { AppRootStateType } from "./store"
import { Dispatch } from "redux"
import { setStatusAC } from "./app-reducer"

const InitialState = {
	cardPacks: [
		{
			_id: "",
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
			__v: 0,
		},
	],
	cardPacksTotalCount: 14,
	maxCardsCount: 4,
	minCardsCount: 0,
	page: 1 as number | undefined,
	pageCount: 6,
	token: "",
	tokenDeathTime: 0,
	sortPacks: "" as string | undefined,
	packName: "" as string | undefined,
	minParam: 0,
	maxParam: 103,
	user_id: undefined,
	// user_id: ''
}

export type InitialStateType = typeof InitialState

export const tableReducer = (
	state: InitialStateType = InitialState,
	action: ActionsTableType
): InitialStateType => {
	switch (action.type) {
		case "SET_PACKS": {
			return { ...action.data }
		}
		case "SET_PAGE": {
			return { ...state, page: action.page }
		}
		case "SET_PACKS_TOTAL_COUNT": {
			return { ...state, cardPacksTotalCount: action.count }
		}
		case "SET-PACK-NAME":
			return { ...state, packName: action.packName }
		case "SET-FILTERS":
			// debugger
			return { ...state, sortPacks: action.sortPacks }

		default:
			return state
	}
}

//action
const setPacksListAC = (data: InitialStateType) =>
	({ type: "SET_PACKS", data } as const)

//pagination action
export const setPageAC = (page: number | undefined) =>
	({ type: "SET_PAGE", page } as const)
export const setPacksTotalCountAC = (count: number) =>
	({ type: "SET_PACKS_TOTAL_COUNT", count } as const)
export const setSearch = (packName: string | undefined) =>
	({
		type: "SET-PACK-NAME",
		packName,
	} as const)
//filter action
export const setFiltersAC = (sortPacks: string | undefined) =>
	({
		type: "SET-FILTERS",
		sortPacks,
	} as const)

// type action
export type SetPacksListAT = ReturnType<typeof setPacksListAC>
export type SetPageACT = ReturnType<typeof setPageAC>
export type setPacksTotalCountACT = ReturnType<typeof setPacksTotalCountAC>
export type setSearchACT = ReturnType<typeof setSearch>
export type setFiltersACT = ReturnType<typeof setFiltersAC>

export type ActionsTableType =
	| SetPacksListAT
	| SetPageACT
	| setPacksTotalCountACT
	| setSearchACT
	| setFiltersACT

// thunk

export const setPacksListTC =
	(params: GetPackParams = {}) =>
	(dispatch: Dispatch, getState: () => AppRootStateType) => {
		
		dispatch(setPageAC(params.page))
		dispatch(setSearch(params.packName))

		const tablesReducer = getState().table
		const cardsParamsModel: GetPackParams = {
			packName: tablesReducer.packName,
			min: tablesReducer.minParam,
			max: tablesReducer.maxParam,
			sortPacks: tablesReducer.sortPacks,
			page: tablesReducer.page,
			pageCount: tablesReducer.pageCount,
			user_id: tablesReducer.user_id,
			...params,
		}


		dispatch(setPageAC(params.page))
		dispatch(setSearch(params.packName))
		dispatch(setFiltersAC(params.sortPacks))
	

		tableAPI.getCardsPack(cardsParamsModel).then((res) => {
			dispatch(setPacksListAC(res.data))
			dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount))
		})
	}

export const DeletePackListTC =
	(id: string, getPackParams: GetPackParams = {}) =>
	(dispatch: Dispatch) => {
		tableAPI.deleteCardsPack(id).then(() =>
			tableAPI.getCardsPack(getPackParams).then((res) => {
				dispatch(setPacksListAC(res.data))
			})
		)
	}

export const CreatNewPackListTC =
	(newPackData: CreateParamsType, getPackParams: GetPackParams) =>
	(dispatch: Dispatch) => {
		dispatch(setStatusAC(true))
		tableAPI.createNewCardsPack(newPackData).then(() =>
			tableAPI.getCardsPack(getPackParams).then((res) => {
				dispatch(setPacksListAC(res.data))
				dispatch(setStatusAC(false))
			})
		)
	}
