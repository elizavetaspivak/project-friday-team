import React, {useEffect} from 'react';
import {Paper, TableBody, TableContainer, TableHead, TableRow, Table} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import {setPacksListTC} from '../state/table-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import Button from '@material-ui/core/Button';

export type TablePropsType = {
    userId: string
}


export function Tables(props: TablePropsType) {
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPacksListTC({user_id: props.userId}))
    }, [])

    const {cardPacks} = useSelector((state: AppRootStateType) => state.table)

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
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Cards</TableCell>
                            <TableCell align="center">Last updated</TableCell>
                            <TableCell align="center">Created by</TableCell>
                            <TableCell align="center"> Actions</TableCell>
                            <TableCell align="center"><span>{''}</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((row) => {
                                return (
                                    <TableRow>
                                        <TableCell component="th" scope="row">{row.name} </TableCell>
                                        <TableCell align="center">{row.cardsCount}</TableCell>
                                        <TableCell align="center">{row.updated}</TableCell>
                                        <TableCell align="center">{row.path}</TableCell>
                                        <TableCell align="center">
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