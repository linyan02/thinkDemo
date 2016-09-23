/**
 * Created by ll on 2016/8/23.
 */

'use strict';
import Base  from './baseModel';

export default class extends Base {

    /**
     * 获取某个用户某个状态下的借款笔数
     * @param loginname  用户登录名称
     * @param status 查询状态
     */
    countLoan(loginname,status){
        let data=this.alias("plan").where({
            receiverP2PaccountNumber:loginname,
            state:["IN",status]
        }).count();
    }

    countInvest(id,status){
        let data=this.alias("plan").join({
                    table:"pl_bid_info",
                     as:"info",
                    join:"right",
                    on:["bidId","bidId"],
                  }).where({
                    "userId":id,
                    "plan.state":7,
                    "info.state":2,
                     _complex:{
                         "info.newInvestPersonId":id,
                         _complex:{
                             "info.newInvestPersonId":null,
                             "info.userId ":id
                         },
                         _logic:"or"
                     }
                  }).count();
        return data;
    }

}