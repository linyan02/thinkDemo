"use strict";
import  DataUtil from '../../../util/data';
import  page from '../../../util/page';
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
     * 获取我要投资的列表页数据
     */
    async getAction(){
        let planType=this.get("planType");//查询类型
        let start=this.get("start");//开始数
        let limit=this.get("limit");//查询结束数
        let page=  await page.countPage(start,limit);
        let returnData={};//返回参数
        if(planType=="public"){//查询公开的项目信息
            let datacount =await this.model("bl_bid_plan").publicIndexList();
            let data =await this.model("bl_bid_plan").publicIndexList(page,limit);
            returnData =await DataUtil.parsonData(data,datacount.length);
        }else if(planType=="personal"){//查询登录后推送信息
            let userInfo = await this.session('userInfo').valueOf();
            if(think.isEmpty(userInfo)){
                returnData="";
            }else{
                let  loginname = userInfo.loginname;
                let datacount =await this.model("bl_bid_plan").personIndexList(loginname);
                let data =await this.model("bl_bid_plan").personIndexList(loginname,page,limit);
                returnData =await DataUtil.parsonData(data,datacount.length);
            }
        }
        this.success(returnData);
    }


}



