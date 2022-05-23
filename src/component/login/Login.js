import React, { Component } from "react";
import userapis from "../api/userapis";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { withRouter } from "react-router";
import Auth from "./Auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoading: false,
      message: "",
    };

    this.submitHandler = this.submitHandler.bind(this);
  }

  usernameChangeHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  passwordChnageHandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    this.setState({
      message: "",
      isLoading: true,
    });

    userapis.login(this.state.username, this.state.password).then(
      () => {
         Auth.authenticate();
         localStorage.setItem("isAuthenticated", true);
          this.props.history.push("/items");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          isLoading: false,
          message: resMessage,
        });
      }
    );
  };

  render() {
    return (
      <div className="col-md-13 fixed-top">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.submitHandler}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.usernameChangeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.passwordChnageHandler}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
