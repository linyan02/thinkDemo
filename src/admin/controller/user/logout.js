
"use strict";

export default class extends  think.controller.rest{

    init(http){
        super.init(http);
        this._method = "_method";
    }

    async getAction(){
        await this.session('userInfo', '');
        return this.success();
    }
}


