
var GameProcessor = cc.Node.extend({

    _graduate: null,
    _character: null,
    _kotodamaSelection: null,
    _narration: null,

    _growData: null,

    _deltaTime: 0,
    
    ctor: function() {
        cc.Node.prototype.ctor.call(this);
        GameProcessor.prototype.init.call(this);
    },

    init: function() {

        this._growData = new GrowData();
        this._growData.charaList.push(CharacterRepo.getCharacterData(FIRST_CHARA_ID));

        // 卒業
        this._graduate = Graduate.create();
        this.addChild(this._graduate);

        // キャラ
        this._character = Character.create();
        this._character.setCallbacks({
            onEndWait: this._onEndWait.bind(this),
            onEndEat: this._onEndEat.bind(this),
            onEndEvolvePre: this._onEndEvolvePre.bind(this),
            onEndEvolve: this._onEndEvolve.bind(this),
            onEndEvolveAfter: this._onEndEvolveAfter.bind(this),
            onEndGraduateMove: this._onEndGraduateMove.bind(this)
        });
        this._character.setChara(FIRST_CHARA_ID, () => {
            this._character.setTimerWait();
        });
        this.addChild(this._character);

        // ことだまセレクト
        this._kotodamaSelection = KotodamaSelection.create();
        this._kotodamaSelection.setCallbacks({
            onSelectKotodama: this._onSelectKotodama.bind(this),
            onKotodamaEat: this._onKotodamaEat.bind(this)
        });
        this.addChild(this._kotodamaSelection);

        // ナレーション
        this._narration = Narration.create();
        this._narration.setCallbacks({
            onEndNarration: this._onEndNarration.bind(this)
        });
        this.addChild(this._narration);

        this.scheduleUpdate();
    },

    update: function(dt) {

        this._deltaTime += dt;

        let frame = 1 / FPS;
        while (frame <= this._deltaTime) {
            this.onUpdate();
            this._deltaTime -= frame;
        }
    },

    onUpdate: function() {
        this._graduate.onUpdate();
        this._character.onUpdate();
        this._kotodamaSelection.onUpdate();
        this._narration.onUpdate();
    },

    _onEndWait: function() {

        // 最大進化済み
        if (this._character.evolveCount == CharacterRepo.getMaxEvolveCount()) {
            this._character.moveToGraduate();
            this._graduate.show(this._growData);
            return;
        }

        // 選択ことだまを取得
        var kotodamaList = KotodamaRepo.getRandomKotodamaData(this._character.evolveCount, KotodamaSelection.KOTODAMA_COUNT);

        // ことだま表示
        this._kotodamaSelection.playKotodamaStart(kotodamaList);
    },

    _onEndEat: function() {

        // 食べる前のセリフ
        let kotodama = this._kotodamaSelection.getSelectedKotodama();
        let charaId = this._character.charaId;

        // パラメータ抽選
        // LD のキャラの場合, L または D のリアクションをとる
        let params = charaId.split('_')[1];
        let lotteryPos = getRandomInt(0, params.length);
        let param = params.substr(lotteryPos, 1);

        let evolvePreSerif = KotodamaRepo.getEvolvePreSerif(kotodama, param);

        this._character.showEvolvePreMsg(evolvePreSerif);
        
        // ナレーション(セリフのナレーション)
        this._narration.show(kotodama.narration[param], 0.6 * FPS, true);
    },

    _onEndEvolvePre: function() {

        // 進化アクション
        this._character.playEvolve();

        // ナレーション(おや。。。様子が)
        this._narration.show(EVOLVE_PRE_NARRATION);
    },

    _onEndEvolve: function() {

        // 食べた後のセリフ
        let charaData = CharacterRepo.getCharacterData(this._character.charaId);
        this._character.showEvolveAfterMsg(charaData.evolve_serif);

        // ナレーション(進化した)
        let charaDataBefore = CharacterRepo.getCharacterData(this._character.getBeforeCharaId());
        let narrationText = stringFormat(EVOLVE_NARRATION, charaDataBefore.name, charaData.name);
        this._narration.show(narrationText);
    },

    _onEndEvolveAfter: function() {

        // 次の進化待ち
        this._character.setTimerWait();
        this._narration.hide();
    },

    _onEndGraduateMove: function() {

        // // 卒業ダイアログの表示
        // let charaData = CharacterRepo.getCharacterData(this._character.charaId);
        // let kotodamaData = this._kotodamaSelection.getSelectedKotodama();
        // this._graduate.show(charaData, kotodamaData);
    },

    _onSelectKotodama: function() {

        let selectedKotodamaData = this._kotodamaSelection.getSelectedKotodama();
        let paramObj = mergeParamObj(this._growData.getParamObj(), getParamObj(selectedKotodamaData.param));

        // 次キャラの準備
        let nextCharacterData = CharacterRepo.getEvolveCharacterData(this._character.evolveCount + 1, paramObj);
        this._character.prepareChara(nextCharacterData.id);

        this._growData.charaList.push(nextCharacterData);
        this._growData.kotodamaList.push(selectedKotodamaData);
    },

    _onKotodamaEat: function() {

        // 食べるアクション
        this._character.playEat();
    },

    _onEndNarration: function() {

        // 同期とる？
    }
});
