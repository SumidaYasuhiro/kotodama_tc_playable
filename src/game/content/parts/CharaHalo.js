
var CharaHalo = cc.Node.extend({

    _halo: null,
    _bgBlack: null,
    
    ctor: function() {
        cc.Node.prototype.ctor.call(this);
        CharaHalo.prototype.init.call(this);
    },

    init: function() {

        var size = cc.director.getWinSize();

        this._bgBlack = cc.LayerColor.create(cc.color(0, 0, 0, 150), size.width, size.height);
        this._bgBlack.setVisible(false);
        this.addChild(this._bgBlack);

        this._halo = makeSprite(
            getImagePath("halo", IMAGE_TYPE_UI_GROW),
            getCenter()
        );
        this._halo.setScale(1.5);
        this._halo.setVisible(false);
        this.addChild(this._halo);

        let rotateBy = cc.RotateBy.create(1, 30);
        let actionRepeat = cc.RepeatForever.create(rotateBy);
        this._halo.runAction(actionRepeat);
    },

    showBlack: function() {
        this._bgBlack.setOpacity(0);
        this._bgBlack.setVisible(true);
        this._bgBlack.runAction(cc.FadeTo.create(0.4, 150));
    },

    showHalo: function() {
        this._halo.setOpacity(0);
        this._halo.setVisible(true);
        this._halo.runAction(cc.FadeTo.create(0.2, 255));
    },

    hideAll: function() {

        let actionList1 = [];

        actionList1.push(cc.FadeTo.create(0.3, 0));
        actionList1.push(cc.CallFunc.create(() => {
            this._bgBlack.setVisible(false);
        }));

        let actionSeq1 = cc.Sequence.create(actionList1);
        this._bgBlack.runAction(actionSeq1);

        let actionList2 = [];

        actionList2.push(cc.FadeTo.create(0.3, 0));
        actionList2.push(cc.CallFunc.create(() => {
            this._halo.setVisible(false);
        }));

        let actionSeq2 = cc.Sequence.create(actionList2);
        this._halo.runAction(actionSeq2);
    }
});

CharaHalo.create = function() {
    return new CharaHalo();
};
