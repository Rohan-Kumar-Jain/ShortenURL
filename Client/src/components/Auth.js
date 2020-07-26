import React, { Component } from "react";
import "../style/Css.css";
import { authUser } from "./UserFunctions";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      errors: "",
      errorOccur:false,
    };
  }

  componentDidMount() {
    authUser(this.props.match.params.token)
        .then(response => {
            console.log(response+"then");
            this.setState({errors:"Successfully Verified!!"});
            setTimeout(()=>{ this.props.history.push(`/login`);},3000);
        })
        .catch(err => {
           this.setState({errors:"Problem with link"});
           console.log(err);
        })   
  }

  render() {
    return (
      <div className="contain">
                <div className="heading">{this.state.errors}</div>
      </div>
    );
  }
}

export default Auth;
