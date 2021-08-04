import { useDispatch, useSelector } from "react-redux"
import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { AppRootStateType } from "../state/store"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Button from "@material-ui/core/Button"
import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core"
import TableCell from "@material-ui/core/TableCell"
import {
	CreatNewPackListTC,
	DeletePackListTC,
	setPacksListTC,
	setPageAC,

} from "../state/table-reducer"
import { useHistory } from "react-router-dom"
import s from "./PacksList.module.css"
import { Paginator } from "../common/Pagination/Pagination"
import SuperInputText from "../Test/h4/common/c1-SuperInputText/SuperInputText"


export function PacksList() {
	const dispatch = useDispatch()
	const history = useHistory()

	const profile = useSelector<AppRootStateType, any>(
		(state) => state.login.user
	)

	const { cardPacks, minCardsCount } = useSelector(
		(state: AppRootStateType) => state.table
	)

	//! pagination
	const pageCount = useSelector<AppRootStateType, number>(
		(state) => state.table.pageCount
	)
	const cardsTotalCount = useSelector<AppRootStateType, number>(
		(state) => state.table.cardPacksTotalCount
	)
	const page = useSelector<AppRootStateType, number>(
		(state) => state.table.page
	)
	const onPageChanged = useCallback(
		(page: number) => {
            // debugger
			dispatch(setPageAC(page)) //что бы менялась страница по клику // походу ее надо засунуть в thunk перед api
			dispatch(setPacksListTC({ page })) //что бы менялась страница по клику при запросе на сервер
		},
		[page]
	)
	//!

	//search
	const [inputValue, setInputValue] = useState<string>("")
	const inputHandler = (e: ChangeEvent<HTMLInputElement>) =>
		setInputValue(e.currentTarget.value)

	const onSearch = () =>
		dispatch(setPacksListTC({ page, pageCount, packName: inputValue }))



	useEffect(() => {
		dispatch(setPacksListTC())
	}, [])

	const CreateNewPackList = () => {
		dispatch(
			CreatNewPackListTC(
				{ cardsPack: { name: "fhjdskhjf", path: profile.name } },
				{ user_id: profile._id }
			)
		)
	}

	const useStyles = makeStyles({
		table: {
			minWidth: 550,
		},
	})
	const classes = useStyles()

	return (
		<div
			className={s.packList}
			style={{
				margin: "0 0px",
				display: "flex",
				flexFlow: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div className={s.packContainer}>
				<div className={s.mainPacks}>
					<p>Show packs cards</p>
					<div>
						<Button>My</Button>
						<Button>All</Button>
					</div>
					<div>
						<p>Number of cards</p>
					</div>
				</div>

				<div className={s.packTable}>
					<Button
						onClick={CreateNewPackList}
						variant='contained'
						color='primary'
					>
						Add new pack
					</Button>
					<div className={s.search}>
						<SuperInputText
							className={s.searchBoxInput}
							placeholder={"Search..."}
							onChange={inputHandler}
						/>
						<Button variant='contained' color='primary' onClick={onSearch}>
							search
						</Button>
					</div>

					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell align='center'>Cards</TableCell>
									<TableCell align='center'>Last updated</TableCell>
									<TableCell align='center'>Created by</TableCell>
									<TableCell align='center'> Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{cardPacks.map((row) => {
									const getCards = () => {
										history.push(`/cards/${row._id}`)
									}
									const removePack = () => {
										dispatch(
											DeletePackListTC(row._id, { user_id: profile._id })
										)
									}
									return (
										<TableRow key={row._id}>
											<TableCell component='th' scope='row'>
												{row.name}{" "}
											</TableCell>
											<TableCell align='center'>{row.cardsCount}</TableCell>
											<TableCell align='center'>{row.updated}</TableCell>
											<TableCell align='center'>{row.path}</TableCell>
											<TableCell align='center'>
												{row.user_id == profile._id ? (
													<div>
														<Button
															onClick={removePack}
															variant='contained'
															color='secondary'
														>
															Delete
														</Button>
														<Button variant='contained' color='primary'>
															Edit
														</Button>
														<Button
															onClick={getCards}
															variant='contained'
															color='primary'
														>
															Learn
														</Button>
													</div>
												) : (
													<Button
														onClick={getCards}
														variant='contained'
														color='primary'
													>
														Learn
													</Button>
												)}
											</TableCell>
										</TableRow>
									)
								})}
							</TableBody>
						</Table>
					</TableContainer>
					<Paginator
						page={page}
						onPageChanged={onPageChanged}
						pageCount={pageCount}
						totalItemsCount={cardsTotalCount}
					/>
					
				</div>
			</div>
		</div>
	)
}
