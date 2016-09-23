/**
 * Created by ll on 2016/8/22.
 */

'use strict';
import Base  from './baseModel';

export default class extends Base {
    //获取某个用户当前可用的优惠券个数
    countCoupon(id){
      return this.where({couponStatus: 5,belongUserId: id}).count("belongUserId");
    }

}
