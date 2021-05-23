import React, { useEffect } from "react";
import { Navbar, Nav, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getInventories } from "../store/actions/inventoryAction";

export default function Navigation() {
  const dispatch = useDispatch();
  const { inventories } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getInventories());
  }, []);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Remidial-Frontend</Navbar.Brand>
      <Nav className="mr-auto link-router">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Inventory <Badge variant="danger">{inventories.length}</Badge>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add" className="nav-link">
            Add Inventory
          </Link>
        </li>
      </Nav>
    </Navbar>
  );
}
