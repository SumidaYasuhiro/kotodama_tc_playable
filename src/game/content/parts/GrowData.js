
var GrowData = function() {

    return {
        charaList: [],
        kotodamaList: [],

        getLastCharaData: function() {
            return this.charaList[this.charaList.length - 1];
        },

        getLastKotodamaData: function() {
            return this.kotodamaList[this.kotodamaList.length - 1];
        },

        getParamObj: function() {

            let paramObj = getEmptyParamObj();

            for (let kotodama of this.kotodamaList) {
                let now = getParamObj(kotodama.param);
                paramObj = mergeParamObj(paramObj, now);
            }

            return paramObj;
        }
    }
};