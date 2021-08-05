import {useDispatch, useSelector} from 'react-redux'
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {AppRootStateType} from '../state/store'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import {
    CreatNewPackListTC,
    DeletePackListTC,
    setPacksListTC
} from '../state/table-reducer'
import {Redirect, useHistory} from 'react-router-dom'
import s from './PacksList.module.css'
import {Paginator} from '../common/Pagination/Pagination'
import SuperInputText from '../Test/h4/common/c1-SuperInputText/SuperInputText'
import moment from 'moment';
import SuperDoubleRange from '../Test/h11/common/c8-SuperDoubleRange/SuperDoubleRange';

export function PacksList() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [filter, setFilter] = useState('all')


    useEffect(() => {
        dispatch(setPacksListTC())
    }, [])

    const {isLoginIn, user} = useSelector<AppRootStateType, any>(
        (state) => state.login
    )

    let {
        cardPacks,
        sortPacks,
        pageCount,
        cardPacksTotalCount,
        page,
        minCardsCount
    } = useSelector<AppRootStateType, any>(
        (state: AppRootStateType) => state.table
    )

    const [sortTitle, setSortTitle] = useState(sortPacks)
   
    useEffect(() => {
        dispatch(setPacksListTC())
    }, [])

    const onPageChanged = useCallback(
        (page: number) => {
            if (filter === 'my') {
                user.profile._id &&
                dispatch(setPacksListTC({
                    user_id: user.profile._id,
                    page,
                    pageCount,
                    packName: inputValue,
                    sortPacks: sortTitle
                }))
            } else {
                dispatch(
                    setPacksListTC({
                        page,
                        pageCount,
                        packName: inputValue,
                        min: value1,
                        max: value2,
                        sortPacks: sortTitle
                    })
                )
            }
        },
        [page]
    )

    const CreateNewPackList = () => {
        dispatch(
            CreatNewPackListTC(
                {cardsPack: {name: 'fhjdskhjf', path: user.profile.name}},
                {}
            )
        )
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setInputValue(e.currentTarget.value)

    const onSearch = () => dispatch(setPacksListTC({packName: inputValue}))


    const onClickSetMyFilter = () => {
        setFilter('my')
        user.profile._id && dispatch(setPacksListTC({user_id: user.profile._id}))
    }

    const onClickSetAllFilter = () => {
        setFilter('all')
        dispatch(setPacksListTC())
    }

    const [sortTitle, setSortTitle] = useState(sortPacks)


    const Sort1 = () => {
        setSortTitle('1updated')
        if (filter === 'my') {
            sortTitle && user.profile._id && dispatch(setPacksListTC(
                {user_id: user.profile._id, sortPacks: sortTitle}))
        } else {
            sortTitle && dispatch(setPacksListTC({sortPacks: sortTitle}))
        }
    }
    const Sort2 = () => {
        setSortTitle('0updated')
        if (filter === 'my') {
            sortTitle && user.profile._id && dispatch(setPacksListTC(
                {user_id: user.profile._id, sortPacks: sortTitle}))
        } else {
            sortTitle && dispatch(setPacksListTC({sortPacks: sortTitle}))
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
        return <Redirect to={'/login'}/>
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
        >
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
                                placeholder={'Search...'}
                                onChange={inputHandler}
                            />
                            <Button variant="contained" color="primary" onClick={onSearch}>
                                search
                            </Button>
                        </div>
                        <Button
                            onClick={CreateNewPackList}
                            variant="contained"
                            color="primary"
                            className={s.addNewPack}
                        >
                            Add new pack
                        </Button>
                    </div>
                    <div className={s.table}>
                        <TableContainer component={Paper} className={s.tableContainer}>
                            <Table aria-label="simple table" className={s.tableContainer}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="center">Cards</TableCell>
                                        <TableCell align="center">
                                            Last updated <Button onClick={Sort1}>ᐁ</Button>
                                            <Button onClick={Sort2}>ᐃ</Button>
                                        </TableCell>
                                        <TableCell align="center">Created by</TableCell>
                                        <TableCell align="center"> Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cardPacks.map((row: any) => {
                                        const getCards = () => {
                                            history.push(`/cards/${row._id}`)
                                        }
                                        const removePack = () => {
                                            dispatch(
                                                DeletePackListTC(row._id, {user_id: user.profile._id})
                                            )
                                        }
                                        return (
                                            <TableRow key={row._id}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}{' '}
                                                </TableCell>
                                                <TableCell align="center">{row.cardsCount}</TableCell>
                                                <TableCell align="center">
                                                    {moment(row.updated).format('DD.MM.YYYY')}
                                                </TableCell>
                                                <TableCell align="center">{row.path}</TableCell>
                                                <TableCell align="center">
                                                    {row.user_id == user.profile._id ? <div>
                                                            <Button
                                                                onClick={removePack}
                                                                variant="contained"
                                                                color="secondary"
                                                            >
                                                                Delete
                                                            </Button>
                                                            <Button variant="contained" color="primary">
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                onClick={getCards}
                                                                variant="contained"
                                                                color="primary"
                                                            >
                                                                Learn
                                                            </Button>
                                                        </div>
                                                        :
                                                        <Button
                                                            onClick={getCards}
                                                            variant="contained"
                                                            color="primary"
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
                        totalItemsCount={cardPacksTotalCount}
                    />
                </div>
            </div>
        </div>
    )
}
