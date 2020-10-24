import React from "react";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../layout/AdminLayout/Breadcrumb";

class SignIn extends React.Component {
  constructor() {
    super();

    // Authentication setup
    const token = localStorage.getItem("token");

    let isAuthenticated = true;
    if(token == null){
        isAuthenticated=false;
    }

    this.state = {
      email: "",
      password: "",
      isAuthenticated,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let data = JSON.stringify({
      username: this.state.email,
      password: this.state.password,
    });

    //console.log(res.data.response.token)

    axios
      .post("https://ektai.work/api/2.0/authentication", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.response.token) {
          localStorage.setItem("token", res.data.response.token);
          this.setState({
            isAuthenticated: true,
          });
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((json) => {
        this.setState({
          isLoaded: true,
          token: json,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    // Authentication check 
    if (this.state.isAuthenticated) {
      return <Redirect to="/dash" />;
    }

    return (
      <Aux>
        <Breadcrumb />
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="feather icon-unlock auth-icon" />
                </div>
                <h3 className="mb-4">Login</h3>
                <form onSubmit={this.onSubmit}>
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                      <input
                        type="checkbox"
                        name="checkbox-fill-1"
                        id="checkbox-fill-a1"
                      />
                      <label htmlFor="checkbox-fill-a1" className="cr">
                        {" "}
                        Save credentials
                      </label>
                    </div>
                  </div>
                  <button className="btn btn-primary shadow-2 mb-4">
                    Login
                  </button>
                </form>
                <p className="mb-2 text-muted">
                  Forgot password?{" "}
                  <NavLink to="/auth/reset-password-1">Reset</NavLink>
                </p>
                <p className="mb-0 text-muted">
                  Don’t have an account?{" "}
                  <NavLink to="/auth/signup-1">Signup</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignIn;
