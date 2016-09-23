
'use strict';
import Base  from './baseModel';

export default class extends Base {

    /**
     * check password
     * @param  {[type]} userInfo [description]
     * @param  {[type]} password [description]
     * @return {[type]}          [description]
     */
    accountList(where){
        let data =this.alias("ob")
            .field("ob.id," +
                "ob.accountNumber," +
                "ob.investmentPersonId," +
                "ob.totalMoney," +
                "sum(case when capital.dealRecordStatus=7 then IFNULL(capital.payMoney,0) else 0 end) as frez," +
                "(IFNULL(ob.totalMoney,0) - sum(case when capital.dealRecordStatus=7 then IFNULL(capital.payMoney,0) else 0 end)) as availableMoney")
            .join({
                table: "ob_account_deal_info",
                join: "left",
                as: "account",
                on: ["id", "accountId"]
            })
            .where(where)
            .group("ob.id")
            .select();
        return data;
    }



}

