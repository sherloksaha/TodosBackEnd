import { httpMethod } from "../config/constant.js";
import {
  UserLogIn,
  userRegister,
  getUser,
  createTodoEveryOne,
  allUserPaginate,
  DeleteUser,
  UpddateUser,
  updatePass,
  PieChartData,
  getUsers,
} from "../controller/auth.js";
import { completeTask, deleteTask, getTaskIndividual, getTodo } from "../controller/todos.js";

export const routes = [
  {
    path: "/user-details",
    method: httpMethod.GET,
    handler: getUser,
    options: {
      auth: {
        strategy: "jwt2",
      },
    },
  },
  {
    path: "/all-user-paginate",
    method: httpMethod.POST,
    handler: allUserPaginate,
    options: {
      auth: {
        strategy: "jwt",
      },
    },
  },
  {
    path: "/change-active",
    method: httpMethod.PUT,
    handler: UpddateUser,
    options: {
      auth: {
        strategy: "jwt",
      },
    },
  },
  {
    path: "/update-pass",
    method: httpMethod.PUT,
    handler: updatePass,
  },
  {
    path: "/delete",
    method: httpMethod.POST,
    handler: DeleteUser,
    options: {
      auth: {
        strategy: "jwt",
      },
    },
  },
  {
    path: "/get-task-all",
    method: httpMethod.GET,
    handler: getTodo,
    options: {
      auth: {
        strategy: "jwt",
      },
    },
  },
  {
    path: "/get-all-users",
    method: httpMethod.GET,
    handler: getUsers,
    options: {
      auth: {
        strategy: "jwt",
      },
    },
  },
  {
    path: "/get-task/{uid}",
    method: httpMethod.POST,
    handler: getTaskIndividual,
    options: {
      auth: {
        strategy: "jwt2",
      },
    },
  },
  {
    path: "/task-create",
    method: httpMethod.POST,
    handler: createTodoEveryOne,
    options: {
      auth: {
        strategy: "jwt2",
      },
    },
  },
  {
    path: "/user-login",
    method: httpMethod.POST,
    handler: UserLogIn,
  },
  {
    path: "/user-register",
    method: httpMethod.POST,
    handler: userRegister,
    options: {
      auth: {
        strategy: "jwt",
      },
    },
  },
  {
    path:"/complete-task",
    method:httpMethod.PUT,
    handler:completeTask
  },
  {
    path:"/delete-todo",
    method:httpMethod.POST,
    handler:deleteTask,
    options:{
      auth:{
        strategy:"jwt2"
      }
    }
  },
  {
    path:"/pie-chart-data",
    method:httpMethod.GET,
    handler:PieChartData,
    options:{
      auth:{
        strategy:"jwt"
      }
    }
  }
];
