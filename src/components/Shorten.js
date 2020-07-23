import React, { Component } from "react";
// const { heightt, widthh } = useWindowDimensions();
import "../style/Css.css";
class Shorten extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="contain">
        <div className="container">
          <div className="heading">Shortening URL</div>
          <div className="row" style={{margin:"2px",marginBottom:"0px"}}>
            <div className="col-lg-9  nopadding" style={{ marginRight: "0px" }}>
              <input
                type="text"
                className="form-control"
                name="link"
                placeholder="Enter link here"
                style={{
                  height: "48px",
                  paddingRight: "0px",
                  marginRight: "0px",
                }}
                //   value={}
              />
            </div>
            <div className="col-lg-3  nopadding">
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
                // style={{ width: "20vw" }}
              >
                Shorten
              </button>
            </div>{" "}
          </div>

          {/* </div> */}
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
            <div style={{ width: "90vw" }}></div>
            <div>
              <button
                type="button"
                class="btn btn-outline-light"
                onClick={() => {}}
                style={{ margin: "5px", borderColor: "#343A40" }}
              >
                CopyURL
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Shorten;
