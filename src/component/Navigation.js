import { MDBIcon } from "mdb-react-ui-kit";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "./login/Auth";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    Auth.signout();
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="row col-md-1">
        <div className="col-md-auto bg-light sticky-top">
          <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
            <Link
              to="/"
              className="d-block p-3 link-dark text-decoration-none"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Icon-only"
            >
              <i className="bi-bootstrap fs-1"></i>
            </Link>
            <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-3 align-items-center">
              <li className="nav-item">
                <Link
                  to="#"
                  className="nav-link py-3 px-2"
                  title=""
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  data-bs-original-title="Home"
                >
                  <i className="bi-house fs-1"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="nav-link py-3 px-2"
                  title=""
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  data-bs-original-title="Dashboard"
                >
                  <i className="bi-speedometer2 fs-1"></i>
                </Link>
              </li>
              <li>
                <Link
                  to={"/invoice"}
                  className="nav-link py-3 px-2"
                  title=""
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  data-bs-original-title="Invoice"
                >
                  <MDBIcon fas icon="file-invoice"  size="3x" />
                </Link>
              </li>
              <li>
                <Link
                  to={"/items"}
                  className="nav-link py-3 px-2"
                  title=""
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  data-bs-original-title="Products"
                >
                 <MDBIcon fas icon="th-large" size="3x" />
                </Link>
              </li>
              <li>
                <Link
                  to={"/users"}
                  className="nav-link py-3 px-2"
                  title=""
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  data-bs-original-title="Customers"
                >
                  <i className="bi-people fs-1"></i>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => this.logout(this.props)}
                  className="nav-link py-3 px-2"
                  >
                  <MDBIcon fas icon="sign-out-alt" size="3x" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
