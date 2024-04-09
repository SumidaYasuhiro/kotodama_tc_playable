
function getParamObj(param) {

    let ret = getEmptyParamObj();

    for (let i = 0; i < param.length; i++) {
        let paramOne = param.substr(i, 1)
        ret[paramOne] += 1;
    }

    return ret;
}

function getEmptyParamObj() {
    let ret = {};
    ret[PARAM_L] = 0;
    ret[PARAM_D] = 0;
    ret[PARAM_M] = 0;
    ret[PARAM_Y] = 0;
    ret[PARAM_C] = 0;
    return ret;
}

function getParamList() {
    // 順番を入れ替えないこと
    return [ PARAM_L, PARAM_D, PARAM_M, PARAM_Y, PARAM_C ];
}

function mergeParamObj(obj1, obj2) {

    let ret = getEmptyParamObj();
    let merge = (key) => {
        ret[key] = obj1[key] + obj2[key];
    };

    merge(PARAM_L);
    merge(PARAM_D);
    merge(PARAM_M);
    merge(PARAM_Y);
    merge(PARAM_C);

    return ret;
}