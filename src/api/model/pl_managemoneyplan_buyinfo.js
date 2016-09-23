/**
 * Created by ll on 2016/8/22.
 */
/**
 * Created by ll on 2016/8/22.
 */

'use strict';
import Base  from './baseModel';

export default class extends Base {

    investStatistics(id){
        let  data =this.alias("iif").field("Ifnull((SUM(iif.buyMoney) + SUM(iif.joinMoney)),0) as frzePlan ,count(*)  as frzePlanNo")
            .where({
                state:1,
                keystr:["NOTIN",["mmproduce","experience"]],
                investPersonId:id
            }).find();
        return data;
    }
    //待回款理财计划的笔数
    dueInPlan(id){
        let  data =this.alias("iif")
            .join({
                table:"pl_managemoney_plan",
                as:"plan",
                join:"left",
                on:["iif.mmplanId","plan.mmplanId"]
            })
            .where({
                "plan.state":["IN","2,7"],
                "iif.state":2,
                "iif.keystr":["NOTIN",["mmproduce","experience"]],
                investPersonId:id
            }).count();
        return data;
    }


}
