import React, { Component } from "react";
import { login, socialLogin } from "./UserFunctions";
import { forgotPassword } from "./UserFunctions";
import "../style/Css.css";
import GoogleLogin from "react-google-login";
import logo2 from "../images/login.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: {},
      errorOccur: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  signup = (res) => {//social login
    const newUser = {
      first_name: res.profileObj.givenName,
      last_name: res.profileObj.familyName,
      email: res.profileObj.email,
      password: res.googleId,
    };
    socialLogin(newUser).then((ress) => {

      const socialuser = {
        email: res.profileObj.email,
        password:res.googleId,
      };

      login(socialuser).then((res) => {
        if (!res.error) {
          this.props.history.push(`/shorten`);
        } else {
          this.setState({ error: res.error });
          this.setState({ errorOccur: true });
        }
      });
    });
    return true;
  };

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

    login(user).then((res) => {
      if(res=="Error: Network Error"){
        this.setState({ error: "Error: Network Error" });
        this.setState({ errorOccur: true });
      }
      else{
      if (!res.error) {
        this.props.history.push(`/shorten`);
      } else {
        this.setState({ error: res.error });
        this.setState({ errorOccur: true });
      }}
    })
  }


  forgetPassword(){//reset
    forgotPassword(this.state.email)
    .then(response => {
      this.setState({ error: response.data.error });
      this.setState({ errorOccur: true });
    })
    .catch(err => {
      this.setState({ error: "Reset link is sent to the Email!!" });
      this.setState({ errorOccur: true });
    })
  }


  componentDidMount(){
    //redirect
    localStorage.usertoken ?this.props.history.push(`/shorten`):console.log("false");
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

                {this.state.errorOccur && (
                  <div style={{ color: "red", margin: "5px" }}>
                    {this.state.error}
                  </div>
                )}

                <div
                  className="createAccountButton"
                  style={{ display: "flex" }}
                >
                  <button class="btn btn-outline-light" type="submit">
                    Log in
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-light"
                    style={{borderColor: "#28384A",color: "#2C96DF",alignSelf: "flex-end"}}
                    onClick={()=>{this.forgetPassword()}}>
                    forget password?
                  </button>
                </div>

                <div className="flexdiv">
                  <button
                    style={{ borderColor: "#28384A", color: "#2C96DF" }}
                    type="button"
                    class="btn btn-outline-light"
                    onClick={() => {
                      this.props.history.push(`/register`);
                    }}>
                    Create New Account
                  </button>
                </div>

              </form>

              <div className="googlelogindiv">
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
