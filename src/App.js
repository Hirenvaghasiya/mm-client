import React, { Component } from "react";
import loginapis from "./component/api/loginapis";
import EventBus from "./component/common/EventBus";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navigation from "./component/Navigation";
import Router from "./component/common/Router";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = loginapis.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });

      EventBus.on("logout", () => {
        this.logout();
      });
    }
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logout() {
    loginapis.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    return (
      <>
        <div className="container-fluid row">
         <Navigation />
        
          <React.Fragment>
          <Router />
        </React.Fragment>
        </div>
      </>
    );
  }
}

export default App;
