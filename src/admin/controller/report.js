"use strict";
import  DataUtil from '../../util/data';
export default class extends  think.controller.rest{

    init(http){
        super.init(http);
        this._method = "_method"; //指定请求类型从 GET 参数 _method 里获取
    }

    /**
     * 获取平台运营报告
     */
    async getAction(){
        console.log(this.get());
        this.success();
    }


}



