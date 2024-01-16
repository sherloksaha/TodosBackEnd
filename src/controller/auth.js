import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET_KEY;
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class UnAuthenticated extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
const prisma = new PrismaClient();

export const Home = async () => {};
export const getUser = (req) => {
  return {
    data: {
      ...req.auth.credentials,
      hasPasswordChange: req?.auth?.credentials?.hasPasswordChange,
    },
  };
};
export const UserLogIn = async (req, h) => {
  const payLoad = req.payload;
  const findUser = await prisma.user.findFirst({
    where: {
      username: payLoad.username,
    },
  });
  if (!findUser) {
    return h.response({ msg: "No User", ack: 0 }).code(401);
    // throw new NotFoundError("User Not Found....");
  }
  if (!findUser.isActive)
    return h.response({ msg: "User is not active", ack: 0 }).code(400);
  // const matchPass = bcrypt.compareSync(payLoad.passwords,findUser.passwords);
  const matchPass = String(payLoad.passwords) === String(findUser.passwords);

  if (!matchPass)
    return h.response({ message: "Wrong Password", ack: 0 }).code(500);
  if (!findUser?.hasPasswordChange) {
    return h.response({ data: "Need_to_change_password", ack: 0 }).code(200);
  }
  const token = jwt.sign(
    {
      id: findUser.uid,
    },
    SECRET,
    {
      expiresIn: 7 * 24 * 60 * 60,
    }
  );
  const { passwords, ...other } = findUser;
  return { ...other, token: token };
};

export const createTodoEveryOne = async (req, h) => {
  const isAdminU = await prisma.user.findFirst({
    where: {
      uid: Number(req.auth.credentials.id),
    },
  });
  if (!isAdminU) return h.response({ msg: "You User", ack: 0 }).code(200);
  if (!isAdminU.isAdmin) {
    if (isAdminU.uid !== req.payload.ownerId) {
      return h.response({ msg: "You are not permitted", ack: 0 }).code(200);
    }
  }
  const data1 = {
    desc: req.payload?.desc,
    title: req.payload?.title,
    isActive: req.payload?.isActive,
    lastDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: req.payload.uid
      ? Number(req.payload.uid)
      : Number(req.payload.ownerId),
  };

  try {
    await prisma.todos.create({
      data: {
        ...data1,
      },
    });
    return h.response({ msg: "created successfully", code: 200 }).code(200);
  } catch (e) {
    console.log("ee", e);
    throw Error({ msg: "Error" });
  }
};
export const userRegister = async (req) => {
  const userRegisterData = req.payload;
  const userExist = await prisma.user.findFirst({
    where: {
      username: userRegisterData.username,
    },
  });
  if (userExist) {
    throw Error({ msg: "Already Exist", code: "500" });
  }
  let many = false;
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(userRegisterData?.passwords, salt);

  const dataP = {
    FirstName: userRegisterData?.FirstName,
    LastName: userRegisterData?.LastName,
    email: userRegisterData?.email,
    passwords: userRegisterData?.passwords,
    isActive: userRegisterData?.isActive || true,
    isAdmin: userRegisterData?.isAdmin,
    username: userRegisterData?.username,
    hasPasswordChange: userRegisterData?.hasPasswordChange || false,
  };

  let userCreate;
  try {
    userCreate = await prisma.user.create({
      data: {
        ...dataP,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (e) {
    console.log(e);
  }
  // const created = await prisma.user.create({data:{...data,createdAt:createdAt}}) ;
  return { msg: "created successfully", code: 200 };
};

export const allUserPaginate = async (req) => {
  const userRegisterData = req.payload;
  const length = await prisma.user.findMany();
  try {
    const results = await prisma.user.findMany({
      skip:
        Number(userRegisterData.take) * (Number(userRegisterData?.page) - 1),
      take: Number(userRegisterData.take),
      where: {
        FirstName: {
          contains: userRegisterData.filterData || "",
        },
        isActive: userRegisterData.isActive,
      },
      include: {
        Todos: true,
      },
    });

    const resData =
      Number(Object.keys(length).length) / Number(req.payload.take);
    if (!results) throw Error({ msg: "Something is wrong", ack: 401 });
    return { data: results, TotalPage: Math.ceil(resData) };
  } catch (e) {
    console.log(e);
  }
};

export const getUsers = async (req, h) => {
  try {
    const findUser = await prisma.user.findMany({
      where: {
        isAdmin: false,
      },
    });
    if (findUser.length)
      return h.response({ data: findUser, ack: 1 }).code(200);
    return h.response({ mag: "error", ack: 0 }).code(400);
  } catch (e) {
    console.log(e);
  }
};
export const DeleteUser = async (req, h) => {
  if (!req.payload.id) {
    return h.response({ msg: "please send id", ack: 0 }).code(200);
  }
  if (req.auth.credentials.id == req.payload.id)
    return h.response({ msg: "Can not delete yourself", ack: 0 }).code(200);
  try {
    await prisma.User.delete({
      where: {
        uid: req.payload.id,
      },
    });
    return h.response({ msg: "Deleted", ack: 1 }).code(200);
  } catch (e) {
    console.log(e);
  }
};

export const UpddateUser = async (req, h) => {
  if (!req.payload.id) {
    return h.response({ msg: "please send id", ack: 0 }).code(200);
  }
  if (req.auth.credentials.id == req.payload.id)
    return h.response({ msg: "Can not change yourself", ack: 0 }).code(200);
  try {
    await prisma.User.update({
      where: {
        uid: req.payload.id,
      },
      data: {
        isActive: req.payload.isActive,
      },
    });
    return h.response({ msg: "Deactivated", ack: 1 }).code(200);
  } catch (e) {
    console.log(e);
  }
};

export const updatePass = async (req, h) => {
  if (!req.payload.passwords)
    return h.response({ msg: "please send password", ack: 0 }).code(400);
  if (!req.payload.username)
    return h.response({ msg: "please send username", ack: 0 }).code(400);
  const findUser = await prisma.user.findFirst({
    where: {
      username: req.payload.username,
    },
  });
  if (!findUser) return h.response({ msg: "No User", ack: 0 }).code(500);
  if (findUser.passwords !== req.payload.passwords)
    return h.response({ msg: "Pass does not match", ack: 0 }).code(400);
  try {
    let c = await prisma.User.update({
      where: {
        uid: findUser.uid,
      },
      data: {
        passwords: req.payload.npassword,
        hasPasswordChange: true,
      },
    });
  } catch (e) {
    console.log(e);
  }

  return h.response({ msg: "Password Updated..", ack: 1 }).code(200);
};
export const PieChartData = async (req, h) => {
  try {
    const tot = await prisma.user.count();
    const res = await prisma.user.count({
      where: {
        isActive: false,
      },
    });
    const workTot = await prisma.todos.count();
    const pending = await prisma.todos.count({
      where: {
        isActive: true,
      },
    });

    return h
      .response({
        totUser: tot,
        inActiveUser: res,
        totWork: workTot,
        pendingWork: pending,
        ack: 1,
      })
      .code(200);
  } catch (e) {
    console.log(e);
  }
};

export const CheckToken = (req, h) => {
  const token = req.headers.authorization;
  let remove= String(token).replace("Bearer ","");
  if (!token) return h.response({ msg: "No token" }).code(400);
  try {
    const decoded = jwt.verify(remove,SECRET);
    if(Date.now()>=decoded.exp*1000){
      return h.response({msg:"Token_Expired"}).code(200)
    }
    return h.response({msg:"All_OK"}).code(200)
  } catch (e) {
    console.log(e);
  }
};
