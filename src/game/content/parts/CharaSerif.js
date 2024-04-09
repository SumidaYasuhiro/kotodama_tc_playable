
var CharaSerif = cc.Node.extend({

    _frame: null,
    _serif: null,
    
    ctor: function() {
        cc.Node.prototype.ctor.call(this);
        CharaSerif.prototype.init.call(this);
    },

    init: function() {

        this._frame = makeSprite(getImagePath("chara_fukidashi", IMAGE_TYPE_UI_GROW));
        this._frame.setAnchorPoint(cc.p(0.5, 0));
        this._frame.setCascadeOpacityEnabled(true);
        this.addChild(this._frame);

        this._serif = makeLabel("", 30, cc.p(0, 66));
        this.addChild(this._serif);

        this.setVisible(false);
    },

    show: function(serif, dispSeq, onEnd) {

        if (this.isVisible()) {
            if (onEnd) {
                onEnd();
            }
            return;
        }

        this._serif.setString(serif);
        this._frame.setOpacity(0);
        this.setVisible(true);

        // ラベルのBoundingBoxが計算されてから
        setTimeout(() => {
            // フレームのスケール設定
            let serifRect = this._serif.getBoundingBox();
            let frameRect = this._frame.getTextureRect();
            this._frame.setScale((serifRect.width + 80) / frameRect.width, 0.3);
        }, 0);

        let actionList = [];

        actionList.push(cc.FadeTo.create(0.25, 255));
        if (dispSeq && 0 < dispSeq) {
            actionList.push(cc.DelayTime.create(Math.max(0.5, dispSeq - 0.5)));
            actionList.push(cc.CallFunc.create(() => {
                this.hide(onEnd);
            }));    
        }

        let actionSeq = cc.Sequence.create(actionList);
        this._frame.runAction(actionSeq);
    },

    hide: function(onEnd) {

        if (!this.isVisible()) {
            if (onEnd) {
                onEnd();
            }
            return;
        }

        let actionList = [];

        actionList.push(cc.FadeTo.create(0.25, 0));
        actionList.push(cc.CallFunc.create(() => {
            this.setVisible(false);

            if (onEnd) {
                onEnd();
            }
        }));

        let actionSeq = cc.Sequence.create(actionList);
        this._frame.runAction(actionSeq);
    }
});

CharaSerif.create = function() {
    return new CharaSerif();
};
