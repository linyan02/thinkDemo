/**
 * Created by ll on 2016/9/18.
 */
"use strict";
import  DataUtil from '../../../util/data';
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
    async getAction() {
        let id = this.get("id"); //获取查询的标的信息
        let projectMessage = await this.model("bl_bid_plan").planDetail(id);
        let shareholders = await this.model("bl_bid_plan").planDetail(id);
        let leadTeam = await this.model("bl_bid_plan").planDetail(id);
        let otherMaterials = await this.model("bl_bid_plan").planDetail(id);
        let creditLevel = await this.model("bl_bid_plan").planDetail(id);
        let map=new Map();
        map.set("projectMessage",projectMessage);
        map.set("shareholders",shareholders);
        map.set("leadTeam",leadTeam);
        map.set("otherMaterials",otherMaterials);
        map.set("creditLevel",creditLevel);
        let returnData=await DataUtil.strMapToObj(map);
        return this.success(returnData);
    }
}



