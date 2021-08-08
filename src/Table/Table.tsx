import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Paper, TableBody, TableContainer, TableHead, TableRow, Table} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import {DeletePackListTC, setPacksListTC, UpdatePackTC} from '../state/table-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import s from './Table.module.css'
import {Paginator} from '../common/Pagination/Pagination';
import SuperInputText from '../Test/h4/common/c1-SuperInputText/SuperInputText';
import {Modal} from '../Modal/Modal';


export function Tables() {
    const history = useHistory();
    let dispatch = useDispatch()

    let userId = useSelector<AppRootStateType, any>(state => state.login.user._id)

    useEffect(() => {
        userId && dispatch(setPacksListTC({user_id: userId}))
    }, [userId])

    const {cardPacks} = useSelector((state: AppRootStateType) => state.table)

    const Sort = () => {
        userId && dispatch(setPacksListTC({sortPacks: '1updated', user_id: userId}))
    }

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
            userId && dispatch(setPacksListTC({user_id: userId, page, pageCount, packName: inputValue}))
        }, [page])

    const [inputValue, setInputValue] = useState<string>('')
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setInputValue(e.currentTarget.value)

    const onSearch = () => dispatch(setPacksListTC({user_id: userId, packName: inputValue, page, pageCount}))

    const [deletedPackId, setDeletedPackId] = useState('')
    const onCloseDelete = () => setDeletedPackId('')

    const [updatingPackId, setUpdatingPackId] = useState('')
    const onCloseUpdate = () => setUpdatingPackId('')

    const UpdateCardPack = (id: string) => {
        dispatch(
            UpdatePackTC(
                {cardsPack: {_id: id, name: inputValue}},
                {user_id: userId}
            )
        )
        setInputValue('')
        setUpdatingPackId('')
    }

    return (
        <div className={s.tableMain}>
            <h2>My packs list</h2>
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
            <TableContainer component={Paper} className={s.tableContainer}>
                <Table aria-label="simple table" className={s.tableContainer}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Cards</TableCell>
                            <TableCell align="center">Last updated<Button onClick={Sort}>ᐁ</Button></TableCell>
                            <TableCell align="center">Created by</TableCell>
                            <TableCell align="center"> Actions</TableCell>
                            <TableCell align="center"><span>{''}</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((row) => {
                                const removePack = () => {
                                    dispatch(DeletePackListTC(row._id, {user_id: userId}))
                                }
                                const getCards = () => {
                                    history.push(`/cards/${row._id}`, row.name)
                                }
                                return (
                                    <TableRow>
                                        {updatingPackId === row._id &&
                                        <Modal
                                            show={updatingPackId === row._id}
                                            title={'Enter new title'}
                                            content={<input value={inputValue} onChange={inputHandler}/>}
                                            footer={<tr key={row._id}>
                                                <button onClick={() => UpdateCardPack(row._id)}>update</button>
                                                <button onClick={onCloseUpdate}>Close</button>
                                            </tr>}
                                            onClose={() => setUpdatingPackId('')}
                                        />}
                                        {deletedPackId === row._id &&
                                        <Modal
                                            show={deletedPackId === row._id}
                                            title={'Do you want delete?'}
                                            content={`Click "yes" if you want`}
                                            footer={<tr key={row._id}>
                                                <button
                                                    onClick={() => dispatch(DeletePackListTC(row._id, {user_id: userId}))}>Yes
                                                </button>
                                                <button onClick={onCloseDelete}>No</button>
                                            </tr>}
                                            onClose={onCloseDelete}
                                        />}
                                        <TableCell component="th" onClick={getCards} scope="row">{row.name} </TableCell>
                                        <TableCell align="center">{row.cardsCount}</TableCell>
                                        <TableCell align="center">{moment(row.updated).format('DD.MM.YYYY')}</TableCell>
                                        <TableCell align="center">{row.path}</TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => setDeletedPackId(row._id)}
                                                    variant="contained"
                                                    color="secondary">Delete</Button>
                                            <Button onClick={() => setUpdatingPackId(row._id)}
                                                variant="contained"
                                                color="primary">Edit</Button>
                                            <Button variant="contained"
                                                    color="primary">Learn</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        )
                        }
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
    );
}