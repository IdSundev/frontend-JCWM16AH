import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setInventories, deleteItemInventory } from "../store/actions/inventoryAction";
export default function EditInventory(props) {
  const { inventories } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [name, setName] = useState(props.inventory.name);
  const handleName = (e) => {
    setName(e.target.value);
  };
  const [price, setPrice] = useState(props.inventory.price);
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const [category, setCategory] = useState(props.inventory.category);
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const [stock, setStock] = useState(props.inventory.stock);
  const handleStock = (e) => {
    setStock(e.target.value);
  };
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cancelEdit = (idx) => {
    let data = [...inventories];
    data[idx].edit = false;
    dispatch(setInventories(data));
  };
  const updateInventory = () => {
    
    if (stock === 0 || stock === "0") {
      handleShow();
      setMessage(
        "Pastikan semua data terisi / tidak ada data yang kosong dan Stock tidak boleh Nol!"
      );
      return;
    }
    if (
      name === "" ||
      stock === "" ||
      category === "" ||
      price === ""
    ) {
      handleShow();
      setMessage("Pastikan semua data terisi / tidak ada data yang kosong!");
      return;
    }
    let data = {
      id: props.inventory.id,
      date: props.inventory.date,
      name: name,
      serial: props.inventory.serial,
      stock: stock,
      category: category,
      price: price,
      status: props.inventory.status,
    };
    dispatch(deleteItemInventory(data));
    alert("Data telah diUpdate");
    handleClose();
  };
  return (
    <React.Fragment>
      <tr>
        <td>{props.idx + 1}</td>
        <td>{props.inventory.date}</td>
        <td>
          <Form.Control value={name} onChange={handleName} type="text" />
        </td>
        <td>
          <Form.Control as="select" onChange={handleCategory}>
            <option value={category}>{category}</option>
            <option value="Electronic">Electronic</option>
            <option value="Handphone">Handphone</option>
            <option value="Furniture">Furniture</option>
            <option value="Beauty">Beauty</option>
            <option value="Fashion">Fashion</option>
            <option value="Food & Drink">Food & Drink</option>
          </Form.Control>
        </td>
        <td>{props.inventory.serial}</td>
        <td>
          <Form.Control value={stock} onChange={handleStock} type="number" />
        </td>
        <td>
          <Form.Control value={price} onChange={handlePrice} type="number" />
        </td>
        <td>
          <Button variant="primary" onClick={updateInventory}>
            Save
          </Button>{" "}
          <Button variant="warning" onClick={cancelEdit.bind(this, props.idx)}>
            Cancel
          </Button>
        </td>
      </tr>
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
    </React.Fragment>
  );
}
