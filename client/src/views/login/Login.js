import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../reduxSlices/userSlice";
import { useDispatch } from "react-redux";
import authService from "../../services/authService";
import style from "./Login.module.css";

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
  const validate = () => {};
  return (
    <div className={style.LoginFormContainer}>
      <h1>Login</h1>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label className={style.InputLabel}>Username</label>
              <Field
                className={style.InputField}
                name="username"
                component="input"
                placeholder="Username"
              />
            </div>
            <div>
              <label className={style.InputLabel}>Password</label>
              <Field
                className={style.InputField}
                name="password"
                component="input"
                placeholder="Password"
              />
            </div>
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
