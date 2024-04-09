
var KotodamaSelectionState = {
    Hidden: 0,
    Appear: 1,
    Selection: 2,
    Disappear: 3
};

var KotodamaSelection = cc.Node.extend({

    _headerNode: null,

    _selection1: null,
    _selection2: null,
    _selection3: null,

    _state: KotodamaSelectionState.Hidden,
    
    _selectedSelection: null,

    _callbacks: {},
    
    ctor: function() {
        cc.Node.prototype.ctor.call(this);
        KotodamaSelection.prototype.init.call(this);
    },

    init: function() {

        let center = getCenter();

        this._headerNode = this._makeHeader();

        this._selection1 = this._makeSelction(center.x + 50  , center.y + 200);
        this._selection2 = this._makeSelction(center.x + -187, center.y - 20);
        this._selection3 = this._makeSelction(center.x + 160 , center.y + -60);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
            onTouchCanceled: this.onTouchCanceled.bind(this),
        }, this);
    },

    onUpdate: function() {
    },

    onTouchBegan: function(touch, event) {

        if (this._state != KotodamaSelectionState.Selection) {
            return;
        }

        let point = touch.getLocation();
        let check = selection => {
            this._selectedSelection = cc.rectContainsPoint(selection.fukidashi.getBoundingBox(), point)
                                ? selection
                                : null;
            return this._selectedSelection != null;
        };

        if (check(this._selection1)) return true;
        if (check(this._selection2)) return true;
        if (check(this._selection3)) return true;

        return true;
    },

    onTouchMoved: function(touch, event) {

        if (this._selectedSelection == null) {
            return;
        }

        //TODO 一定以上動いたら無効に
        
    },

    onTouchEnded: function(touch, event) {

        if (this._selectedSelection == null) {
            return;
        }

        let point = touch.getLocation();
        if (!cc.rectContainsPoint(this._selectedSelection.fukidashi.getBoundingBox(), point)) {
            return;
        }

        // ことだま選択の処理
        this._onSelectKotodama(this._selectedSelection);
    },

    onTouchCanceled: function(touch, event) {
        // なにもしない
    },

    setCallbacks: function(callbacks) {
        this._callbacks = callbacks;
    },

    getSelectedKotodama: function() {
        return this._selectedSelection.kotodamaData;
    },

    playKotodamaStart: function(kotodamaList) {
        // ことだま出現
        this._playAppearAction(this._selection1, kotodamaList[0]);
        this._playAppearAction(this._selection2, kotodamaList[1]);
        this._playAppearAction(this._selection3, kotodamaList[2], () => {
            this._changeState(KotodamaSelectionState.Selection);
        });
        
        this._headerNode.setOpacity(0);
        this._headerNode.setVisible(true);

        let actionList = [];
        actionList.push(cc.DelayTime.create(0.5));
        actionList.push(cc.FadeTo.create(0.5, 255));

        let actionSeq = cc.Sequence.create(actionList);
        this._headerNode.runAction(actionSeq);

        this._changeState(KotodamaSelectionState.Appear);
    },

    _changeState: function(newState) {
        this._state = newState;
    },

    _makeHeader: function() {

        let node = cc.Node.create();
        node.setPosition(getCenterDiff(0, 400));
        node.setCascadeOpacityEnabled(true);
        node.setVisible(false);
        this.addChild(node);

        let header1 = makeSprite(getImagePath("selection_header1", IMAGE_TYPE_UI_GROW));
        node.addChild(header1);

        let header2 = makeSprite(getImagePath("selection_header2", IMAGE_TYPE_UI_GROW));
        node.addChild(header2);

        let header3 = makeSprite(getImagePath("selection_header3", IMAGE_TYPE_UI_GROW));
        node.addChild(header3);

        header1.setVisible(false);
        header2.setVisible(false);
        header3.setVisible(false);

        let duration = 0.1;

        let action1 = cc.DelayTime.create(duration);
        let action2 = cc.CallFunc.create(() => {
            header1.setVisible(true);
            header2.setVisible(false);
            header3.setVisible(false);
        });
        let action3 = cc.DelayTime.create(duration);
        let action4 = cc.CallFunc.create(() => {
            header1.setVisible(false);
            header2.setVisible(true);
            header3.setVisible(false);
        });
        let action5 = cc.DelayTime.create(duration);
        let action6 = cc.CallFunc.create(() => {
            header1.setVisible(false);
            header2.setVisible(false);
            header3.setVisible(true);
        });

        let actionSeq = cc.Sequence.create(action1, action2, action3, action4, action5, action6);
        let actionRepeat = cc.RepeatForever.create(actionSeq);
        node.runAction(actionRepeat);

        return node;
    },

    _onSelectKotodama: function(selection) {

        // 選択の処理（引数）
        this._callbacks.onSelectKotodama();

        // ことだま消滅
        this._playDisappearAction(this._selection1, this._selection1 == selection);
        this._playDisappearAction(this._selection2, this._selection2 == selection);
        this._playDisappearAction(this._selection3, this._selection3 == selection, () => {
            this._changeState(KotodamaSelectionState.Hidden);
        });

        let actionList = [];
        actionList.push(cc.FadeTo.create(0.5, 0));
        actionList.push(cc.CallFunc.create(() => {
            this._headerNode.setVisible(false);    
        }));

        let actionSeq = cc.Sequence.create(actionList);
        this._headerNode.runAction(actionSeq);

        // SE
        cc.audioEngine.playEffect(getAudioPath(AUDIO_SE_SELECT_KTDM));

        this._changeState(KotodamaSelectionState.Hidden);
    },

    _makeSelction: function(x, y) {

        // 吹き出し
        let fukidashi = makeSprite(
            getImagePath("ktdm_fukidashi", IMAGE_TYPE_UI_GROW),
            cc.p(x, y)
        );
        fukidashi.setCascadeOpacityEnabled(true);
        fukidashi.setVisible(false);
        this.addChild(fukidashi);

        let duration = getRandomFloat(0.3, 1);

        let actionList = [];
        actionList.push(cc.EaseQuadraticActionOut.create(cc.ScaleTo.create(duration, 0.97, 1.03)));
        actionList.push(cc.EaseQuadraticActionOut.create(cc.ScaleTo.create(duration, 1, 1)));
        actionList.push(cc.EaseQuadraticActionOut.create(cc.ScaleTo.create(duration, 1.03, 0.97)));
        actionList.push(cc.EaseQuadraticActionOut.create(cc.ScaleTo.create(duration, 1, 1)));
        
        let actionSeq = cc.Sequence.create(actionList);
        let actionRepeat = cc.RepeatForever.create(actionSeq);
        fukidashi.runAction(actionRepeat);

        // 言葉
        let kotodama = makeLabel("", 24, cc.p(95, 95));
        fukidashi.addChild(kotodama);

        return {
            topNode: fukidashi,
            fukidashi: fukidashi,
            kotodama: kotodama,
            kotodamaData: null,
            firstPosition: fukidashi.getPosition()
        };
    },

    _playAppearAction: function(selection, kotodamaData, onEnd) {

        selection.kotodama.setString(kotodamaData.ktdm);
        selection.kotodamaData = kotodamaData;

        selection.topNode.setScale(0);
        selection.topNode.setPosition(getCenterDiff(0, CHARACTER_CENTERDIFF_Y + 50));
        selection.topNode.setOpacity(50);
        selection.topNode.setVisible(true);

        let duration = 1;
        let moveTo = cc.EaseQuadraticActionOut.create(cc.MoveTo.create(duration, selection.firstPosition));
        let scaleTo = cc.EaseQuadraticActionOut.create(cc.ScaleTo.create(duration, 1));
        let fadeTo = cc.EaseQuadraticActionOut.create(cc.FadeTo.create(duration, 255));

        let actionList = [];

        actionList.push(cc.Spawn.create(moveTo, scaleTo, fadeTo));
        actionList.push(cc.CallFunc.create(() =>  {
            if (onEnd) {
                onEnd();
            }
        }));

        let actionSeq = cc.Sequence.create(actionList);
        selection.topNode.runAction(actionSeq);
    },

    _playDisappearAction: function(selection, isMain, onEnd) {

        let actionList = [];

        if (isMain) {
            actionList.push(cc.DelayTime.create(0.5));

            actionList.push(cc.CallFunc.create(() =>  {
                this._callbacks.onKotodamaEat();
            }));

            let moveTo = cc.MoveTo.create(0.5, getCenterDiff(0, CHARACTER_CENTERDIFF_Y + 50));
            let scaleTo = cc.ScaleTo.create(0.5, 0)
            let fadeTo = cc.FadeTo.create(0.4, 0);
            actionList.push(cc.Spawn.create(moveTo, scaleTo, fadeTo));
        } else {
            let moveBy = cc.MoveBy.create(0.6, cc.p(0, -10));
            let fadeTo = cc.FadeTo.create(0.6, 0);
            actionList.push(cc.Spawn.create(moveBy, fadeTo));
        }
        
        actionList.push(cc.CallFunc.create(() =>  {
            selection.topNode.setVisible(false);
            if (onEnd) {
                onEnd();
            }
        }));

        let actionSeq = cc.Sequence.create(actionList);
        selection.topNode.runAction(actionSeq);
    }

});
KotodamaSelection.create = function() {
    return new KotodamaSelection();
};
KotodamaSelection.KOTODAMA_COUNT = 3;