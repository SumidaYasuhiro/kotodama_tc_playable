
var Button = cc.Node.extend({

    _normalSprite: null,
    _pressedSprite: null,

    _onClick: null,

    _isTouch: false,
    
    ctor: function(textOrLabel, nomalImagePath, pressedImagePath, onClick) {
        cc.Node.prototype.ctor.call(this);
        Button.prototype.init.call(this, textOrLabel, nomalImagePath, pressedImagePath, onClick);
    },

    init: function(textOrLabel, nomalImagePath, pressedImagePath, onClick) {

        this._normalSprite = makeSprite(nomalImagePath);
        this.addChild(this._normalSprite);

        this._pressedSprite = makeSprite(pressedImagePath);
        this.addChild(this._pressedSprite);

        let label = null;
        if (typeof(textOrLabel) == "string") {
            label = makeLabel(
                textOrLabel,
                45,
                cc.p(0, 15),
                cc.color.WHITE
            );
            this.addChild(label);
        } else if (textOrLabel) {
            label = textOrLabel;
            this.addChild(label);
        }

        this._onClick = onClick;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
            onTouchCanceled: this.onTouchCanceled.bind(this),
        }, this);
    },

    onTouchBegan: function(touch, event) {

        if (this._isTouch) {
            return;
        }

        if (!this.isVisible() || !this._normalSprite.isVisible()) {
            return;
        }

        this._isTouch = cc.rectContainsPoint(this._normalSprite.getBoundingBoxToWorld(), touch.getLocation());

        this._normalSprite.setVisible(!this._isTouch);
        this._pressedSprite.setVisible(this._isTouch);

        return true;
    },

    onTouchMoved: function(touch, event) {

        if (!this._isTouch) {
            return;
        }

        // ボタンの上かどうか
        this._isTouch = cc.rectContainsPoint(this._pressedSprite.getBoundingBoxToWorld(), touch.getLocation());
        
        this._normalSprite.setVisible(!this._isTouch);
        this._pressedSprite.setVisible(this._isTouch);
    },

    onTouchEnded: function(touch, event) {

        if (!this._isTouch) {
            return;
        }
        this._isTouch = false;
        
        this._normalSprite.setVisible(true);
        this._pressedSprite.setVisible(false);
        
        if (this._onClick) {
            this._onClick();
        }
    },

    onTouchCanceled: function(touch, event) {

        this._isTouch = false;
        
        this._normalSprite.setVisible(true);
        this._pressedSprite.setVisible(false);
    }
});

Button.create = function(textOrLabel, nomalImagePath, pressedImagePath, onClick) {
    return new Button(textOrLabel, nomalImagePath, pressedImagePath, onClick);
};

ButtonRed = {};
ButtonRed.create = function(textOrLabel, onClick) {
    return Button.create(
        textOrLabel,
        getImagePath("Button_Select_A_01_L", IMAGE_TYPE_UI_COMMON),
        getImagePath("Button_Select_A_02_L", IMAGE_TYPE_UI_COMMON),
        onClick
    );
};
