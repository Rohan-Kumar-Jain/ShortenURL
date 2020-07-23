import React, { Component } from "react";
import "../style/Css.css";

import { CopyToClipboard } from "react-copy-to-clipboard";

class Shorten extends Component {
  constructor() {
    super();
    this.state = {
      urll: "",
      shorturl: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    //backend

    this.setState({
      shorturl: "aaaaaaaaaaaaaaaaassssssssaaaaaaaaaaaaaaaaaaaa",
    });
  }

  render() {
    return (
      <div className="contain">
        <div className="container">
          <div className="heading">Shortening URL</div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="row" style={{ margin: "2px", marginBottom: "0px" }}>
              <div
                className="col-lg-9  nopadding"
                style={{ marginRight: "0px" }}
              >
                <input
                  type="link"
                  className="form-control"
                  name="urll"
                  placeholder="Enter link here"
                  style={{
                    height: "48px",
                    paddingRight: "0px",
                    marginRight: "0px",
                  }}
                  value={this.state.urll}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-lg-3  nopadding">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Shorten
                </button>
              </div>{" "}
            </div>
          </form>
          <div
            style={{
              height: "7vh",
              backgroundColor: "#343A40",
              margin: "2px",
              borderColor: "white",
              borderWidth: "0.1px",
              borderStyle: "solid",
              borderBottomRightRadius: "10px",
              borderBottomLeftRadius: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                display: "flex",
                overflow: "hidden",
                width: "90vw",
                color: "white",
                fontSize: "18px",
                margin: "8px",
              }}
            >
              {this.state.shorturl}
            </div>
            <div>
              <CopyToClipboard text={this.state.shorturl}>
                <button
                  type="button"
                  class="btn btn-outline-light"
                  onClick={() => {}}
                  style={{ margin: "5px", borderColor: "#343A40" }}
                >
                  CopyURL
                </button>
              </CopyToClipboard>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Shorten;
