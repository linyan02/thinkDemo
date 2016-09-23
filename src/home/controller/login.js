'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    console.log('进入方法');
    //auto render template file index_index.html
    let data = this.post();
    console.log(this.get('userName'));
    console.log(data);
    let userName = data.userName;
    let pass = data.password;

    let password = think.md5(data.password);
    if(userName=='zhangsan' && password=='96e79218965eb72c92a549dd5a330112'){
      console.log('登录成功');
      return this.json({success:true,status:1,msg:"登录成功"});
    }else{
      return this.json({success:false,status:0,msg:"登录失败，账号或密码错误"});
    }
  }
}
