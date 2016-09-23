'use strict';
/**
 * 引入基础model，涵盖基础的查询方法
 */
import Base  from './baseModel';


export default class extends Base {

    /**
     * 检查密码是否正确
     * check password
     * @param  {[type]} userInfo [description]
     * @param  {[type]} password [description]
     * @return {[type]}          [description]
     */
    checkPassword(userInfo, password){
        console.log(password);
        let md5 = think.md5(password);
        console.log(md5);
        console.log(userInfo.password);
        return userInfo.password == md5;
    }

    customerField(id,field) {
       let customer= this.field(field).where({ id: id}).find();
        return customer;
    }
}
