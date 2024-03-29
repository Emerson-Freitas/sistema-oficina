import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prismaClient from "../prisma";
import dotenv from 'dotenv'
dotenv.config()

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
      },
      include: {
        role: {
          select: {
            name: true
          }
        }
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
      expiresIn: "30d",
    });

    const { password: _, created_at, updated_at, cpf, telephone, role_id, ...userLogin} = user

    return {
      user: userLogin,
      token: token,
      message: "Usuário logado com sucesso"
    }
  }
}

export default AuthService;
