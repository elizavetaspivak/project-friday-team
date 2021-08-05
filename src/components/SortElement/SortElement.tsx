import Button from "@material-ui/core/Button";
import React from "react";

type SortPacksPropsType = {
   sortTitle: string
    sortHandler1: (sortTitle: string) => void
    sortHandler0: (sortTitle: string) => void 
}

export const SortElement = (props: SortPacksPropsType) => {

    const onSortHandler1 = () => {
        props.sortHandler1(`1${props.sortTitle}`)
    }
    const onSortHandler0 = () => {
       props.sortHandler0(`0${props.sortTitle}`)

    }
    return (
        <div>
            <div>
                <Button onClick={onSortHandler0}>/\</Button>
            </div>
            <div>
                <Button onClick={onSortHandler1}>\/</Button>
            </div>
        </div>
    )
}