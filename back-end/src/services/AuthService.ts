import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prismaClient from "../prisma";

interface AuthRequest {
  email: string;
  password: string;
}

interface Token {
  authorization: string
  id: string
}

class AuthService {
  async login({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error("E-mail ou senha invalidos");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new Error("E-mail ou senha invalidos");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "1d",
    });

    const { password: _, created_at, updated_at, cpf, telephone, ...userLogin} = user

    return {
      user: userLogin,
      token: token,
      message: "Usuário logado com sucesso"
    }
  }
}

export default AuthService;
