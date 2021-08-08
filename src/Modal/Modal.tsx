import React, {ReactElement, useEffect} from "react";
import style from "./Modal.module.css"

interface ModalProps {
    title: string
    content: ReactElement | string
    footer: ReactElement | string
    onClose: () => void
    show: boolean
}

export const Modal = ({
                          title = '',
                          content = '',
                          footer = '',
                          onClose,
    show
                      }: ModalProps) => {

    const onKeydown = ({key}: KeyboardEvent) => {
        switch (key) {
            case 'Escape':
                onClose()
                break
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })

    if (!show) return null;

    return (
        <React.Fragment>
            <div className={style.modal} onClick={onClose}>
                <div className={style.modalDialog} onClick={e => e.stopPropagation()}>
                    <div className={style.modalHeader}>
                        <h3 className={style.modalTitle}>{title}</h3>
                        <span className={style.modalClose} onClick={onClose}>
            &times;
          </span>
                    </div>
                    <div className={style.modalBody}>
                        <div className={style.modalContent}>{content}</div>
                    </div>
                    {footer && <div className={style.modalFooter}>{footer}</div>}
                </div>
            </div>
        </React.Fragment>
    )
}