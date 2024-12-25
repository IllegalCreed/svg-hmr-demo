<template>
  <div class="header-root-container">
    <div></div>
    <img src="../assets/logo.png" width="200" style="position: absolute; top: 30px" />

    <div class="header-user-container">
      <el-switch v-model="isDark" class="swtich">
        <template #active-action>
          <IconDark class="active-icon"></IconDark>
        </template>
        <template #inactive-action>
          <IconLight class="active-icon"></IconLight>
        </template>
      </el-switch>
      <el-divider direction="vertical" style="margin: 0 15px; height: 25px" />
      <IconUser light-icon style="margin-right: 10px"></IconUser>
      <el-dropdown trigger="click" @command="handleCommand">
        <span v-if="token" class="user-text">欢迎，{{ userInfo.name }}</span>
        <span v-else class="user-text">尚未登录</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-if="token" command="changepwd">修改密码</el-dropdown-item>
            <el-dropdown-item v-if="token" command="mine">个人资料</el-dropdown-item>
            <el-dropdown-item v-if="token" command="logout" divided>退出登录</el-dropdown-item>
            <el-dropdown-item v-else command="login">登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-dialog v-model="dialogPwdVisible" title="修改密码" width="600">
      <div class="pwd-dialog">
        <el-form :model="userPwd" :rules="rules" ref="formRef" label-width="auto" style="width: 400px">
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input v-model="userPwd.oldPwd" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="userPwd.newPwd" type="password" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="重复密码" prop="repeatPwd">
            <el-input v-model="userPwd.repeatPwd" type="password" placeholder="请输入" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogPwdVisible = false">取消</el-button>
          <el-button type="primary" :loading="resetLoading" @click="handleResetPwd">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogInfoVisible" title="个人资料" width="600">
      <div class="pwd-dialog">
        <el-form :model="userInfo" label-width="auto" style="width: 400px">
          <el-form-item label="姓名:">
            {{ userInfo.name }}
          </el-form-item>
          <el-form-item label="性别:">
            {{ userInfo.sex === "0" ? "男" : "女" }}
          </el-form-item>
          <el-form-item label="电话:">
            {{ userInfo.phonenumber }}
          </el-form-item>
          <el-form-item label="邮箱:">
            {{ userInfo.email }}
          </el-form-item>
          <el-form-item label="单位:">
            {{ userInfo.company }}
          </el-form-item>
          <el-form-item label="部门:">
            {{ userInfo.dept }}
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogInfoVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogInfoVisible = false">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/modules/account";
import IconUser from "@/components/icons/IconUser.vue";
import IconLight from "@/components/icons/IconLight.vue";
import IconDark from "@/components/icons/IconDark.vue";
import { isDark } from "@/utils/color";
import type { FormInstance, FormRules } from "element-plus";
import { success } from "@/utils/messagebox";
import { reset, token } from "@/utils/token";

const resetLoading = ref(false);
const dialogPwdVisible = ref(false);
const dialogInfoVisible = ref(false);
const {
  logout,
  getUser: getUserAction,
  resetPwd: resetPwdAction,
} = useAccountStore();

const userPwd = ref({
  oldPwd: "",
  newPwd: "",
  repeatPwd: "",
});

const userInfo = ref({
  name: "",
  email: "",
  phonenumber: "",
  sex: "",
  company: "",
  dept: "",
});

onMounted(() => {
  // if (token.value) {
  //   getUserAction().then((res: any) => {
  //     userInfo.value = res;
  //   });
  // }
  getUserAction().then((res: any) => {
    userInfo.value = res;
  });
});

const formRef = ref<FormInstance>();
const validateNewPwd = (rule: any, value: any, callback: any) => {
  const regex =
    /^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{8,20}$/;
  if (!regex.test(userPwd.value.newPwd)) {
    callback(new Error("密码必须大于8位，且至少包含大小写字母数字及特殊字符"));
  } else {
    callback();
  }
};

const validateRepeatPwd = (rule: any, value: any, callback: any) => {
  if (userPwd.value.newPwd !== userPwd.value.repeatPwd) {
    callback(new Error("请保证两次输入的密码一致"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<any>>({
  oldPwd: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  newPwd: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { validator: validateNewPwd, trigger: "blur" },
  ],
  repeatPwd: [
    { required: true, message: "重复密码不能为空", trigger: "blur" },
    { validator: validateRepeatPwd, trigger: "blur" },
  ],
});

const handleCommand = (command: string) => {
  switch (command) {
    case "logout":
      logout();
      break;
    case "changepwd":
      dialogPwdVisible.value = true;
      break;
    case "mine":
      getUserAction().then((res: any) => {
        userInfo.value = res;
      });
      dialogInfoVisible.value = true;
      break;
    case "login":
      reset();
      break;
    default:
      break;
  }
};

async function handleResetPwd() {
  if (!formRef.value) return;
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      resetLoading.value = true;
      resetPwdAction(userPwd.value.oldPwd, userPwd.value.newPwd)
        .then(() => {
          userPwd.value.oldPwd = "";
          userPwd.value.newPwd = "";
          userPwd.value.repeatPwd = "";
          success("保存");
          dialogPwdVisible.value = false;
          resetLoading.value = false;
        })
        .catch(() => {
          resetLoading.value = false;
        });
    } else {
    }
  });
}
</script>

<style scoped>
.header-root-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  height: 80px;
  padding: 30px;
  background-color: var(--primary-color);
  color: var(--color-text-light);
  user-select: none;
  transition: all 0.2s !important;
  position: relative;
}

.header-user-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header-root-container :deep(.el-switch.is-checked .el-switch__core) {
  background-color: var(--el-switch-off-color);
  border-color: var(--el-switch-border-color, var(--el-switch-off-color));
}

.user-text {
  cursor: pointer;
  color: var(--color-text-light);
}

.user-text:hover {
  color: var(--el-color-primary-light-7);
}

.pwd-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
