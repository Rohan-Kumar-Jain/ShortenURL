import React, { Component } from "react";
import "../style/Css.css";
import { resetPage } from "./UserFunctions";

class Resetpassword extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      errors: {},
      errorOccur:false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    resetPage(this.state.password,this.props.match.params.token)
    .then(response => {
      if(response.statusText==="OK"){
        this.setState({ error: response.data.message });
        this.setState({ errorOccur: true });
      }
    })
    .catch(Err => {
      this.setState({ error:"Error: Request failed with status code 401 or link failed" });
      this.setState({ errorOccur: true });
    })   
  }

  render() {
    return (
      <div className="contain">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="heading">Reset Password</div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Reset Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div
                  className="createAccountButton"
                  style={{ display: "flex" }}
                >
                  <button class="btn btn-outline-light" type="submit">
                    Reset Password
                  </button>
                </div>
                {this.state.errorOccur && (
                  <div style={{color:"red" ,margin:"5px"}}>{this.state.error}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Resetpassword;
