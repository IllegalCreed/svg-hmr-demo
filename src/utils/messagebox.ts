export function warning(content: string, resolve: () => void, title: string = "系统提示", reject?: () => void) {
    ElMessageBox.confirm(content, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    }).then(() => {
        resolve();
    }).catch(() => {
        reject?.();
    });
}

export function hint(content: string, resolve: () => void, reject?: () => void) {
    ElMessageBox.confirm(content)
        .then(() => {
            resolve();
        })
        .catch(() => {
            reject?.();
        });
}

export function closeHint(resolve: () => void) {
    hint("确定关闭吗?", resolve);
}

export function success(content: string, defaultSuccess: boolean = true) {
    ElMessage({
        message: `${content}${defaultSuccess ? '成功' : ''}`,
        type: "success",
    });
}