import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodo = async (req, h) => {
  const todos = await prisma.Todos.findMany();
  return h.response({ data: todos }).code(200);
};

export const getTaskIndividual = async (req, h) => {
  if (!req.params.uid)
    return h.response({ msg: "no id found", ack: 0 }).code(400);
  try {
    const todos = await prisma.Todos.findMany({
    skip: Number(req.payload.take) * (Number(req.payload.page) - 1),
    take: Number(req.payload.take),
      where: {
        ownerId: Number(req.params.uid),
        isActive: req.payload.isActive,
      },
    });
    const resData = Number(Object.keys(todos).length) / Number(req.payload.take);
    return h.response({ data: todos,TotalPage: Math.ceil(resData) }).code(200);
  } catch (e) {
    console.log(e);
  }
};

export const completeTask = async (req, h) => {
  if (!req.payload.tid)
    return h.response({ msg: "please send Id", ack: 0 }).code(400);
  const findTodo = await prisma.Todos.findFirst({
    where: {
      tid: req.payload.tid,
    },
  });
  if (!findTodo) return h.response({ msg: "No Task", ack: 0 }).code(500);

  let c = "";
  try {
    c = await prisma.Todos.update({
      where: {
        tid: findTodo.tid,
      },
      data: {
        isActive: false,
      },
    });
  } catch (e) {
    console.log(e);
  }
  return h.response({ msg: "Mark Completed..", ack: 1 }).code(200);
};

export const deleteTask = async (req, h) => {
  const userD = req.auth.credentials;
  console.log("uuuuuusssseeerrrr",userD)
  const deleteFunc = async(id)=>{
    console.log("inside ",id)
    try{
       let d = await prisma.Todos.delete({
        where: {
            tid: String(id),
          }
    })
    return h.response({ msg: "Task Deleted", ack: 1 }).code(200);
    }
    catch(e){
      console.log(e)
    }
  }
 
 
  if(!userD.isAdmin){
    try{
      const findData = await prisma.Todos.findFirst({
        where: {
          AND: [
            {
              ownerId: userD.id
            },
            { tid:  req.payload.tid},
          ],
        },
      })
      console.log("FindDatatatatatatatatata",findData)
      if(findData.ownerId==userD.id){
        return await deleteFunc(req.payload.tid)
      }
      else{
        return h.response({msg:"You are not permitted",ack:0}).code(200)
      }
    }catch(e){
      console.log(e)
    }
  }
  if(userD.isAdmin){
    return await deleteFunc(req.payload.tid)
  }
  else {
    return h.response({msg:"Something is wrong",ack:0}).code(500)
  }
  
  
  
  // if (!req.payload.tid)
  //   return h.response({ msg: "please send task Id", ack: 0 }).code(400);
  // if (!req.payload.uid)
  //   return h.response({ msg: "please send user Id", ack: 0 }).code(400);
  // const findTodo = await prisma.Todos.findFirst({
  //   where: {
  //     tid: req.payload.tid,
  //   },
  // });
  // if (req.auth.credentials.id == findTodo.ownerId) {
  //   try {
        
  //   } catch (e) {
  //     console.log(e);
  //   }
  // } else {
    
  // }
};
