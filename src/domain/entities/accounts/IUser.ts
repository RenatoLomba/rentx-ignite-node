interface IUser {
  id?: string;
  name: string;
  password: string;
  email: string;
  driver_license: string;
  isAdmin: boolean;
  avatar: string;
  created_at: Date;
}

export { IUser };
