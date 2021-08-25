import dbClient from "../../utils/database";
import { compare } from "bcrypt";
import { User } from "@prisma/client";

export const findUserWithValidation = async (userData: User) => {
  const foundUser = await dbClient.user.findUnique({
    where: { username: userData.username },
  });

  if (!foundUser) throw new Error("username/password incorrect");

  const isPasswordValid = await compare(userData.password, foundUser.password);

  if (!isPasswordValid) throw new Error("username/password incorrect");

  return foundUser;
};
