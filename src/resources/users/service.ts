import dbClient from "../../utils/database";
import { User } from "@prisma/client";
import { hash } from "bcrypt";

const create = async (newUser: User) => {
  // Grab user plaintext password
  const plaintext = newUser.password;

  // Hash it using bcrypt, it will return a PPOMISE!!!
  const hashedPassword = await hash(plaintext, 10);

  // Make sure to save the hashed paswword
  const savedUser = await dbClient.user.create({
    data: { ...newUser, password: hashedPassword },
  });

  return savedUser;
};

export default {
  ...dbClient.user,
  create,
  newUser,
};
