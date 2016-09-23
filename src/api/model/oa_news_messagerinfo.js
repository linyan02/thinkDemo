/**
 * Created by ll on 2016/8/22.
 */

'use strict';
import Base  from './baseModel';

export default class extends Base {
    /**
     * 获取当前用户某个消息状态下的消息总数
     * @param id   用户名
     * @param status  消息状态
     * @returns {*}
     */
    countNews(id,status){
        return this.where({readStatus: status,userId: id}).count("userId");
    }

}
