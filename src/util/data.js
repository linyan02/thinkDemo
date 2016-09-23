"use strict";
let DataUtil = {};

DataUtil.parsonData=function(data){
    let returnData;
    if(think.isEmpty(data)){
        returnData=data;
    }else{
        if(data.propertyIsEnumerable("count")){ //判断是否包含count属性
            returnData={
                iTotalRecords:data.count,
                data:data.data
            }
        }else{
            returnData=data;
        }
    }
    return returnData;
}
//map转换为对象
DataUtil.strMapToObj=function(strMap){
    let obj= Object.create(null);
    for (let[k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

//map转换为json
DataUtil.strMapToObj=function(strMap){
    return JSON.stringify(DataUtil.strMapToObj(strMap));
}

DataUtil.format=function(data,format){

}

export default DataUtil;

