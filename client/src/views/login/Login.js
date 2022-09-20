/* eslint-disable quotes */
import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../reduxSlices/userSlice";
import { useDispatch } from "react-redux";
import authService from "../../services/authService";
import style from "../Form.module.css";
import { toast } from "react-toastify";

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
        user = data.user;
        toast.success("Authentication succeeded!");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Authentication failed");
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
  const InputError = ({ meta }) => {
    if (meta.error && meta.touched) {
      return <span className={style.InputMessage}>{meta.error}</span>;
    }
    return null;
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
                  <InputError meta={meta} />
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <label className={style.InputLabel}>Password</label>
                  <input
                    {...input}
                    className={style.InputField}
                    type="password"
                    placeholder="Password"
                  ></input>
                  <InputError meta={meta} />
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
