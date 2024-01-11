import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const validate = async ({ id }, request, h) => {
  const user = await prisma.user.findFirst({
    where: {
      uid: id,
    },
  });

  if (!user?.isAdmin) {
    return {
      credentials: {
        id: user.uid,
        isAdmin: user.isAdmin,
        Name: user?.FirstName + " " + user?.LastName,
        hasPasswordChange: user?.hasPasswordChange,
      },
      isValid: false,
    };
  }
  return {
    credentials: {
      id: user.uid,
      isAdmin: user.isAdmin,
      Name: user?.FirstName + " " + user?.LastName,
      hasPasswordChange: user?.hasPasswordChange,
    },
    isValid: true,
  };
};

export const validate2 = async ({ id }, request, h) => {
  const user = await prisma.user.findFirst({
    where: {
      uid: id,
    },
  });
  if (!user) {
    return {
      isValid: false,
    };
  }


  return {
    credentials: {
      id: user.uid,
      isAdmin: user.isAdmin,
      Name: user?.FirstName + " " + user?.LastName,
      hasPasswordChange: user?.hasPasswordChange,
    },
    isValid: true,
  };
};