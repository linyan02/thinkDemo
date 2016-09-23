/**
 * Created by ll on 2016/9/18.
 */
"use strict";

export default class extends  think.controller.rest{

    init(http){
        super.init(http);
        this._method = "_method"; //指定请求类型从 GET 参数 _method 里获取
    }


    async before(){

    }

    async postAction(){

    }

    /**
     * 获取首页列表
     */
    async getAction(){
        console.log(this.get());
       /* let param=this.get("productKey");
        let limit=this.get("limit");
        let data =await this.model("bl_bid_plan").indexList(param,limit);
        let returnData =await DataUtil.parsonData(data);*/
        this.success();
    }


}



