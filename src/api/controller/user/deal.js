/**
 * Created by ll on 2016/8/25.
 */

export default class  deal extends  think.controller.base{

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
}
