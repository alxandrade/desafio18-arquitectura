import { orderEmail } from "../utils/nodemailer.js";
import { orderService } from "../services/index.service.js";
import { cartService } from "../services/index.service.js";

const getAll = (req, res) => {};

const getById = async (req, res) => {
  try {    
    const order = await orderService.getById(req.params.id)
    res.render("pages/checkout", { order });
  } catch (error) {
    loggerApp.error(error);
  }
};

const create = async (req, res) => {
  let products = await cartService.getById(req.user.cart_id);
  const total = products.products.reduce((item, _item) => {
    return item + _item.price;
  }, 0);
  const order = await orderService.createOrder(req, products, total);
  if (order) {
    orderEmail(req.user, order);    
  }
  res.redirect(`/api/order/${order._id}`);
};

const deleteById = (req, res) => {};

const deleteAll = (req, res) => {};

const updateById = (req, res) => {};

export default { getAll, getById, create, deleteById, deleteAll, updateById };
