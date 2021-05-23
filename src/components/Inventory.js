import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemInventory,
  setInventories,
} from "../store/actions/inventoryAction";

export default function Inventory(props) {
  const { inventories } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    handleShow();
  };
  const editInventory = (idx) => {
    let data = [...inventories];
    data[idx].edit = true;
    dispatch(setInventories(data));
  };
  const deleteInventory = () => {
    let data = {
      id: props.inventory.id,
      date: props.inventory.date,
      name: props.inventory.name,
      serial: props.inventory.serial,
      stock: 0,
      category: props.inventory.category,
      price: props.inventory.price,
      status: "non-avaiable",
    };
    dispatch(deleteItemInventory(data));
    alert("Data telah dihapus");
    handleClose();
  };
  return (
    <React.Fragment>
      <tr>
        <td>{props.idx + 1}</td>
        <td>{props.inventory.date}</td>
        <td>{props.inventory.name}</td>
        <td>{props.inventory.category}</td>
        <td>{props.inventory.serial}</td>
        <td>{props.inventory.stock}</td>
        <td>{props.inventory.price}</td>
        <td>
          <Button
            variant="success"
            onClick={editInventory.bind(this, props.idx)}
          >
            Edit
          </Button>{" "}
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </td>
      </tr>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Konfirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah anda akan menghapus <b>{props.inventory.name}</b> dari
          inventory barang?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteInventory}>
            Hapus Barang
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
