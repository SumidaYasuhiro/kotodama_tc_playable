
var KotodamaRepo = {

    getRandomKotodamaData: function(evolveCount, count) {

        let dataList = this._getKotodamaList(evolveCount);
        if (dataList.length <= 0) {
            return NO_TEXT;
        }

        if (!count) {
            count = 1;
        }

        let retList = [];

        let idxList = [...Array(dataList.length).keys()];
        for (let i = 0; i < count; i++) {

            let lotteryIdx = getRandomInt(0, idxList.length);
            let dataidx = idxList[lotteryIdx];
            retList.push(dataList[dataidx]);

            idxList.splice(lotteryIdx, 1);
        }

        return retList;
    },

    getEvolvePreSerif: function(kotodamaData, param) {
        return kotodamaData.serif[param];
    },

    _getKotodamaList: function(evolveCount) {
        if (kotodamaData.length <= evolveCount) {
            return [];
        }
        return kotodamaData[evolveCount];
    }

};
