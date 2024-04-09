
var CharacterState = {
    Wait: 0,
    Eat: 1,
    Eating: 2,
    EvolvePre: 3,
    EvolvePreWait: 4,
    Evolve: 5,
    EvolveAfter: 6,
};

var Character = cc.Node.extend({

    evolveCount: 0,
    
    charaId: "",

    _charaIdHistry: [],

    _stateViewFrame: {},
    
    _frameCount: 0,

    // ローディング中のID (複数同時ロードはない)
    _idLoading: "",
    // ロード完了のID (複数同時ロードはない)
    _idLoadComp: "",

    _spriteMap: {},

    _halo: null,
    _serif: null,

    _state: CharacterState.Wait,

    _callbacks: {},
    
    ctor: function() {
        cc.Node.prototype.ctor.call(this);
        Character.prototype.init.call(this);
    },

    init: function() {

        this._stateViewFrame[CharacterState.Wait] = 60;
        this._stateViewFrame[CharacterState.Eat] = 60;
        this._stateViewFrame[CharacterState.Eating] = 16;
        this._stateViewFrame[CharacterState.EvolvePre] = 30;
        this._stateViewFrame[CharacterState.EvolvePreWait] = 30;
        this._stateViewFrame[CharacterState.Evolve] = 30;
        this._stateViewFrame[CharacterState.EvolveAfter] = 30;

        this._halo = CharaHalo.create();
        this.addChild(this._halo);

        this._serif = CharaSerif.create();
        this.addChild(this._serif);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
            onTouchCanceled: this.onTouchCanceled.bind(this),
        }, this);

        return;
    },

    onUpdate: function()  {

        this._frameCount++;

        this._makeView();
    },

    onTouchBegan: function(touch, event) {

        if (this._state != CharacterState.EvolvePreWait) {
            return;
        }
        return true;
    },

    onTouchMoved: function(touch, event) {

        if (this._state != CharacterState.EvolvePreWait) {
            return;
        }

        //TODO 一定以上動いたら無効に
        
    },

    onTouchEnded: function(touch, event) {

        if (this._state != CharacterState.EvolvePreWait) {
            return;
        }
        
        this._serif.hide(() => {
            this._callbacks.onEndEvolvePre();
        });
        this._changeState(CharacterState.Wait);
    },

    onTouchCanceled: function(touch, event) {
        // なにもしない
    },

    setCallbacks: function(callbacks) {
        this._callbacks = callbacks;
    },

    prepareChara: function(charaId) {
        this._idLoading = charaId;
        CharacterRepo.preload(this._idLoading, () =>  {
            this._onCompLoad();
        });
    },

    setCharaFromPreparing: function(onCompSet) {
        this.setChara(this._idLoading, onCompSet);
    },

    setChara: function(charaId, onCompSet) {

        if (this.charaId == charaId) {
            return;
        }

        // すでにロード完了の場合は処理完了
        this.charaId = charaId;
        this._charaIdHistry.push(this.charaId);
        if (this._idLoadComp == this.charaId) {
            this._makeCharaSprites();
            onCompSet();
            return;
        }

        // ロード完了時のコールバックに設定
        this._callbacks.onLoadComp = () => {
            this._makeCharaSprites();
            onCompSet();
        }

        // ロード中の場合は処理終了
        if (this._idLoading == this.charaId) {
            return;
        }

        // まだロードしていなかったのでロード
        this.prepareChara(charaId)
    },

    getBeforeCharaId: function() {
        return 1 < this._charaIdHistry.length
             ? this._charaIdHistry[this._charaIdHistry.length - 2]
             : "";
    },

    setTimerWait: function() {

        let actionList = [];

        actionList.push(cc.DelayTime.create(0.8));
        actionList.push(cc.CallFunc.create(() =>  {
            this._callbacks.onEndWait(this.evolveCount);
        }));

        let actionSeq = cc.Sequence.create(actionList);
        this.runAction(actionSeq);
    },

    playEat: function() {

        let actionList = [];

        actionList.push(cc.DelayTime.create(0.4));
        actionList.push(cc.CallFunc.create(() =>  {
            this._changeState(CharacterState.Eating);
        }));
        actionList.push(cc.DelayTime.create(1));
        actionList.push(cc.CallFunc.create(() =>  {
            this._changeState(CharacterState.Wait);
            this._callbacks.onEndEat();
        }));

        let actionSeq = cc.Sequence.create(actionList);
        this.runAction(actionSeq);

        this._changeState(CharacterState.Eat);
    },

    showEvolvePreMsg: function(serif) {

        this._serif.show(serif);

        let actionList = [];

        actionList.push(cc.DelayTime.create(1));
        actionList.push(cc.CallFunc.create(() => {
            this._changeState(CharacterState.EvolvePreWait);
        }));

        let actionSeq = cc.Sequence.create(actionList);
        this._spriteMap[this.charaId].node.runAction(actionSeq);

        this._changeState(CharacterState.EvolvePre);
    },

    playEvolve: function() {

        this.evolveCount++;

        let actionList = [];

        actionList.push(cc.MoveBy.create(0.1, cc.p( 5, 0)));
        actionList.push(cc.MoveBy.create(0.1, cc.p(-5, 0)));
        actionList.push(cc.MoveBy.create(0.1, cc.p(-5, 0)));
        actionList.push(cc.MoveBy.create(0.1, cc.p( 5, 0)));

        actionList.push(cc.MoveBy.create(0.1, cc.p( 5, 0)));
        actionList.push(cc.MoveBy.create(0.1, cc.p(-5, 0)));
        actionList.push(cc.MoveBy.create(0.1, cc.p(-5, 0)));
        actionList.push(cc.MoveBy.create(0.1, cc.p( 5, 0)));

        actionList.push(cc.MoveBy.create(0.1, cc.p( 5, 0)));
        actionList.push(cc.MoveBy.create(0.1, cc.p(-5, 0)));
        actionList.push(cc.MoveBy.create(0.1, cc.p(-5, 0)));
        actionList.push(cc.MoveBy.create(0.1, cc.p( 5, 0)));

        actionList.push(cc.DelayTime.create(0.4));
        
        actionList.push(cc.CallFunc.create(() =>  {
            this.setCharaFromPreparing(() => {
                
                // SE
                cc.audioEngine.playEffect(getAudioPath(AUDIO_SE_EVOLVE));

                this._changeState(CharacterState.Wait);
                this._callbacks.onEndEvolve();
            });

            this._halo.showHalo();
        }));

        let actionSeq = cc.Sequence.create(actionList);
        this._spriteMap[this.charaId].node.runAction(actionSeq);

        this._halo.showBlack();

        this._changeState(CharacterState.Evolve);
    },

    showEvolveAfterMsg: function(serif) {

        this._serif.show(serif, 2.0, () => {
            this._halo.hideAll();

            this._changeState(CharacterState.Wait);
            this._callbacks.onEndEvolveAfter();
        });

        this._changeState(CharacterState.EvolveAfter);
    },

    moveToGraduate: function() {

        let spr = this._spriteMap[this.charaId].spriteList[0];
        let sprRect = spr.getTextureRect();
        let charaPos = getCenterDiff(-140, 175 - sprRect.height / 2);

        let actionList = [];

        actionList.push(cc.EaseQuadraticActionOut.create(cc.MoveTo.create(2, charaPos)));
        actionList.push(cc.DelayTime.create(0.5));
        actionList.push(cc.CallFunc.create(() =>  {
            this._callbacks.onEndGraduateMove();
        }));

        let actionSeq = cc.Sequence.create(actionList);
        this._spriteMap[this.charaId].node.runAction(actionSeq);
    },

    _onCompLoad: function() {

        // すでにロード完了していたので処理終了
        if (this._idLoadComp == this._idLoading) {
            return;
        }

        // ロード完了にセット
        this._idLoadComp = this._idLoading;

        // すでにロジック上のIDがロード待ちになっているのでコールバックを呼ぶ
        if (this.charaId == this._idLoadComp) {
            if (this._callbacks.onLoadComp) {
                this._callbacks.onLoadComp();
            }
        }
    },

    _changeState: function(newState) {
        this._state = newState;
        this._frameCount = 0;
    },

    _makeCharaSprites: function() {

        // 前のを非表示
        for (let key in this._spriteMap) {
            this._spriteMap[key].node.setVisible(false);
        }

        let charaNode = cc.Node.create();
        charaNode.setPosition(getCenterDiff(0, CHARACTER_CENTERDIFF_Y));
        this.addChild(charaNode);

        // 新しいキャラのスプライト生成
        let spriteList = [];
        for (let imageName of CharacterRepo.getCharaImageList(this.charaId)) {

            let spr = makeSprite(imageName);
            spr.setAnchorPoint(cc.p(0.5, 0));
            spr.setVisible(false);
            spr.setScale(1.25);
            charaNode.addChild(spr);

            spriteList.push(spr);
        }

        // 微揺らす
        let actionList = [];
        actionList.push(cc.ScaleTo.create(1, 1, 0.95));
        actionList.push(cc.ScaleTo.create(1, 1, 1));
        let actionSeq = cc.Sequence.create(actionList);
        let actionRepeat = cc.RepeatForever.create(actionSeq);
        charaNode.runAction(actionRepeat);

        //セリフの位置
        let serifPos = getCenterDiff(0, CHARACTER_CENTERDIFF_Y + spriteList[0].getBoundingBox().height + 10);
        this._serif.setPosition(serifPos);

        let data = {
            node: charaNode,
            spriteList: spriteList
        };
        this._spriteMap[this.charaId] = data;
    },

    _makeView: function() {

        if (this.charaId == "") {
            return;
        }

        if (!this._spriteMap[this.charaId]) {
            return;
        }

        let charaData = CharacterRepo.getCharacterData(this.charaId);

        let spriteIndexList = this._state == CharacterState.Eat ? charaData.eatIdxList
                            : this._state == CharacterState.Eating ? charaData.eatingIdxList
                            : charaData.idleIdxList;
        if (spriteIndexList.length <= 0) {
            return;
        }

        let idx = Math.floor(this._frameCount / this._stateViewFrame[this._state]) % spriteIndexList.length;
        let spriteIdx = spriteIndexList[idx];
        
        var spriteList = this._spriteMap[this.charaId].spriteList;
        for (let i = 0; i < spriteList.length; i++) {
            spriteList[i].setVisible(i == spriteIdx);
        }

    }
});
Character.create = function() {
    return new Character();
};
