import { Form, Field } from "react-final-form";
import authService from "../../services/authService";
import style from "./LoginForm.module.css";

const LoginForm = () => {
  // const handleSubmit = () => {};
  const onSubmit = async (args) => {
    const { username, password } = args;
    let res;
    try {
      res = await authService.login(username, password);
    } catch (err) {
      console.log(err);
    }
    console.log(res);
    args = {};
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
