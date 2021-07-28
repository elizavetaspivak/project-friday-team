import s from './PasswordRecovery.module.css'
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import {TextField} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import React from "react";

type FormikErrorType = {
    email?: string;
};

export function PasswordRecovery() {
    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }
            return errors;
        },
        onSubmit: (values) => {
            // dispatch(submitTC(values));
            formik.resetForm();
        }
    })

    return (
        <div className={s.recovery}>
            <div className={s.recoveryBlock}>
                <h1>It-incubator</h1>
                <h2>Forgot password</h2>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup className={s.form}>
                        <TextField type="email" placeholder={'Email'}
                                   helperText={'Enter your email address to receive password recovery instructions '}
                                   {...formik.getFieldProps("email")} />
                        {formik.touched.email && formik.errors.email ? (
                            <div style={{color: "red"}}>{formik.errors.email}</div>
                        ) : null}
                        <div className={s.buttonBlock}>
                            <button className={s.recoveryButton}> Get Instructions</button>
                        </div>
                    </FormGroup>
                    <div className={s.navlinkBlock}>
                        <div>Still remember your good old password?</div>
                        <NavLink className={s.navlink} to={"/login"}>Try logging in</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}