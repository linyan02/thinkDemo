
"use strict";

export default class extends  think.controller.rest{

    init(http){
        super.init(http);
        this._method = "_method"; //指定请求类型从 GET 参数 _method 里获取
    }

    async getAction(){
        await this.session('userInfo', '');
        console(this.success());
        return this.success();
    }
}


