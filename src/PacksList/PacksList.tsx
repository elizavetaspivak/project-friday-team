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
import { Redirect, useHistory } from "react-router-dom"
import s from "./PacksList.module.css"
import { Paginator } from "../common/Pagination/Pagination"
import SuperInputText from "../Test/h4/common/c1-SuperInputText/SuperInputText"
import moment from 'moment';
import SuperDoubleRange from '../Test/h11/common/c8-SuperDoubleRange/SuperDoubleRange';
import { SortElement } from "../components/SortElement/SortElement"

export function PacksList() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [filter, setFilter] = useState("all")
    console.log(filter)
    useEffect(() => {
        dispatch(setPacksListTC())
    }, [])

    const isLoginIn = useSelector<AppRootStateType, boolean>(
        (state) => state.login.isLoggedIn
    )

    const profile = useSelector<AppRootStateType, any>(
        (state) => state.login.user
    )


    let { cardPacks, sortPacks } = useSelector<AppRootStateType,any>(
        (state: AppRootStateType) => state.table
    )

    // pagination
    const pageCount = useSelector<AppRootStateType, number>(
        (state) => state.table.pageCount
    )
    const cardsTotalCount = useSelector<AppRootStateType, number>(
        (state) => state.table.cardPacksTotalCount
    )
    const page = useSelector<AppRootStateType, number | undefined>(
        (state) => state.table.page
    )
    const onPageChanged = useCallback(
        (page: number) => {
            if (filter === "my") {
                profile._id &&
                dispatch(setPacksListTC({ user_id: profile._id, page: page }))
            } else {

                dispatch(
                    setPacksListTC({
                        page,
                        pageCount,
                        packName: inputValue,
                        min: value1,
                        max: value2,
                        sortPacks:sortTitle
                    })
                )
            } //что бы менялась страница по клику при запросе на сервер
        },
        [page]
    )

    //search
    const [inputValue, setInputValue] = useState<string>("")
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setInputValue(e.currentTarget.value)

    const onSearch = () => dispatch(setPacksListTC({ packName: inputValue }))

    const CreateNewPackList = () => {
        dispatch(
            CreatNewPackListTC(
                { cardsPack: { name: "fhjdskhjf", path: profile.name } },
                {}
            )
        )
    }

    const onClickSetMyFilter = () => {
        setFilter("my")
        profile._id && dispatch(setPacksListTC({ user_id: profile._id }))
    }

    const onClickSetAllFilter = () => {
        setFilter("all")
        dispatch(setPacksListTC())
    }

    const [sortTitle, setSortTitle]=useState(sortPacks)

    const Sort1 = () => {
        if(filter === 'my'){
            setSortTitle('1updated')
            profile._id && dispatch(setPacksListTC({user_id: profile._id,sortPacks: sortTitle}))
        } else {
            setSortTitle('1updated')
            profile._id && dispatch(setPacksListTC({sortPacks: sortTitle}))
        }
    }
    const Sort2 = () => {
        if(filter === 'my'){
            setSortTitle('0updated')
            profile._id && dispatch(setPacksListTC({user_id: profile._id,sortPacks: sortTitle}))
        } else {
            setSortTitle('0updated')
            profile._id && dispatch(setPacksListTC({sortPacks: sortTitle}))
        }
    }

    const maxCardsCount = useSelector<AppRootStateType, number>(
        (state) => state.table.cardPacksTotalCount
    )

    const minCardsCount = useSelector<AppRootStateType, number>(
        (state) => state.table.minCardsCount
    )

    const [value1, setValue1] = useState<number>(minCardsCount)
    const [value2, setValue2] = useState<number>(maxCardsCount)

    if (!isLoginIn) {
        return <Redirect to={"/login"} />
    }

    return (
        <div className={s.packList}>
            <div className={s.packContainer}>
                <div className={s.mainPacks}>
                    <p>Show packs cards</p>
                    <div>
                        <Button onClick={onClickSetMyFilter}>My</Button>
                        <Button onClick={onClickSetAllFilter}>All</Button>
                    </div>
                    <div className={s.numberOfCards}>
                        <p>Number of cards</p>
                        <SuperDoubleRange
                            value1={value1}
                            setValue1={setValue1}
                            setValue2={setValue2}
                            value2={value2}
                        />
                    </div>
                </div>

                <div className={s.packTable}>
                    <h2>Packs list</h2>
                    <div className={s.searchBlock}>
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
                        <Button
                            onClick={CreateNewPackList}
                            variant='contained'
                            color='primary'
                            className={s.addNewPack}
                        >
                            Add new pack
                        </Button>
                    </div>
                    <div className={s.table}>
                        <TableContainer component={Paper} className={s.tableContainer}>
                            <Table aria-label='simple table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align='center'>Cards</TableCell>
                                        <TableCell align='center'>
                                            Last updated <Button onClick={Sort1}>ᐁ</Button>
                                            <Button onClick={Sort2}>/\</Button>
                                        </TableCell>
                                        <TableCell align='center'>Created by</TableCell>
                                        <TableCell align='center'> Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cardPacks.map((row: any) => {
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
                                                <TableCell align='center'>
                                                    {moment(row.updated).format("DD.MM.YYYY")}
                                                </TableCell>
                                                <TableCell align='center'>{row.path}</TableCell>
                                                <TableCell align='center'>
                                                    {row.user_id == profile._id ? <div>
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
                                                            </Button></div>
                                                        :
                                                            <Button
                                                                onClick={getCards}
                                                                variant='contained'
                                                                color='primary'
                                                            >
                                                                Learn
                                                            </Button>}
                                                        </TableCell>
                                                        </TableRow>
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>
                                    </TableContainer>
                                    </div>

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