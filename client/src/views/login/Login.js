import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../reduxSlices/userSlice";
import { useDispatch } from "react-redux";
import authService from "../../services/authService";
import style from "../Form.module.css";

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
    } else if (username.length < 3) {
      errors.username = "Username too short";
    }

    if (!password) {
      errors.password = "Required";
    } else if (!passwordRegex.test(password)) {
      errors.password = "Invalid password";
    }
  };
  return (
    <div className={style.FormContainer}>
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
