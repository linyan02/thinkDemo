"use strict";

export default class extends  think.controller.rest{

    init(http){
        super.init(http);
        this._method = "_method"; //指定请求类型从 GET 参数 _method 里获取
    }


    async before(){
        this.model('bp_cust_member').fieldReverse("password,cardcode"); //隐藏 password 和 score 字段
    }

    async postAction(){
        //校验帐号和密码
        let username = this.post('username');
        let userModel = this.model('bp_cust_member');
        let userInfo = await userModel.where({loginname: username}).find();
        if(think.isEmpty(userInfo)){
            return this.fail('ACCOUNT_ERROR');
        }
        //校验密码
        let password = this.post('password');
        if(!userModel.checkPassword(userInfo, password)){
            return this.fail('ACCOUNT_ERROR');
        }
        await this.session('userInfo', userInfo);
        return this.success(userInfo);
    }

}

