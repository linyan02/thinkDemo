"use strict";
import  DataUtil from '../../util/data';
export default class extends  think.controller.rest{

    init(http){
        super.init(http);
        this._method = "_method"; //指定请求类型从 GET 参数 _method 里获取
    }

    /**
     * 获取首页banner图的方法
     */
    async getAction(){
        let data = await this.model("p2p_bannerlink").list();
        let returnData =await DataUtil.parsonData(data);
        this.success(returnData);
    }


}

