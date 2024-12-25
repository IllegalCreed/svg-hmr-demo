import { defineStore } from "pinia";
import {
  logoutAPI,
  loginAPI,
  loginWithSTAPI,
  getCodeAPI,
  getAPI,
  resetPwdAPI,
} from "@/api/account";
import { token,CASlogout } from "@/utils/token";

export const useAccountStore = defineStore("account", () => {
  const login = (loginForm: LoginForm): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      loginAPI(loginForm)
        .then((res: any) => {
          token.value = res.token;
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const loginWithST = (st: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      loginWithSTAPI(st)
        .then((res: any) => {
          token.value = res.data;
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const logout = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      logoutAPI()
        .then(() => {
          token.value = '';
          resolve();
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          CASlogout();
        });
    });
  };

  const getCode = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      getCodeAPI()
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {});
    });
  };

  const getUser = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      getAPI()
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const resetPwd = (oldPwd: string, newPwd: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      resetPwdAPI(oldPwd, newPwd)
        .then(() => {
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  return { login, logout, getCode, getUser, resetPwd, loginWithST };
});
