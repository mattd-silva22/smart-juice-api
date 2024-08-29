export type TUser = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
};
