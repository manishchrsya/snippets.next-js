import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

db.snippet.create({
  data: {
    title: "Title",
    code: "const abc = () => {}",
  },
});

db.user.create({
  data: {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password",
  },
});
