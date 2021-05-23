import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import AddInventory from "./pages/AddInventory";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/add">
            <AddInventory />
          </Route>
          <Route path="/">
            <AdminPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
