
'use strict';
import Base  from './base';

export default class extends Base {
    //统计投资笔数
    incomeStatistics(id) {
        let data = this .where({
                isCheck: 0,
                isValid: 0,
                fundType: "loanInterest",
                investorsId:id
            }).Count(id);
        return data;
    }

}