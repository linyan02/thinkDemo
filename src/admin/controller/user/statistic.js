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
        let userId=0;
        let loginname="";
        let statisticsType= await this.get("type");
        let data="";
        if(statisticsType=="all"){//查询全部的信息
            data=await this.allSatisticsAction(userId);
        }else if(statisticsType=="account"){
            data =await this.accountSatisticsAction(userId,loginname);
        }else if( await statisticsType=="bid"){
            data =await this.dealStatistics(userId,loginname);
        }else if( statisticsType=="success"){

        } else if(statisticsType=="fail"){
            let limit= await this.post("limit");
            let page= await this.post("page");
            data=await this.statistics(userId,userInfo.loginname,limit,page);
        }else if( statisticsType=="back"){

        }else if( statisticsType=="finish"){

        }else{

        }
        // this.json(data)
        return this.success(data);
    }


    /**
     * 查询账户总览
     * @param userId
     * @returns {{availableMoney: *, coupon: *, integral: *, news: *}}
     */
    async   allSatisticsAction(userId){
        let news =  await this.model("oa_news_messagerinfo").countNews(userId,0);
        let investNu=await this.model("bl_fund_intent").incomeStatistics(userId);
        let quoteNu=0;
        let availableMoney=await this.model("bl_fund_intent").incomeStatistics(userId);
        let data = {"availableMoney": availableMoney, "investNu":investNu, "quoteNu":quoteNu , "news": news};
        return data;

    }
    /**
     * 查询资金信息
     * @param userId
     * @param loginname
     * @returns {{availableMoney: *, bidFreeze: *, investDueIn: *, debts: *, netAsset: Number}}
     */
    async accountSatisticsAction(userId,loginname){
        let acc = await this.model("ob_system_account").accountList({investmentPersonId:userId} );
        //投资冻结金额
        let frzeBid = await  this.model("invest_person_info").investStatistics(userId);
        let frzePlan=await  this.model("pl_managemoneyplan_buyinfo").investStatistics(userId);

        let bidFreeze=frzeBid.bidFrze+frzePlan.frzePlan;
        //代收投资总额
        let bidIncome=await  this.model("bp_fund_intent").incomeStatistics(userId);
        let planIncome=await  this.model("pl_mm_order_assigninterest").planStatistics(userId);
        let investDueIn=bidIncome.bidIncome+planIncome.planIncome;
        //代付借款金额
        let repayment=await  this.model("bp_fund_intent").fundStatistic(loginname);
        let netAsset=parseFloat((acc[0].availableMoney+bidFreeze+investDueIn-repayment.repayment).toFixed(2));
        let data = {"availableMoney":acc[0].availableMoney,
            "bidFreeze":bidFreeze,
            "investDueIn":investDueIn,
            "debts":repayment.repayment,
            "netAsset":netAsset}
        return data;

    }
}