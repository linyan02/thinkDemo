"use strict";
module.exports = [

    //登录方法  post方法
    ["login","admin/user/login"],
    //退出登录方法 get方法
    ["logout","admin/user/logout"],


    /**  首页前五个产品列表查询方法
     *   其中limit可以不传值   （get ）
     *  时点存款    /api/plan/timePointSave/：limit
     *  保证金代存  /api/plan/depositInstead/：limit
     *  流贷/倒贷  /api/plan/continueLoan/：limit
     *  敞口待还   /api/plan/waitRepayment/：limit
     */
    [/^api\/plan\/(\w+?)(?:\/([\d,]*))?$/, "admin/capital/plan?productKey=:1&limit=:2"],

    /**
     * 首页票据列表查询方法
     */

    /**
     * 我要投资列表页查询方法
     * 公共推送list    /api/list/public/：start/:limit
     * 私有推送list    /api/list/personal/：start/:limit
     */
   [/^api\/list\/(\w+)\/(\d+)\/(\d+)$/, "admin/capital/list?start=:2&limit=:3&planType=:1"],
    /**
     * 我要投资详情页
     * 详情页   /api/item/：id
     */
    [/^api\/item\/(\d+)$/,"admin/capital/item?id=:1"],
    /**
     * 我要投资详情页
     * 详情页   /api/record/：id /:start/:limit  （登录后并且投资后才能出现结果集）
     */
    [/^api\/record\/(\d+)$/,"admin/capital/record?id=:1"],

    /**
     * 个人中心数据
     * /api/user/statistic/all  账户总览
     * /api/user/statistic/account  账户总览
     */
    //账户总览
    ["api/user/statistic/all", "admin/user/statistic?statisticsType=all"],
    //账户统计
    ["api/user/statistic/account", "admin/user/statistic?statisticsType=account"],
    //我的投资中---投资中
    ["api/user/statistic/bid/:start/:limit", "admin/user/statistic?statisticsType=bid"],
    //我的投资中---已确认
    ["api/user/statistic/success/:start/:limit", "admin/user/statistic?statisticsType=success"],
    //我的投资中---投资失败
    ["api/user/statistic/fail/:start/:limit", "admin/user/statistic?statisticsType=fail"],
    //我的投资中---回款中
    ["api/user/statistic/back/:start/:limit", "admin/user/statistic?statisticsType=back"],
    //我的投资中---已结清
    ["api/user/statistic/finish/:start/:limit", "admin/user/statistic?statisticsType=finish"],

    /**
     * 我的消息数据
     */

    //消息列统计
    ["api/user/news/statistic", "admin/user/news?type=statistic"],
     //消息列表
    ["api/user/news/:start/:limit", "admin/user/news"],
    //查看消息信息
    ["api/user/news/:id", "admin/user/news"]

    //运营报告
    ["report", "admin/"]














];
