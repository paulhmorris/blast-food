export type Order = {
  id: string;
  guestId: string;
  createdAt: Date;
  completedAt?: Date;
};

export type Item = {
  id: string;
  name: string;
  price: string;
};

export type OrderItem = {
  id: string;
  orderId: string;
  itemId: string;
  quantity: number;
};

export type OrderWithGuestsAndOrderItems = (Order & {
  guest: Guest;
  orderItems: OrderItem[];
})[];

export type SelectedItem = Pick<Item, "id" | "name" | "price"> & {
  quantity: number;
};

export type Guest = {
  id: string;
  name: string | null;
};
