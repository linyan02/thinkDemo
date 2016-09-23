
"use strict";
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {

    /**
     * login
     * @return {} []
     */
    loginAction(){
        this.allowMethods = 'get,post';
        if(this.isGet()){
            return;
        }
        /*this.rules = {

        }*/
    }
}