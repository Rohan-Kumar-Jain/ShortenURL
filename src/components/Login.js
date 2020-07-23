import React, { Component } from "react";
import { login } from "./UserFunctions";
import "../style/Css.css";
import GoogleLogin from "react-google-login";
import logo2 from "../images/login.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  signup=(res)=> {
    return true;
    //comming soon...
  }

  responseGoogle = (response) => {
    console.log(response);
    this.signup(response);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    // login(user).then(res => {
    //   if (res) {
    this.props.history.push(`/shorten`);
    //   }
    // })
  }

  render() {
    return (
      <div className="contain">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="heading">Log in</div>

                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                {/* <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Sign in
                </button> */}
                <div className="createAccountButton">
                  <button
                    // type="button"
                    class="btn btn-outline-light"
                    type="submit"
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-light"
                    onClick={() => {
                      this.props.history.push(`/register`);
                    }}
                  >
                    Create Account
                  </button>
                </div>
              </form>
              <div
                style={{
                  margin: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <GoogleLogin
                  style={{ margin: "10px" }}
                  clientId="647449212157-kchmgdpfbv8omat479k2m3rouune918g.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <img src={logo2} style={{ height: "4vh" }} />
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
