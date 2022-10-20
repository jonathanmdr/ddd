import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Jonathan Medeiros");
const address = new Address("Rua projetada", 2, "85.440-000", "Ubiratã");
customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "1", "item 1", 10, 1);
const item2 = new OrderItem("2", "2", "item 2", 15, 2);
const order = new Order("1", "123", [item1, item2]);