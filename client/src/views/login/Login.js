/* eslint-disable quotes */
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../reduxSlices/userSlice";
import { useDispatch } from "react-redux";
import authService from "../../services/authService";
import style from "../Form.module.css";

const usernameRegex = /^[A-z0-9_-]{3,16}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (args) => {
    const { username, password } = args;
    let user = null;
    try {
      const data = await authService.login(username, password);
      if (data.success) {
        console.log(data);
        user = data.user;
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(setUser(user));
    navigate("/");
  };

  const validate = (values) => {
    const { username, password } = values;
    let errors = {};

    if (!username) {
      errors.username = "Required";
    } else if (!usernameRegex.test(username)) {
      errors.username = "Invalid username format";
    }

    if (!password) {
      errors.password = "Required";
    } else if (!passwordRegex.test(password)) {
      errors.password = "Invalid password format";
    }
    return errors;
  };
  return (
    <div className={style.FormContainer}>
      <h1>Login</h1>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="username">
              {({ input, meta }) => (
                <div>
                  <label className={style.InputLabel}>Username</label>
                  <input
                    {...input}
                    className={style.InputField}
                    type="text"
                    placeholder="Username"
                  ></input>
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <label className={style.InputLabel}>Username</label>
                  <input
                    {...input}
                    className={style.InputField}
                    type="password"
                    placeholder="Password"
                  ></input>
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <button className={style.SubmitButton} type="submit">
              Submit
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default LoginForm;
