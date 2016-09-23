//用户登录方法过滤
export default class extends think.logic.base {

         postAction(){
             this.rules={
                 loginname:"string|required",
                 password:"string|required"
             }
         }
}
