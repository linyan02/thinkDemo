"use strict";

export default class extends  think.controller.rest{



    async before(){
        //this.model('bp_cust_member').fieldReverse("password,cardcode"); //隐藏 password 和 score 字段
    }

    async postAction(){
        //校验帐号和密码
        let data=this.post();
        console.log(data);
        let  result= await this.model("bp_cust_member").add(data);
        if(result){
            return this.success(result);
        }else{
            return this.fail();
        }
    }

    async getAction(){
       // let data=await this.model("webConfig/p2p_article").friendlinkListById();
       let data=await this.model("webConfig/p2p_friendlink").friendlinkListById();
        return this.success(data);
    }
}


