'use strict';

export default {
    USER_EXIST: [100, '用户已经存在'],
    USER_NO_PERMISSION: [101, '没有权限'],
    PARAMS_ERROR: [102, '参数错误'],
    DATA_EMPTY: [103, '数据不能为空'],
    ACCOUNT_ERROR: [104, '用户名或者密码错误'],
    UPLOAD_URL_ERROR: [109, 'URL参数不合法或者请求失败！'],
    UPLOAD_TYPE_ERROR: [109, '请求的资源不是一张图片'],
    ACCESS_ERROR: [112, '权限错误'],
    NOT_LOGIN: [115, '暂未登录'],
    ACTION_NOT_FOUND: [116, '暂无该路由'],
    ACCOUNT_FORBIDDEN: [119, '禁止登录'],
    USER_NOT_LOGIN: [403, '未登录'],
};