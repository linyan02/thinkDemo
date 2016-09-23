/**
 * Created by ll on 2016/9/21.
 */


'use strict';
import Base  from './base';

export default class extends Base {
    //统计全部的收益金额(不论是否到账)
    incomeStatistics(id) {
        let data = this.alias("p").field("ifnull(sum(p.notMoney),0) as availableMoney")
            .where({
                isCheck: 0,
                isValid: 0,
                fundType: "loanInterest",
                investorsId:id
            }).find();
        return data;
    }

}