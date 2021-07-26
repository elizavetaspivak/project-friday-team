import { FormControlLabel, TextField } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { loginTC } from "../state/login-reducer";
import { AppRootStateType } from "../state/store";
import s from "./Login.module.css";

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export function Login() {
  const isLoginIn = useSelector<AppRootStateType, boolean>(
    (state) => state.login.isLoggedIn
  );
  const dispath = useDispatch();


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
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
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 7) {
        errors.password = "Password must be more than 7 symbols";
      }
      return errors;
    },

    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      dispath(loginTC(values));
      formik.resetForm();
    },
  });

  if (isLoginIn) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={s.login}>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <TextField type="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}

            <TextField type="password" {...formik.getFieldProps("password")} />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}

            <div>
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox
                    // name="rememberMe"
                    // onChange={formik.handleChange}
                    // value={formik.values.rememberMe}
                    {...formik.getFieldProps("rememberMe")}
                  />
                }

                // ошибка Type 'boolean' is not assignable to type 'string | number | readonly string[] | undefined'.
                // поэт надо не value а  checked={formik.values.rememberMe}
                //   value={formik.values.rememberMe}
                // {...formik.getFieldProps("rememberMe")}
              />
            </div>

            <button> Sing In </button>
          </FormGroup>
          <div className={s.navlinkLogin}>
            <NavLink to={"/register"}>Not registered?</NavLink>
            <NavLink to={"/recovery"}>Forgot password?</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
