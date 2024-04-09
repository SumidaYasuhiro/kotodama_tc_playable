

var MainScene = cc.Scene.extend({

    onEnter: function() {
        
        // this._superはobfscatorを使うとundefinedになる
        this.__proto__.__proto__.onEnter.apply(this);

        // 背景とりあえず
        var bg = cc.Sprite.create(getImagePath("simpleYuka_01_murasaki"));
        setCenter(bg);

        // 横に大きいときのために縦は固定で横幅をスケールさせる
        var scale = cc.director.getWinSize().width / bg.getTextureRect().width;
        if (scale > 1) {
            bg.setScale(scale, scale);
        }

        this.addChild(bg);

        // あとはプロセッサーに
        var processor = new GameProcessor();
        this.addChild(processor);
        
        // BGM再生用
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: this.onTouchBegan.bind(this)
        }, this);
    },

    onTouchBegan: function(touch, event) {
        
        // Chromeはユーザ操作が行われないと再生されないのでここで
        if (!cc.audioEngine.isMusicPlaying()) {
            cc.audioEngine.playMusic(getAudioPath(AUDIO_BGM_YOSHO), true);
        }

        return false;
    },

});
