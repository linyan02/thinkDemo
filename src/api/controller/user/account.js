"use strict";

export default class extends  think.controller.rest{

    init(http){
        super.init(http);
        this._method = "_method"; //指定请求类型从 GET 参数 _method 里获取
    }

    async __before(){
        let userInfo = await this.session('userInfo') || {};
        if(think.isEmpty(userInfo)){
            return this.fail('USER_NOT_LOGIN');
        }

    }


    /**
     * 获取用户的资金账户信息
     * @returns {*}
     */
    async postAction(){
        let userInfo = await this.session('userInfo') || {};

        let userId=userInfo.id;
        console.log(userId);
        let userCount=this.model("ob_account_deal_info");
        let where={investPersonId:userId}
        let data=await userCount.accountList(where);
        return this.success(data);
    }

    async getAction(){
    }
}


