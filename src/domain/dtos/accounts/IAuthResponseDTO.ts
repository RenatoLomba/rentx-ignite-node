interface IAuthResponseDTO {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export { IAuthResponseDTO };
