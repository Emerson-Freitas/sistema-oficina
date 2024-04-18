import UserService from "../../../services/UserService";

jest.mock("../../../services/UserService")

const userTest = {
  name: "emerson",
  cpf: "111.222.333-44",
  telephone: "19997230777",
  email: "emerson_teste@gmail.com",
  password: "teste",
  role_id: "36a664f4-3f50-4575-b96b-c4f74b91f5ce"
};

jest.mock("../../../services/UserService", () => {
  return jest.fn().mockImplementation(() => ({
    createUser: jest.fn(),
  }));
});

const userService = new UserService()

describe("Create User", () => {
  // it("should throw an error if the NAME is not provided", async () => {
  //   const name = "";
  //   const { cpf, telephone, email, password, role_id } = userTest;
  //   const user = await userService.createUser({ name, cpf, telephone, email, password, role_id });
  //   console.log("user>>>>", user)
  //   await expect(user).rejects.toThrow("O nome do usuário é obrigatório");
  // });

  it("should be able to create a new user", async () => {
    const mockCreateUser = jest.fn();
    (userService.createUser as jest.Mock).mockImplementation(mockCreateUser);

    const { name, cpf, telephone, email, password, role_id } = userTest;
    await userService.createUser({ name, cpf, telephone, email, password, role_id });
    expect(mockCreateUser).toHaveBeenCalledWith({ name, cpf, telephone, email, password, role_id });
  });
});
