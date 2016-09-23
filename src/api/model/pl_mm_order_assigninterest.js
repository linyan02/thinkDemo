

'use strict';
import Base  from './baseModel';

export default class extends Base {
    //获取某个用户当前可用的优惠券个数
    planStatistics(id){
       let data =this.alias("pm").field("sum(pm.incomeMoney) as planIncome")
                  .where({
                      isCheck: 0,
                      isValid: 0,
                      fundType: ["IN",["principalRepayment","loanInterest"]],
                      factDate: null,
                      keystr:["NOTIN","mmproduce"],
                      investPersonId:id
                  }).find();
        return data;
    }

}
