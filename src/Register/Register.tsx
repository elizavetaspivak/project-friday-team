import s from './Register.module.css'
import {Formik} from 'formik';
import {CreateUserThunk} from '../state/register-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {LinearProgress, TextField} from '@material-ui/core';
import {AppRootStateType} from '../state/store';
import { Redirect } from 'react-router-dom';
import React from 'react';


export const Register: React.FC = () => {
    let dispatch = useDispatch()

    let isRegister = useSelector<AppRootStateType, boolean>(state => state.register.isRegister)

    if(isRegister){
        return <Redirect to="/login" />
    }

    return (
        <div className={s.register}>
            <div className={s.registerBlock}>
                <h1>It-incubator</h1>
                <h2>Sign Up</h2>
                <div className={s.form}>
                    <Formik
                        initialValues={{email: '', password: '', confirmPassword: ''}}

                        onSubmit={(values, {setSubmitting}) => {
                            dispatch(CreateUserThunk(values.email, values.password))
                            setSubmitting(false);
                        }}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                              /* and other goodies */
                          }) => (<div className={s.formInput}>
                                <form onSubmit={handleSubmit}>
                                    <TextField type="email"
                                               name="email"
                                               required id="standard-required"
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               value={values.email}
                                               placeholder={'Email'}/>
                                    {errors.email && touched.email && errors.email}
                                    <TextField required id="filled-password-input"
                                               type="password"
                                               name="password"
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               value={values.password}
                                               placeholder={'Password'}/>
                                    {errors.password && touched.password && errors.password}
                                    <TextField required id="filled-password-input"
                                               type="confirmPassword"
                                               name="confirmPassword"
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               value={values.confirmPassword}
                                               placeholder={'Confirm Password'}/>
                                    {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                                    <div className={s.buttonBlock}>
                                        <button className={s.cancelButton}>
                                            Cancel
                                        </button>
                                        <button className={s.registerButton} type="submit" disabled={isSubmitting}>
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
};