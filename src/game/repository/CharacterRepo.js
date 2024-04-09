
var CharacterRepo = {

    getMaxEvolveCount: function() {
        return characterData.length - 1;
    },

    getCharacterData: function(id, evolveCount) {

        let targetList = [];
        if (typeof(evolveCount) == 'undefined') {
            for (let dataList of characterData) {
                targetList = targetList.concat(dataList);
            }
        } else {
            targetList = characterData[evolveCount];
        }

        for (let data of targetList) {
            if (data.id == id) {
                return data;
            }
        }
        return null;
    },

    getEvolveCharacterData: function(targetEvolveCount, paramObj) {
        if (characterData.length <= targetEvolveCount) {
            return null;
        }

        let paramList = getParamList();

        // 最大ポイントの属性を探す
        let maxPoint = -1;
        let maxParamList = [];
        for (let param of paramList) {
            let point = paramObj[param];
            if (point < maxPoint) {
                continue;
            }
            if (point == maxPoint) {
                maxParamList.push(param);
                continue;
            }
            maxParamList = [];
            maxParamList.push(param);
            maxPoint = point;
        }

        // 最大ポイントが4以上ならその属性のレアキャラを抽選
        if (4 <= maxPoint) {
            let lotteryList = [];
            for (let param of maxParamList) {
                let rareParam = param + param;
                let charaList = this._getCharaFromParam(targetEvolveCount, rareParam, true);
                lotteryList = lotteryList.concat(charaList);
            }

            // 該当のキャラがいたら抽選
            if (0 < lotteryList.length) {
                let lotteryIdx = getRandomInt(0, lotteryList.length);
                let bingo = lotteryList[lotteryIdx];
                return bingo;
            }
        }

        // 最大ポイントの属性が単一ならその属性で抽選
        if (maxParamList.length == 1) {
            let param = maxParamList[0];
            let lotteryList = this._getCharaFromParam(targetEvolveCount, param, true);

            // 該当のキャラがいたら抽選
            if (0 < lotteryList.length) {
                let lotteryIdx = getRandomInt(0, lotteryList.length);
                let bingo = lotteryList[lotteryIdx];
                return bingo;
            }
        }

        // 最大ポイントの属性が複数
        if (1 < maxParamList.length) {
            // すべての組み合わせを集める
            let lotteryList = [];

            // 予め属性でキャラをまとめておく
            let paramCharaMap = {};
            let targetList = characterData[targetEvolveCount];
            for (let chara of targetList) {
                let distinctParam = getDistinctString(chara.param);
                // 単一キャラを外す
                if (distinctParam.length == 1) {
                    continue;
                }
                // レアキャラを外す
                if (1 < chara.param.length && distinctParam.length == 1) {
                    continue;
                }
                if (!paramCharaMap[distinctParam]) {
                    paramCharaMap[distinctParam] = [];
                }
                paramCharaMap[distinctParam].push(chara);
            }

            // ２文字繋がり以上の文字すべて検索
            let func = (nowParam, length, idx) => {

                nowParam += maxParamList[idx];

                // 規定の文字数になったのでキャラを検索
                if (nowParam.length == length) {

                    // 該当する属性のキャラを取得
                    let charaList = paramCharaMap[nowParam];
                    if (!charaList) {
                        return;
                    }

                    // 該当する属性のキャラを抽選対象に
                    lotteryList = lotteryList.concat(charaList);
                    return;
                }

                // ３文字以上の繰り返し（これ移行は文字を作りながら繰り返す）
                for (let k = idx + 1; k < maxParamList.length; k++) {
                    func(nowParam, length, k);
                }
            };

            // ２文字以上の文字数で繰り返し
            for (let len = 2; len <= maxParamList.length; len++) {
                // 最初の文字数で繰り返し
                for (let i = 0; i <= maxParamList.length - len; i++) {
                    let nowParam = maxParamList[i];
                    // 最小単位の２文字目で繰り返し
                    for (let j = i + 1; j <= maxParamList.length - len + 1; j++) {
                        func(nowParam, len, j);
                    }
                }
            }

            // 該当のキャラがいたら抽選
            if (0 < lotteryList.length) {
                let lotteryIdx = getRandomInt(0, lotteryList.length);
                let bingo = lotteryList[lotteryIdx];
                return bingo;
            }
        }

        // ここには来ないはずだけど
        let lotteryList = characterData[targetEvolveCount];
        let lotteryIdx = getRandomInt(0, lotteryList.length);
        let bingo = lotteryList[lotteryIdx];
        return bingo;
    },

    preload: function(id, onEnd) {

        let preloadList = this.getCharaImageList(id);
        cc.loader.load(preloadList, () => {
            onEnd();
        });
    },

    getCharaImageList: function(id) {
        let data = this.getCharacterData(id);
        if (data == null) {
            return [];
        }

        let list = [];
        for (let i = 0; i < data.imgCount; i++) {
            list.push(this._getCharaImageName(id, i));
        }
        return list;
    },

    _getCharaImageName: function(id, idx) {
        let fileName = id.substr(0, 2) == "05"
                        ? id + '_' + zeroPadding(idx + 1, 2)
                        : id + '_' + idx;
        let filePath = getImagePath(fileName, IMAGE_TYPE_CHARA)
        return filePath;
    },

    _getCharaFromParam(evolvoCount, param, isEqual) {

        let targetList = characterData[evolvoCount];

        let retList = [];
        for (let chara of targetList) {
            if (isEqual) {
                if (chara.param == param) {
                    retList.push(chara);
                }
            } else {
                if (getDistinctString(chara.param) == param) {
                    retList.push(chara);
                }
            }
        }
        
        return retList;
    }
};