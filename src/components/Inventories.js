import React, { useEffect } from "react";
import { Button, Col, Container, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getInventories } from "../store/actions/inventoryAction";
import Inventory from "./Inventory";
import EditInventory from "./EditInventory";
import { useHistory } from "react-router";

export default function Inventories() {
  const dispatch = useDispatch();
  const { inventories, isLoadingInventories } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getInventories());
  }, []);
  const history = useHistory();

  if (isLoadingInventories) {
    return (
      <Container>
        <Row>
          <Col>
            <Button
              variant="danger"
              className="add-inventory-button"
              onClick={() => history.push("/add")}
            >
              Add Inventory
            </Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Nama Product</th>
                  <th>Serial Number (SN)</th>
                  <th>Stock</th>
                  <th>Harga</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center">
                    <Spinner animation="grow" />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <Button
              variant="danger"
              className="add-inventory-button"
              onClick={() => history.push("/add")}
            >
              Add Inventory
            </Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Nama Product</th>
                  <th>Kategori</th>
                  <th>Serial Number (SN)</th>
                  <th>Stock</th>
                  <th>Harga</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inventories.map((data, idx) => {
                  if (!data.edit) {
                    return <Inventory key={idx} idx={idx} inventory={data} />;
                  } else {
                    return (
                      <EditInventory key={idx} idx={idx} inventory={data} />
                    );
                  }
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}
