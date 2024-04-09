
var SpriteAnime = cc.Node.extend({

    _spriteList: [],
    
    ctor: function(spriteOrFileNameList, duration) {
        cc.Node.prototype.ctor.call(this);
        SpriteAnime.prototype.init.call(this, spriteOrFileNameList, duration);
    },

    init: function(spriteOrFileNameList, duration) {

        for (let spriteOrFileName of spriteOrFileNameList) {
            if (typeof(spriteOrFileName) == "string") {
                let spr = makeSprite(spriteOrFileName);
                this.addChild(spr);
                this._spriteList.push(spr);
            } else {
                this.addChild(spriteOrFileName);
                this._spriteList.push(spriteOrFileName);
            }
        }

        let actionList = [];
        for (let i = 0; i < this._spriteList.length; i++) {

            actionList.push(cc.DelayTime.create(duration));
            actionList.push(
                ((idx) =>  {
                    return cc.CallFunc.create(() => {
                        this._makeView(idx);
                    });
                })(i)
            );
        }

        let actionSeq = cc.Sequence.create(actionList);
        let actionRepeat = cc.RepeatForever.create(actionSeq);
        this.runAction(actionRepeat);

        this._makeView(0);
    },

    _makeView: function(idx) {
        for (let i = 0; i < this._spriteList.length; i++) {
            this._spriteList[i].setVisible(i == idx);
        }
    },
});

SpriteAnime.create = function(spriteOrFileNameList, duration) {
    return new SpriteAnime(spriteOrFileNameList, duration);
};
