
'use strict';
/**
 * model  基础数据查询方法
 * 所有model都需要继承
 */
export default class extends think.model.base {

    //返回全部列表
    findAll(db,where){
        return this.model(db).where(where).select();
    }

    //返回特定记录
    findOne(db,where){
        return this.model(db).where(where).find();
    }

    //更新数据
    updateRecord(db,where,data){
        return this.model(db).where(where).update(data);
    }
    //添加数据
    addRecord(db,data){
        return this.model(db).add(data);
    }

    //删除数据
    deleteRecord(db,where){
        return this.model(db).where(where).delete();
    }


}
