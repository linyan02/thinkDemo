
"use strict";

export default class extends  think.controller.rest{

    init(http){
        super.init(http);
        this._method = "_method"; //ָ���������ʹ� GET ���� _method ���ȡ
    }

    async getAction(){
        await this.session('userInfo', '');
        console(this.success());
        return this.success();
    }
}


