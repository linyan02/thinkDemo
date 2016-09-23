
"use strict";
import  DataUtil from '../../../util/data';
export default class extends  think.controller.rest{

    init(http){
        super.init(http);
        this._method = "_method"; //指定请求类型从 GET 参数 _method 里获取
    }

    async __before(){
        console.log("statistics_before");
        let userInfo = await this.session('userInfo').valueOf();
        if(think.isEmpty(userInfo)){
            return this.fail('USER_NOT_LOGIN');
        }

    }


    /**
     * 获取用户中心用户信息统计
     * {
     * "errno":0,   //返回码有：0，101，403
     *  "errmsg":"",
     * "data":{"availableMoney":1000,"coupon":1,"integral":100,"news":16}
     * }
     * @returns {*}
     */
    async postAction(){
        let userInfo = await this.session('userInfo').valueOf();
        let userId=userInfo.id;
        let statisticsType= await this.post("type");
        let data="";
        if(  statisticsType=="all"){
            data=await this.allSatisticsAction(userId);
        }else if(  statisticsType=="account"){
            data =await this.accountSatisticsAction(userId,userInfo.loginname);
        }else if( await statisticsType=="bid"){
            data =await this.dealStatistics(userId,userInfo.loginname);
        }else if( statisticsType=="profit"){

        } else if(statisticsType=="planList"){
            let limit= await this.post("limit");
            let page= await this.post("page");
            data=await this.statistics(userId,userInfo.loginname,limit,page);
        }else{

        }
       // this.json(data)
       return this.success(data);
    }

    async getAction(){
        console.log(this.get());
        let userInfo = await this.session('userInfo') || {};
        let userId=userInfo.id;
        console.log(think.isEmpty(userInfo));
        let statisticsType= await this.get("type");
        let data="";
        if(  statisticsType=="all"){
            data=await this.allSatisticsAction(userId);
        }else if(  statisticsType=="account"){
            data =await this.accountSatisticsAction(userId,userInfo.loginname);
        }else if( await statisticsType=="bid"){
            data =await this.dealStatistics(userId,userInfo.loginname);
        }else if( statisticsType=="profit"){

        } else if(statisticsType=="planList"){
            let limit= await this.get("limit");
            let page= await this.get("page");
            data=await this.statistics(userId,userInfo.loginname,limit,page);
        }else{

        }

        return this.success(data);
    }

    async putAction(){
        return this.success();
    }

    /**
     * 查询账户总览
     * @param userId
     * @returns {{availableMoney: *, coupon: *, integral: *, news: *}}
     */
    async   allSatisticsAction(userId){
        let coupon =  await this.model("bp_coupons").countCoupon(userId);
        let news =  await this.model("oa_news_messagerinfo").countNews(userId,0);
        let integral =  await this.model("bp_cust_member").customerField(userId,"score");
        let acc = await this.model("ob_system_account").accountList({investmentPersonId:userId} );
        let data = {"availableMoney": acc[0].availableMoney, "coupon":coupon, "integral":integral.score , "news": news};
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

    /**
     *
     * @param userId
     * @param loginname
     * @returns {{totalInvest: number, bidFreezeNu: *, investDueInNu: *, loanNu: *, debtNu: *}}
     */
    async  dealStatistics(userId,loginname){
        //投资冻结笔数
        let frzeBid = await  this.model("invest_person_info").investStatistics(userId);
        let frzePlan=await  this.model("pl_managemoneyplan_buyinfo").investStatistics(userId);
        let bidFreezeNu=frzeBid.frzeNo+frzePlan.frzePlan;
        //待回款的投资笔数
        let dueInBid = 1;//await  this.model("pl_bid_plan").countInvest(userId,[7]);
        let dueInPlan =1;//await this.model("pl_managemoneyplan_buyinfo").dueInPlan(userId);
        let investDueInNu=dueInBid+dueInPlan;
        //招标中借款笔数
        let loanNu = await  this.model("pl_bid_plan").countLoan(loginname,[1,2,6]);
        console.log(loanNu);
        //还款中借款笔数
        let debtNu = await  this.model("pl_bid_plan").countLoan(loginname,[7]);
        let data = {"totalInvest":1,
            "bidFreezeNu":bidFreezeNu,
            "investDueInNu":investDueInNu,
            "loanNu":loanNu,
            "debtNu":debtNu}
        return data;

    }

    async statistics(userId,loginname,limit,page) {
        let data = await this.model("ob_account_deal_info").accountList(userId, limit, page);
        let returnData =await DataUtil.parsonData(data);
      /*  if(data!=null){
            let page=await {
                "count": data.count,
                "totalPages": data.totalPages,
                "numsPerPage": data.numsPerPage,
                "currentPage": data.currentPage
            };
            let list=await data.data;
            returnData={
                "page":page,
                "data":list
            }

        }*/

        return  returnData;
    }
}


