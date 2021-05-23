import { SET_INVENTORIES, SET_LOADING_INVENTORIES } from "./actionType";
import { url } from "../../urlConfig";
import axios from "axios";

export function setInventories(data) {
  return {
    type: SET_INVENTORIES,
    payload: data,
  };
}

function setLoadingInventories(data) {
  return {
    type: SET_LOADING_INVENTORIES,
    payload: data,
  };
}

export function getInventories() {
  return (dispatch) => {
    dispatch(setLoadingInventories(true));
    axios
      .get(`${url}/products?status=avaiable&_sort=id&_order=desc`)
      .then((res) => {
        let data = res.data.map((inventory) => {
          return {
            id: inventory.id,
            date: inventory.date,
            name: inventory.name,
            serial: inventory.serial,
            stock: inventory.stock,
            category: inventory.category,
            price: inventory.price,
            status: inventory.status,
            edit: false
          }
        })
        dispatch(setInventories(data));
      })
      .catch((err) => console.log(err));
    dispatch(setLoadingInventories(false));
  };
}

export function saveInventory(data){
  return(dispatch) => {
    dispatch(setLoadingInventories(true))
    axios
      .post(`${url}/products`, data)
      .then(() => {
        dispatch(getInventories())
      })
      .catch(err => console.log(err))
    dispatch(setLoadingInventories(false))
  }
}

export function deleteItemInventory(data){
  return (dispatch) => {
    axios
      .put(`${url}/products/${data.id}`, data)
      .then(() => {
        dispatch(getInventories())
      })
      .catch(err => console.log(err))
  }
}