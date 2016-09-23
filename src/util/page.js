/**
 * Created by ll on 2016/9/22.
 */
"use strict";
let page = {};

page.countPage=function(start,limit){
    let returnData;
    if(think.isEmpty(start)&&think.isEmpty(limit) ){
        returnData=0;
    }else{
        if(start===0){ //判断是否包含count属性
            returnData=1;
        }else if(start<0) {
            returnData=0;
        }else{
            returnData=(start/limit)+1;
        }
    }
    return returnData;
}



export default page;


