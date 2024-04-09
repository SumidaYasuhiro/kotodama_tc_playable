

var Narration = cc.Node.extend({

    _TEXT_PROGRESS_FRAME: 2,

    _frameCount: 0,
    _waitFrame: 0,

    _narrationNode: null,
    _label: null,
    _endMark: null,

    _text: "",
    _isEndMardShow: false,

    _callbacks: {},
    
    ctor: function() {
        cc.Node.prototype.ctor.call(this);
        Narration.prototype.init.call(this);
    },

    init: function() {

        this._narrationNode = cc.Node.create();
        this._narrationNode.setPosition(getCenter().x, 144);
        this._narrationNode.setScale(1, 0);
        this._narrationNode.setVisible(false);
        this.addChild(this._narrationNode);

        let frame = makeSprite(getImagePath("message_window", IMAGE_TYPE_UI_GROW));
        this._narrationNode.addChild(frame);

        this._label = makeLabel(
            "",
            40,
            cc.p(-340, 106),
            cc.color.WHITE,
            cc.size(680, 230),
            cc.TEXT_ALIGNMENT_LEFT,
            cc.VERTICAL_TEXT_ALIGNMENT_TOP,
        );
        this._label.setAnchorPoint(cc.p(0, 1));
        this._narrationNode.addChild(this._label);

        this._endMark = makeSprite(getImagePath("message_end", IMAGE_TYPE_UI_GROW), cc.p(320, -90));
        this._endMark.setVisible(false);
        this._narrationNode.addChild(this._endMark);

        let actionList = [];
        let fadeTo1 = cc.EaseQuadraticActionOut.create(cc.FadeTo.create(0.5, 100));
        let moveBy1 = cc.EaseQuadraticActionOut.create(cc.MoveBy.create(0.5, cc.p(0, -10)));
        let spawn1 = cc.Spawn.create(fadeTo1, moveBy1);

        let fadeTo2 = cc.EaseQuadraticActionOut.create(cc.FadeTo.create(0.5, 255));
        let moveBy2 = cc.EaseQuadraticActionOut.create(cc.MoveBy.create(0.5, cc.p(0, 10)));
        let spawn2 = cc.Spawn.create(fadeTo2, moveBy2);

        let actionSeq = cc.Sequence.create(spawn1, spawn2);
        let actionRepeat = cc.RepeatForever.create(actionSeq);
        this._endMark.runAction(actionRepeat);

        // 初期表示されないように
        this._frameCount = this._TEXT_PROGRESS_FRAME * this._END_WAIT_TEXT_COUNT;
    },

    onUpdate: function() {

        this._frameCount++;

        let textPre = this._label.getString();
        this._setText();
        let textAfter = this._label.getString();

        if (textPre != textAfter && textAfter == this._text) {
            this._endMark.setVisible(this._isEndMardShow);
            this.callbacks.onEndNarration();
        }
    },

    setCallbacks: function(callbacks) {
        this.callbacks = callbacks;
    },

    show: function(text, waitFrame, isEndMard) {
        this._text = text;
        this._waitFrame = waitFrame || 0;
        this._isEndMardShow = isEndMard || false;

        if (!this._narrationNode.isVisible() || this._narrationNode.getScaleY() < 1) {
            setTimeout(() => {
                this._narrationNode.setVisible(true);
                this._narrationNode.runAction(cc.ScaleTo.create(0.3, 1));
            }, this._waitFrame / 60 * 1000);
            this._waitFrame += Math.floor(60 * 0.3);
        }

        this._label.setString("");
        this._endMark.setVisible(false);
        this._frameCount = 0;
    },

    hide: function() {

        if (!this._narrationNode.isVisible()) {
            return;
        }

        let actionList = [];

        actionList.push(cc.ScaleTo.create(0.3, 1, 0));
        actionList.push(cc.CallFunc.create(() => {
            this._endMark.setVisible(false);
            this._narrationNode.setVisible(false);    
        }));

        let actionSeq = cc.Sequence.create(actionList);
        this._narrationNode.runAction(actionSeq);

        this._label.setString("");
    },

    _setText: function() {

        let workFrame = this._frameCount;
        workFrame -= this._waitFrame;

        if (workFrame <= 0) {
            return;
        }

        let textCount = Math.floor(workFrame / this._TEXT_PROGRESS_FRAME);
        let text = this._text.substr(0, Math.min(textCount, this._text.length));
        this._label.setString(text);
    }

});
Narration.create = function() {
    return new Narration();
};
