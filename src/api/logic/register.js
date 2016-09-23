/**
 * Created by ll on 2016/8/26.
 */


export default class extends think.logic.base {
    postAction(){
        this.rules={
            loginname:"string|required",
            password:"string|required",
            score:"int|default:0"

        }
    }
}

