import React, { Component } from "react";
import jwt_decode from "jwt-decode";
// import URL from "./UserFunctions";
import {
  URL,
} from "./UserFunctions";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      errors: {},
    };
  }

  componentDidMount() {
    localStorage.usertoken
    ? console.log("")
    : window.location=("https://shorten-url-1.herokuapp.com/login")
 
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
    });
  }

  render() {
    return (
      <div className="contain">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
               
                <table className="table table-dark">
                  <tbody>
                    <tr>
                      <td>First Name</td>
                      <td>{this.state.first_name}</td>
                    </tr>
                    <tr>
                      <td>Last Name</td>
                      <td>{this.state.last_name}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{this.state.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
            <button class="btn btn-outline-light" onClick={()=>{this.props.history.push(`/shorten`)}}>
                    back
                  </button>
        </div></div>
      </div>
    );
  }
}

export default Profile;
