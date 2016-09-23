/**
 * Created by ll on 2016/9/18.
 */
"use strict";
export default class extends  think.controller.rest{

    init(http){
        super.init(http);
        this._method = "_method";
    }

    async getAction(){
        console.log(this.get());
        console.log(this.get("start"));
        console.log(this.get("limit"));
        return this.success();
    }
}