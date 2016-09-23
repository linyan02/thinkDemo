/**
 * Created by ll on 2016/8/22.
 */

'use strict';
import Base  from './baseModel';

export default class extends Base {
    /**
     * 统计用户信息散标待还款总额
     */
    fundStatistic(id){
     let  data=this.alias("p").field("ifnull(sum(p.notMoney),0) as repayment")
                 .join({
                     table: "pl_bid_plan",
                     join: "left",
                     as: "pl",
                     on: ["bidPlanId", "bidId"]
                 }).where({
                     isCheck:0,
                     isValid:0,
                     fundType:["NOTIN",["principalLending"]],
                     receiverP2PAccountNumber:id

                 }).find();
        return  data;
    }
    //统计散标投资人待收收益总额
    incomeStatistics(id){
        let  data=this.alias("p").field("ifnull(sum(p.notMoney),0) as bidIncome")
            .join({
                table: "pl_bid_info",
                join: "left",
                as: "pl",
                on: ["orderNo", "orderNo"]
            }).where({
                isCheck:0,
                isValid:0,
                fundType:["IN",['principalRepayment', 'loanInterest']],
                _complex:{
                    newInvestPersonId:id,
                    _complex:{
                        userId:id,
                        newInvestPersonId:null
                    },
                    _logic: "or"
                }
            }) .find();
        return  data;
    }


}