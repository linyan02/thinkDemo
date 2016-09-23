/**
 * Created by ll on 2016/8/22.
 */

'use strict';
import Base  from './baseModel';

export default class extends Base {

    investStatistics(id){
        let  data =this.alias("iinfo").field("ifnull(SUM(iinfo.investMoney),0) as bidFrze, count(iinfo.investMoney) as frzeNo")
            .join({
                table: "pl_bid_plan",
                join: "left",
                as: "pl",
                on: ["bidPlanId", "bidId"]
            }).where("pl.state IN (1, 2, 6, 4) and iinfo.investPersonId ="+id).find();
        return data;
    }


}