import { Redirect, Route, Switch } from "react-router";
import InvoiceForm from "../invoice/InvoiceForm";
import InvoiceList from "../invoice/InvoiceList";
import AddItem from "../item/AddItem";
import EditItem from "../item/EditItem";
import ItemList from "../item/ItemList";
import Auth from "../login/Auth";
import Login from "../login/Login";
import UserList from "../user/UserList";

const Router = (props) => (
  <Switch>
    <Route exact path={["/login","/"]} component={Login} />
    <PrivateRoute path="/items" component={ItemList} />
    <PrivateRoute path={"/item/add"} component={AddItem} />
    <PrivateRoute path={"/item/edit/:id"} component={EditItem} />
    <PrivateRoute path="/invoice" component={InvoiceList} />
    <PrivateRoute path="/new-invoice" component={InvoiceForm} />
    <PrivateRoute path="/users" component={UserList} />
    <PrivateRoute path="/logout" component={Auth.signout} />
  </Switch>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("isAuthenticated") ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

export default Router;
