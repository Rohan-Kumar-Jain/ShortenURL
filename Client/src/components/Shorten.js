import React, { Component } from "react";
import {
  getList,
  shortUrl,
  shortdirect,
  URL,
} from "./UserFunctions";
import "../style/Css.css";
import logo from "../images/logo2.png";

class Shorten extends Component {
  constructor() {
    super();
    this.state = {
      urll: "",
      shorturl: "",
      items: [], //change
      error: "",
      errorOccur: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    shortUrl(localStorage.usertoken, this.state.urll)
      .then((res) => {
        this.setState({
          shorturl: res.data.url,
        });
        this.getAll();
      })
      .catch((error) => {
        this.setState({ error: "Session Expired!!" });
        this.setState({ errorOccur: true });
        setTimeout(() => {
          localStorage.removeItem("usertoken");
          this.props.history.push(`/`);
        }, 2000);
      });
  }

  getAll = () => {
    getList(localStorage.usertoken).then((data) => {
      this.setState(
        {
          items: [...data],
        },
        () => {
          console.log(this.state.items);
        }
      );
    })
    .catch((error)=>{
      this.setState({ error: "Session Expired!!" });
      this.setState({ errorOccur: true });
      setTimeout(() => {
        localStorage.removeItem("usertoken");
        this.props.history.push(`/`);
      }, 2000);
    });
  };

  componentDidMount() {
    //redirect
    localStorage.usertoken
      ? this.props.history.push(`/shorten`)
      : this.props.history.push(`/login`);
    localStorage.usertoken ? this.getAll() : this.props.history.push(`/login`);
  }

  redirect(ur) {
    console.log("ccc");
    shortdirect(ur).then((res) => {
      window.location.href = res.data;
    });
  }

  render() {
    return (
      <div style={{ backgroundColor: " #28384A", height: "100vh" }}>
        <div style={{ backgroundColor: " #28384A", height: "100%" }}>

          <div style={{  backgroundColor: "#28384A",marginTop: "100px", margin: "40px" }}>
            <div className="urlheader" >
              Shortening URL
            </div>
            <div className="urlheader">
              Shortening URL
            </div>
            <div
              className="heading"
              style={{ margin: "5px", marginTop: "10px" }}>
              Shortening URL
            </div>

            <form noValidate onSubmit={this.onSubmit}>
              <div
                className="row"
                style={{ margin: "2px", marginBottom: "0px" }}>
                <div
                  className="col-lg-9  nopadding"
                  style={{ marginRight: "0px" }}>
                  <input
                    type="link"
                    className="form-control"
                    name="urll"
                    placeholder="Enter link here"
                    style={{
                      height: "48px",
                      marginBottom: "5px",
                    }}
                    value={this.state.urll}
                    onChange={this.onChange}
                  />
                </div>
                <div className="col-lg-3  nopadding">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                    style={{
                      marginBottom: "5px",
                    }}
                  >
                    Shorten
                  </button>
                </div>{" "}
              </div>
            </form>

            {this.state.errorOccur && (
              <div style={{ color: "red", margin: "5px" }}>
                {this.state.error}
              </div>
            )}
          </div>

          <div className="outerdiv" >
            <div class="table-responsive">
              <table className="table" style={{ backgroundColor: " #28384A", padding: "20px" }}>
                <tbody>
                  {this.state.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img src={logo} alt="Logo"
                          style={{
                            width: "3vw",
                            height: "3vh",
                            margin: "9px",
                          }}
                        />
                      </td>
                      <td style={{ fontSize: "2vh" }}>
                        <div>
                          Url :
                          <a
                            href={item.full}  target="_blank"
                            style={{ color: "red" }}
                          >
                            {item.full}
                          </a>
                        </div>
                        <div>
                          ShortUrl :
                          <a
                            href={item.full}
                            style={{ color: "lightgreen" }}  target="_blank"
                            onClick={() => {
                              this.redirect(item.short);
                            }}
                          >
                            {URL}/users/{item.short}
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shorten;
