import React, {ReactElement} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

type TransitionsModalPropsType = {
    title: string
    content: ReactElement | string
    footer: ReactElement | string
    onClose: () => void
    open: boolean
}

export default function TransitionsModal(props: TransitionsModalPropsType) {

    return (
        <div style={{maxHeight: 'inherit !important'}}>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div>{props.content}</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {props.footer && <div>{props.footer}</div>}
                </DialogActions>
            </Dialog>
        </div>
    );
}