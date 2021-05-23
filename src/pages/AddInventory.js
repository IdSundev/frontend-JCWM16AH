import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import moment from "moment";
import { useDispatch } from "react-redux";
import {saveInventory} from "../store/actions/inventoryAction";
import { useHistory } from "react-router";

export default function AddInventory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const [name, setName] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
  };
  const [serial, setSerial] = useState(Date.now().toString().slice(-7));
  const handleSerial = (e) => {
    setSerial(e.target.value);
  };
  const [stock, setStock] = useState(0);
  const handleStock = (e) => {
    setStock(e.target.value);
  };
  const [category, setCategory] = useState("Electronic");
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const [price, setPrice] = useState(0);
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const [status, setStatus] = useState("avaiable");
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleAdd = () => {
    if (
      date === "" ||
      name === "" ||
      serial === "" ||
      stock === "" ||
      category === "" ||
      price === "" ||
      status === ""
    ) {
      handleShow();
      setMessage("Pastikan semua data terisi / tidak ada data yang kosong!");
      return;
    }
    if (stock === 0) {
      handleShow();
      setMessage(
        "Pastikan semua data terisi / tidak ada data yang kosong dan Stock tidak boleh Nol!"
      );
      return;
    }
    let data = {
      id: Date.now(),
      date: date,
      name: name,
      serial: serial,
      stock: stock,
      category: category,
      price: price,
      status: status,
    };
    dispatch(saveInventory(data))
    alert("Inventory berhasil ditambahkan!")
    history.push("/")
  };
  return (
    <div>
      <Container>
        <Row>
          <Col className="text-center header-app">
            <h2>ADD INVENTORY BARANG</h2>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md={3}> </Col>
          <Col md={6}>
            <Form className="form-add" onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Tanggal</Form.Label>
                <Form.Control
                  type="date"
                  placeholder=""
                  value={date}
                  onChange={handleDate}
                />
                <Form.Label>Nama Barang</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type Here..."
                  value={name}
                  onChange={handleName}
                />
                <Form.Label>Serial Number (SN)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={serial}
                  onChange={handleSerial}
                />
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder=""
                  value={stock}
                  onChange={handleStock}
                />
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" onChange={handleCategory}>
                  <option value="Electronic">Electronic</option>
                  <option value="Handphone">Handphone</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Food & Drink">Food & Drink</option>
                </Form.Control>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder=""
                  value={price}
                  onChange={handlePrice}
                />
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" onChange={handleStatus}>
                  <option value="avaiable">Avaiable</option>
                  <option value="non-avaiable">Non Avaiable</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleAdd}>
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={3}> </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Input Data Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
