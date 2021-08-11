import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TableCell from '@material-ui/core/TableCell'
import {useDispatch, useSelector} from 'react-redux'
import Button from '@material-ui/core/Button'
import {AppRootStateType} from '../state/store'
import {Redirect, useHistory, useParams} from 'react-router-dom'
import {
    createCardTC,
    getCardsTC,
    initialStateCardsType,
    removeCardTC,
    updateCardTC,
} from '../state/cards-reducer'
import s from './Cards.module.css'
import moment from 'moment'
import {DeletePackListTC, setPacksListTC} from '../state/table-reducer'
import {Modal} from '../Modal/Modal'
import {Paginator} from '../components/Pagination/Pagination'

export function Cards() {
    let dispatch = useDispatch()
    const history = useHistory()
    const isLoginIn = useSelector<AppRootStateType, boolean>(
        (state) => state.login.isLoggedIn
    )
    let {page, pageCount, cardsTotalCount} = useSelector<AppRootStateType, any>(
        (state) => state.cards
    )

    const {cardsId} = useParams<{ cardsId: string }>()

    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: cardsId, pageCount: 9}))
        setQuestion('')
        setAnswer('')
        setUpdatingCardId('')
        setCreate(false)
    }, [dispatch, cardsId])

    const cards = useSelector<AppRootStateType, any>((state) => state.cards)
    const userId = useSelector<AppRootStateType, any>(
        (state) => state.login.userId
    )
    const name = useSelector<AppRootStateType, any>(
        (state) => state.table.cardPacks[0].name
    )

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    })
    const onPageChanged = useCallback(
        (page: number) => {
            dispatch(
                getCardsTC({
                    page,
                    pageCount,
                    cardsPack_id: cardsId
                })
            )
        },
        [page]
    )

    const addCardHandler = () => {
        dispatch(
            createCardTC(
                {
                    card: {
                        cardsPack_id: cardsId,
                        question: question,
                        answer: answer,
                    },
                },
                {cardsPack_id: cardsId}
            )
        )
        setQuestion('')
        setAnswer('')
        setCreate(false)
    }

    const updateCardHandler = (id: string) => {
        dispatch(
            updateCardTC(
                {
                    card: {
                        _id: id,
                        question: question,
                        answer: answer,
                    },
                },
                cardsId
            )
        )
        setQuestion('')
        setAnswer('')
        setUpdatingCardId('')
    }

    const classes = useStyles()

    const Sort = () => {
        userId && dispatch(setPacksListTC({sortPacks: '1updated'}))
    }

    const [isCreate, setCreate] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>('')
    const createQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const [answer, setAnswer] = useState<string>('')
    const createAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const [deletedPackId, setDeletedPackId] = useState('')
    const onCloseDelete = () => setDeletedPackId('')
    const onClose = () => setCreate(false)

    const [updatingCardId, setUpdatingCardId] = useState('')
    const onCloseUpdate = () => setUpdatingCardId('')

    if (!isLoginIn) {
        return <Redirect to={'/login'}/>
    }
    return (
        <div
            className={s.cards}
            style={{
                margin: '0 0px',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {isCreate && (
                <Modal
                    show={isCreate}
                    title={'Enter title'}
                    content={
                        <div>
                            <input value={question} onChange={createQuestion}/>
                            <input value={answer} onChange={createAnswer}/>
                        </div>
                    }
                    footer={
                        <tr>
                            <button onClick={addCardHandler}>add</button>
                            <button onClick={onClose}>Close</button>
                        </tr>
                    }
                    onClose={onClose}
                />
            )}
            <div className={s.cardsContainer}>
                <div className={s.cardsTable}>
                    <div className={s.buttons}>
                        <IconButton className={s.backButton} onClick={history.goBack} color="primary"
                                    size="medium" aria-label="upload picture"
                                    component="span">⇦</IconButton>
                        <div>
                            {cards.packUserId == userId ? (
                                <Button
                                    className={s.addCardButton}
                                    onClick={() => setCreate(true)}
                                    variant="contained"
                                    color="primary"
                                >
                                    Add card
                                </Button>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Question</TableCell>
                                    <TableCell align="center">Answer</TableCell>
                                    <TableCell align="center">
                                        Last Updated<IconButton onClick={Sort} color="primary"
                                                                size="small" aria-label="upload picture"
                                                                component="span">ᐁ</IconButton>
                                    </TableCell>
                                    <TableCell align="center">Grade</TableCell>
                                    {cards.packUserId == userId ? (
                                        <TableCell align="center">Actions</TableCell>
                                    ) : (
                                        ''
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cards.cards.map((row: any) => {
                                    const removeHandler = () => {
                                        dispatch(removeCardTC(row._id, row.cardsPack_id))
                                    }
                                    return (
                                        <TableRow key={row._id}>
                                            {updatingCardId === row._id && (
                                                <Modal
                                                    show={updatingCardId === row._id}
                                                    title={'Enter new title'}
                                                    content={
                                                        <div>
                                                            <input value={answer} onChange={createAnswer}/>
                                                            <input
                                                                value={question}
                                                                onChange={createQuestion}
                                                            />
                                                        </div>
                                                    }
                                                    footer={
                                                        <tr key={row._id}>
                                                            <button
                                                                onClick={() => updateCardHandler(row._id)}
                                                            >
                                                                update
                                                            </button>
                                                            <button onClick={onCloseUpdate}>Close</button>
                                                        </tr>
                                                    }
                                                    onClose={() => setUpdatingCardId('')}
                                                />
                                            )}
                                            {deletedPackId === row._id && (
                                                <Modal
                                                    show={deletedPackId === row._id}
                                                    title={'Do you want delete?'}
                                                    content={`Click "yes" if you want`}
                                                    footer={
                                                        <tr key={row._id}>
                                                            <button
                                                                onClick={() =>
                                                                    dispatch(
                                                                        removeCardTC(row._id, row.cardsPack_id)
                                                                    )
                                                                }
                                                            >
                                                                Yes
                                                            </button>
                                                            <button onClick={onCloseDelete}>No</button>
                                                        </tr>
                                                    }
                                                    onClose={onCloseDelete}
                                                />
                                            )}
                                            <TableCell component="th" scope="row">
                                                {row.question}{' '}
                                            </TableCell>
                                            <TableCell align="center">{row.answer}</TableCell>
                                            <TableCell align="center">
                                                {moment(row.updated).format('DD.MM.YYYY')}
                                            </TableCell>
                                            <TableCell align="center">{row.grade}</TableCell>
                                            {cards.packUserId == userId ? (
                                                <TableCell align="center">
                                                    <Button
                                                        onClick={() => setDeletedPackId(row._id)}
                                                        variant="contained"
                                                        color="secondary"
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        onClick={() => setUpdatingCardId(row._id)}
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        Edit
                                                    </Button>
                                                </TableCell>
                                            ) : (
                                                ''
                                            )}
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
                    <div style={{height: 400, width: '100%'}}></div>
                </div>
            </div>
        </div>
    )
}
