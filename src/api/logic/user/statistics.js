/**
 * Created by ll on 2016/8/25.
 */
"use strict";

export default class extends  think.logic.base{

    _before(){
        console.log("logic_statistics_before");
    }

    postAction(){
        console.log("logic_statistics_post");
    }

    allSatisticsAction(){
        console.log("logic_statistics_allSatistics");
    }
}