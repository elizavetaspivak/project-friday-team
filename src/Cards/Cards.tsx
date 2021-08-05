import React, {useEffect} from 'react';
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TableCell from '@material-ui/core/TableCell';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import {AppRootStateType} from '../state/store';
import {Redirect, useHistory, useParams} from 'react-router-dom';
import {createCardTC, getCardsTC, removeCardTC} from '../state/cards-reducer';
import s from './Cards.module.css'
import moment from 'moment';
import {setPacksListTC} from '../state/table-reducer';

export function Cards() {
    let dispatch = useDispatch()
    const history = useHistory()
    const isLoginIn = useSelector<AppRootStateType, boolean>(
        (state) => state.login.isLoggedIn
    );
    const {cardsId} = useParams<{ cardsId: string }>()

    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: cardsId, pageCount: 9}))
    }, [dispatch, cardsId])

    const cards = useSelector<AppRootStateType, any>(state => state.cards)
    const userId = useSelector<AppRootStateType, any>(state => state.login.userId)
    const name = useSelector<AppRootStateType, any>(state => state.table.cardPacks[0].name)

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    const addCardHandler = () => {
        dispatch(createCardTC({
            card: {
                cardsPack_id: cardsId,
                question: 'newQuestion',
                answer: 'NewAnswer'
            }
        }, {cardsPack_id: cardsId}))
    }

    const classes = useStyles();

    const Sort = () => {
        userId && dispatch(setPacksListTC({sortPacks: '1updated'}))
    }

    if (!isLoginIn) {
        return <Redirect to={'/login'}/>;
    }
    return (
        <div className={s.cards}
             style={{
                 margin: '0 0px',
                 display: 'flex',
                 flexFlow: 'column',
                 alignItems: 'center',
                 justifyContent: 'center'
             }}
        >
            <div className={s.cardsContainer}>

                <div className={s.cardsTable}>
                    <Button onClick={history.goBack}>Back</Button>

                    {cards.packUserId == userId ? <Button onClick={addCardHandler}
                                                          variant="contained"
                                                          color="primary">Add card</Button> : ''}
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Question</TableCell>
                                    <TableCell align="center">Answer</TableCell>
                                    <TableCell align="center">Last Updated<Button onClick={Sort}>ᐁ</Button></TableCell>
                                    <TableCell align="center">Grade</TableCell>
                                    {cards.packUserId == userId ? <TableCell align="center">Actions</TableCell> : ''}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cards.cards.map((row: any) => {
                                        const removeHandler = () => {
                                            dispatch(removeCardTC(row._id, row.cardsPack_id))
                                        }
                                        return (
                                            <TableRow key={row._id}>
                                                <TableCell component="th" scope="row">{row.question} </TableCell>
                                                <TableCell align="center">{row.answer}</TableCell>
                                                <TableCell align="center">{moment(row.updated).format("DD.MM.YYYY")}</TableCell>
                                                <TableCell align="center">{row.grade}</TableCell>
                                                {cards.packUserId == userId ? <TableCell align="center">
                                                    <Button onClick={removeHandler} variant="contained"
                                                            color="secondary">Delete</Button>
                                                    <Button variant="contained"
                                                            color="primary">Edit</Button>
                                                </TableCell> : ''}
                                            </TableRow>
                                        )
                                    }
                                )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{height: 400, width: '100%'}}>
                    </div>
                </div>
            </div>
        </div>
    );
};