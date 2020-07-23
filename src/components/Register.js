import React, { Component } from "react";
import { register } from "./UserFunctions";
import "../style/Css.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      errors: {},
      errorOccur:false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  validateEmail(email) {
    //For email validation.
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === true) {
    } else {
      this.setState({error:"Invalid Email!!"});
      this.setState({errorOccur:true});
    }
  }

  validate(first,last,password) {
    //For validation.
    if (first === '' && last===''&& password==='') {
      this.setState({error:"Please fill all details!!"});
      this.setState({errorOccur:true});
    } else {
     
    }
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    this.validateEmail(this.state.email);
    this.validate(this.state.first_name,this.state.last_name,this.state.password);
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    };

    register(newUser).then((res) => {
      this.props.history.push(`/login`);
    });
  }

  render() {
    return (
      <div className="contain">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="heading">Sign in</div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    placeholder="Enter your first name"
                    value={this.state.first_name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    placeholder="Enter your lastname name"
                    value={this.state.last_name}
                    onChange={this.onChange}
                  />
                </div>
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
                  style={{height:"40px"}}
                >
                  Register!
                </button> */}
                {this.state.errorOccur && (
                  <div style={{color:"red" ,margin:"5px"}}>{this.state.error}</div>
                )}
                <button
                  // type="button"
                  class="btn btn-outline-light"
                  type="submit"
                >
                  Register
                </button>
                <button
                  type="button"
                  class="btn btn-outline-light"
                  // type="submit"
                  onClick={() => {
                    this.props.history.push(`/login`);
                  }}
                >
                  back
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
