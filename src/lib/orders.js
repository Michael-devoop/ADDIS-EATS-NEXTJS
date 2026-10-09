export const orders = [
  {
    id: "order-demo-1",
    userId: "user-1",
    customerName: "Abebe Kebede",
    phone: "0911234567",
    address: "Bole Road, Addis Ababa",
    items: [
      { id: "d1", name: "Crispy Sambusa", price: 100, qty: 2 },
      { id: "d3", name: "Big Smokey Burger", price: 750, qty: 1 }
    ],
    status: "preparing",
    createdAt: Date.now() - 15000
  },
  {
    id: "order-demo-2",
    userId: "user-2",
    customerName: "Almaz Haile",
    phone: "0922334455",
    address: "Kazanchis, Addis Ababa",
    items: [
      { id: "d2", name: "Steak & Fries", price: 3000, qty: 1 }
    ],
    status: "received",
    createdAt: Date.now() - 5000
  }
];

export function getOrderStatus(order) {
  if (!order) return null;
  if (order.status === "cancelled") return "cancelled";
  const elapsed = Date.now() - (order.createdAt || Date.now());
  if (elapsed > 40000) return "delivered";
  if (elapsed > 20000) return "out_for_delivery";
  if (elapsed > 10000) return "preparing";
  return "received";
}

export function addOrder(order, user) {
  const newOrder = {
    id: `order-${Date.now()}`,
    userId: user?.id || user?.userId || "user-1",
    customerName: user?.name || order.customerName,
    phone: order.phone,
    address: order.address,
    items: order.items,
    status: "received",
    createdAt: Date.now(),
  };
  orders.push(newOrder);
  return newOrder;
}

export function findOrder(id) {
  const order = orders.find((o) => o.id === id);
  if (!order) return null;
  return {
    ...order,
    status: order.status === "cancelled" ? "cancelled" : getOrderStatus(order),
  };
}

export function getOrdersForUser(userId) {
  return orders
    .filter((o) => o.userId === userId)
    .map((o) => ({
      ...o,
      status: o.status === "cancelled" ? "cancelled" : getOrderStatus(o),
    }));
}

export function getAllOrdersForStaff() {
  return orders.map((o) => ({
    ...o,
    status: o.status === "cancelled" ? "cancelled" : getOrderStatus(o),
  }));
}

export function getOrders() {
  return getAllOrdersForStaff();
}