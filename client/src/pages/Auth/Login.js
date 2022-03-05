import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Spinner } from "react-bootstrap";
export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const history = useHistory();

  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(userForm);

      if (loginData.success) {
        history.push("/dashboard");
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else
    return (
      <section className="login">
        <div className="container-fluid">
          <div className="row">
            <div className="col-5 login__left"></div>
            <div className="col-7">
              <div className="login__right">
                <form className="form " onSubmit={handleSubmit}>
                  <h1 className="text-center display-3">Login</h1>
                  <div className="form-group my-5">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter User Name"
                      name="username"
                      value={userForm.username}
                      required
                      onChange={handleChange}
                    />
                    <input
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      required
                      className="form-control mt-4"
                      value={userForm.password}
                      onChange={handleChange}
                    />

                    <button className="btn btn-primary mt-4" type="submit">
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}
