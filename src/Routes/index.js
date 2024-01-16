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
  CheckToken,
} from "../controller/auth.js";
import { SchemaR } from "../Validation/register.js";
import {
  completeTask,
  deleteTask,
  getTaskIndividual,
  getTodo,
} from "../controller/todos.js";
import Joi from "joi";
import { SchemaT } from "../Validation/task.js";

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
      validate: {
        payload: Joi.object({
          desc: Joi.string().max(40).min(10).required(),
          title: Joi.string().min(10).max(20).required(),
        }),
        failAction(request, h, err) {
          request.log("error", err);
          throw err;
        },
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
      validate: {
        payload: Joi.object({
          FirstName: Joi.string().max(10).min(2).required(),
          LastName: Joi.string().min(2).max(10).required(),
          email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "in", "info"] },
          }),
          username: Joi.string().min(5).max(20).required(),
          passwords: Joi.string().min(8).max(15).required(),
        }),
        failAction(request, h, err) {
          request.log("error", err);
          throw err;
        },
      },
    },
  },
  {
    path: "/complete-task",
    method: httpMethod.PUT,
    handler: completeTask,
  },
  {
    path: "/delete-todo",
    method: httpMethod.POST,
    handler: deleteTask,
    options: {
      auth: {
        strategy: "jwt2",
      },
    },
  },
  {
    path: "/pie-chart-data",
    method: httpMethod.GET,
    handler: PieChartData,
    options: {
      auth: {
        strategy: "jwt",
      },
    },
  },
  {
    path: "/check-token",
    method: httpMethod.GET,
    handler: CheckToken,
    
  }
  
];
