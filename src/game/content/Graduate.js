
var Graduate = cc.Node.extend({

    _header: null,

    _topNode: null,
    _type: null,
    _name: null,
    _memo: null,
    _favoriteWord: null,

    _chartDraw: null,
    _chartLabelMap: {},
    _chartMaxPosMap: {},
    _chartNumSpriteMap: {},

    _lastBtn: null,

    _growData: null,
    
    ctor: function() {
        cc.Node.prototype.ctor.call(this);
        Graduate.prototype.init.call(this);
    },

    init: function() {
        
        this._makeUi();
    },

    onUpdate: function() {
    },

    show: function(growData) {
        this._setChara(growData.getLastCharaData(), growData.getLastKotodamaData());

        this._topNode.setOpacity(0);
        this._topNode.setVisible(true);

        let actionList = [];

        actionList.push(cc.DelayTime.create(1));
        actionList.push(cc.CallFunc.create(() => {
            this._header.setOpacity(0);
            this._header.setVisible(true);
            this._header.runAction(cc.FadeTo.create(1, 255));
        }));
        actionList.push(cc.FadeTo.create(1, 255));
        actionList.push(cc.CallFunc.create(() => {
            this._makeChart(growData.getParamObj());
        }));
        actionList.push(cc.DelayTime.create(2));
        actionList.push(cc.CallFunc.create(() => {
            this._lastBtn.setVisible(true);
        }));
        
        let actionSeq = cc.Sequence.create(actionList);
        this._topNode.runAction(actionSeq);
    },

    _makeUi: function() {

        this._header = SpriteAnime.create([
            makeSprite(getImagePath("graduate_header_1", IMAGE_TYPE_UI_GRADUATE)),
            makeSprite(getImagePath("graduate_header_2", IMAGE_TYPE_UI_GRADUATE)),
            makeSprite(getImagePath("graduate_header_3", IMAGE_TYPE_UI_GRADUATE))
        ], 0.1);
        this._header.setCascadeOpacityEnabled(true);
        this._header.setPosition(getCenterDiff(0, 600));
        this._header.setVisible(false);
        this.addChild(this._header);

        this._topNode = cc.Node.create();
        this._topNode.setPosition(getCenterDiff(0, 75));
        this._topNode.setCascadeOpacityEnabled(true);
        this._topNode.setVisible(false);
        this.addChild(this._topNode);

        const SEN1_WIDTH = 256;

        let frame = makeSprite(getImagePath("ahikei_sozai", IMAGE_TYPE_UI_GRADUATE));
        this._topNode.addChild(frame);

        // キャラ名の黄色線
        let sen1_1 = makeSprite(getImagePath("sen_01", IMAGE_TYPE_UI_GRADUATE), cc.p(0, 350));
        sen1_1.setScale(500 / SEN1_WIDTH, 2);
        this._topNode.addChild(sen1_1);

        // キャラ名
        this._name = makeLabel("", 60, cc.p(0, 370));
        this._topNode.addChild(this._name);

        // 属性アイコン
        this._type = cc.Node.create();
        this._type.setPosition(0, 305);
        this._type.setCascadeOpacityEnabled(true);
        this._topNode.addChild(this._type);

        // チャート画像
        let chartSpr = makeSprite(getImagePath("raddar", IMAGE_TYPE_UI_GRADUATE), cc.p(120, 120));
        this._topNode.addChild(chartSpr);
        
        // チャートの親
        this._chartDraw = cc.DrawNode.create();
        this._topNode.addChild(this._chartDraw);

        // チャートテキストL
        let chartTextL = makeSprite(getImagePath("chart_text_L", IMAGE_TYPE_UI_GRADUATE), cc.p(120, 263));
        this._topNode.addChild(chartTextL);

        // チャートアイコンL
        let chartIconL = makeSprite(getImagePath("Zokusei_icon_01", IMAGE_TYPE_UI_GRADUATE), Graduate.chartMaxPosMap[PARAM_L]);
        chartIconL.setScale(0.75);
        this._topNode.addChild(chartIconL);

        // チャート文字L
        let chartNumL = cc.Sprite.create();
        chartNumL.setPosition(120, 230);
        this._topNode.addChild(chartNumL);
        this._chartNumSpriteMap[PARAM_L] = chartNumL;

        // チャートテキストD
        let chartTextD = makeSprite(getImagePath("chart_text_D", IMAGE_TYPE_UI_GRADUATE), cc.p(243, 172));
        this._topNode.addChild(chartTextD);

        // チャートアイコンD
        let chartIconD = makeSprite(getImagePath("Zokusei_icon_04", IMAGE_TYPE_UI_GRADUATE), Graduate.chartMaxPosMap[PARAM_D]);
        chartIconD.setScale(0.75);
        this._topNode.addChild(chartIconD);

        // チャート文字D
        let chartNumD = cc.Sprite.create();
        chartNumD.setPosition(243, 140);
        this._topNode.addChild(chartNumD);
        this._chartNumSpriteMap[PARAM_D] = chartNumD;

        // チャートテキストM
        let chartTextM = makeSprite(getImagePath("chart_text_M", IMAGE_TYPE_UI_GRADUATE), cc.p(210, 10));
        this._topNode.addChild(chartTextM);

        // チャートアイコンM
        let chartIconM = makeSprite(getImagePath("Zokusei_icon_05", IMAGE_TYPE_UI_GRADUATE), Graduate.chartMaxPosMap[PARAM_M]);
        chartIconM.setScale(0.75);
        this._topNode.addChild(chartIconM);

        // チャート文字M
        let chartNumM = cc.Sprite.create();
        chartNumM.setPosition(210, -20);
        this._topNode.addChild(chartNumM);
        this._chartNumSpriteMap[PARAM_M] = chartNumM;

        // チャートテキストY
        let chartTextY = makeSprite(getImagePath("chart_text_Y", IMAGE_TYPE_UI_GRADUATE), cc.p(-3, 172));
        this._topNode.addChild(chartTextY);

        // チャートアイコンY
        let chartIconY = makeSprite(getImagePath("Zokusei_icon_03", IMAGE_TYPE_UI_GRADUATE), Graduate.chartMaxPosMap[PARAM_Y]);
        chartIconY.setScale(0.75);
        this._topNode.addChild(chartIconY);

        // チャート文字Y
        let chartNumY = cc.Sprite.create();
        chartNumY.setPosition(-3, 140);
        this._topNode.addChild(chartNumY);
        this._chartNumSpriteMap[PARAM_Y] = chartNumY;

        // チャートテキストC
        let chartTextC = makeSprite(getImagePath("chart_text_C", IMAGE_TYPE_UI_GRADUATE), cc.p(30, 10));
        this._topNode.addChild(chartTextC);

        // チャートアイコンC
        let chartIconC = makeSprite(getImagePath("Zokusei_icon_02", IMAGE_TYPE_UI_GRADUATE), Graduate.chartMaxPosMap[PARAM_C]);
        chartIconC.setScale(0.75);
        this._topNode.addChild(chartIconC);

        // チャート文字C
        let chartNumC = cc.Sprite.create();
        chartNumC.setPosition(30, -20);
        this._topNode.addChild(chartNumC);
        this._chartNumSpriteMap[PARAM_C] = chartNumC;

        // 概要の黄色線
        let sen1_2 = makeSprite(getImagePath("sen_01", IMAGE_TYPE_UI_GRADUATE), cc.p(-160, -65));
        sen1_2.setScale(180 / SEN1_WIDTH, 1.5);
        this._topNode.addChild(sen1_2);

        // メモ（タイトル）
        let memo = makeLabel(GRADUATE_MEMO, 34, cc.p(-170, -50), cc.color(255, 160, 0));
        this._topNode.addChild(memo);

        // メモの黒線
        let sen2_1 = makeSprite(getImagePath("sen_02", IMAGE_TYPE_UI_GRADUATE), cc.p(0, -130));
        this._topNode.addChild(sen2_1);
        // メモの黒線
        let sen2_2 = makeSprite(getImagePath("sen_02", IMAGE_TYPE_UI_GRADUATE), cc.p(0, -180));
        this._topNode.addChild(sen2_2);
        // メモの黒線
        let sen2_3 = makeSprite(getImagePath("sen_02", IMAGE_TYPE_UI_GRADUATE), cc.p(0, -230));
        this._topNode.addChild(sen2_3);

        // メモ（本文）
        this._memo = makeLabel(
            "",
            30,
            cc.p(-244,-90),
            cc.color(142, 66, 66),
            cc.size(500, 250),
            cc.TEXT_ALIGNMENT_LEFT,
            cc.VERTICAL_TEXT_ALIGNMENT_TOP
        );
        this._memo.setLineHeight(50);
        this._memo.setAnchorPoint(cc.p(0, 1));
        this._topNode.addChild(this._memo);

        // 好きな言葉の黄色線
        let sen1_3 = makeSprite(getImagePath("sen_01", IMAGE_TYPE_UI_GRADUATE), cc.p(-130, -315));
        sen1_3.setScale(250 / SEN1_WIDTH, 1.5);
        this._topNode.addChild(sen1_3);

        // 好きな言葉（タイトル）
        let favoriteWord = makeLabel(GRADUATE_FAVORITE, 34, cc.p(-140, -300), cc.color(255, 160, 0));
        this._topNode.addChild(favoriteWord);

        // 好きな言葉の黒線
        let sen2_4 = makeSprite(getImagePath("sen_02", IMAGE_TYPE_UI_GRADUATE), cc.p(0, -380));
        this._topNode.addChild(sen2_4);

        // 好きな言葉（本文）
        this._favoriteWord = makeLabel(
            "",
            30,
            cc.p(-230,-340),
            cc.color(142, 66, 66),
            cc.size(500, 250),
            cc.TEXT_ALIGNMENT_LEFT,
            cc.VERTICAL_TEXT_ALIGNMENT_TOP
        );
        this._favoriteWord.setAnchorPoint(cc.p(0, 1));
        this._topNode.addChild(this._favoriteWord);

        // ボタン
        this._lastBtn = ButtonRed.create(LAST_BTN_TEXT, () => {
            // プレイアブルでは何もしない？
            console.log("END");
            window.location = "http://kotodama.page.link/store";
        });
        this._lastBtn.setPosition(getCenter().x, 150);
        this._lastBtn.setVisible(false);
        this.addChild(this._lastBtn);
    },

    _makeChart: function(paramObj) {

        let startPos = cc.p(120, 113);

        let totalDeltaMillisec = 0;
        let intervalMillsec = 1000 / FPS;
        let durationMillsec = 1000;

        let intervalKey = setInterval(() => {
            totalDeltaMillisec += intervalMillsec;

            let rateTime = clamp01(totalDeltaMillisec / durationMillsec);

            let func = (param) => {

                let val = Math.min(Graduate.PARAM_MAX_VALUE, Math.max(0.3, paramObj[param] * 2));
                let maxPos = Graduate.chartMaxPosMap[param];

                let dispNum = Math.round(val * rateTime);
                let numTex = cc.textureCache.getTextureForKey(getImagePath("chart_num_" + dispNum, IMAGE_TYPE_UI_GRADUATE));

                let numSpr = this._chartNumSpriteMap[param];
                numSpr.setTexture(numTex);
                numSpr.setTextureRect(numTex.getContentSize());

                let vec = new cc.math.Vec2(
                    maxPos.x - startPos.x,
                    maxPos.y - startPos.y
                );

                let rateVal = clamp01(val / Graduate.PARAM_MAX_VALUE);
                let pos = cc.p(
                    startPos.x + vec.x * rateTime * rateVal,
                    startPos.y + vec.y * rateTime * rateVal
                );
                return pos;
            };

            let vertices = [];
            vertices.push(func(PARAM_L));
            vertices.push(func(PARAM_D));
            vertices.push(func(PARAM_M));
            vertices.push(func(PARAM_C));
            vertices.push(func(PARAM_Y));
            
            this._chartDraw.clear();
            this._chartDraw.drawPoly(vertices, cc.color(0, 255, 76, 130), 1, cc.color(0, 48, 4, 96));

        }, intervalMillsec);

        setTimeout(() => {
            clearInterval(intervalKey);
        }, durationMillsec + 1);
    },

    _setChara: function(charaData, lastKotodamaData) {
        this._name.setString(charaData.name);
        this._memo.setString(charaData.intro);
        this._favoriteWord.setString(lastKotodamaData.ktdm);

        this._type.removeAllChildren();
        for (let i = 0; i < charaData.param.length; i++) {
            let param = charaData.param.substr(i, 1);
            let imageName = "Zokusei_icon_";
            imageName += (param == "L") ? "01"
                       : (param == "D") ? "04"
                       : (param == "M") ? "05"
                       : (param == "Y") ? "03"
                       : "02";
            let spr = makeSprite(getImagePath(imageName, IMAGE_TYPE_UI_GRADUATE));
            spr.setPosition((-60 / 2) * (charaData.param.length - 1) + 60 * i, 0);
            this._type.addChild(spr);
        }
    }
});
Graduate.create = function() {
    return new Graduate();
};

Graduate.PARAM_MAX_VALUE = 4,

Graduate.chartMaxPosMap = {};
Graduate.chartMaxPosMap[PARAM_L] = cc.p(120, 196);
Graduate.chartMaxPosMap[PARAM_D] = cc.p(200, 138);
Graduate.chartMaxPosMap[PARAM_M] = cc.p(169, 43);
Graduate.chartMaxPosMap[PARAM_Y] = cc.p(40, 138);
Graduate.chartMaxPosMap[PARAM_C] = cc.p(71, 43);
