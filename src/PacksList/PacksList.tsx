import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {AppRootStateType} from '../state/store';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import {CreatNewPackListTC, setPacksListTC} from '../state/table-reducer';

export function PacksList() {
    const dispatch = useDispatch()

    const profile = useSelector<AppRootStateType, any>(state => state.login.user)
    const {cardPacks, minCardsCount } = useSelector((state: AppRootStateType) => state.table)

    useEffect(() => {
        dispatch(setPacksListTC())
    }, [])

    const CreateNewPackList = () => {
      dispatch(CreatNewPackListTC({cardsPack: {name: 'newPackName', path: profile.name}}, {user_id: profile._id}))
    }

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    return (
        <div
            style={{
                margin: '0 10px',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >

            <Button onClick={CreateNewPackList} variant="contained"
                    color="primary">Add new pack</Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Cards</TableCell>
                            <TableCell align="center">Last updated</TableCell>
                            <TableCell align="center">Created by</TableCell>
                            <TableCell align="center"> Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((row) => {
                                return (
                                    <TableRow key={row._id}>
                                        <TableCell component="th" scope="row">{row.name} </TableCell>
                                        <TableCell align="center">{row.cardsCount}</TableCell>
                                        <TableCell align="center">{row.updated}</TableCell>
                                        <TableCell align="center">{row.path}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                color="primary">Edit</Button>
                                            <Button
                                                variant="contained"
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
        </div>
    );
}