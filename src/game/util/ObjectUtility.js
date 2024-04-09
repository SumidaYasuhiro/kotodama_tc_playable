
function makeSprite(imagePath, posXY, anchorXY) {
    let spr = cc.Sprite.create(imagePath);
    if (posXY) spr.setPosition(posXY);
    if (anchorXY) spr.setAnchorPoint(anchorXY);
    return spr;
}

function makeLabel(text, fontSize, posXY, color, dimentions, alignH, alignV) {
    let label = cc.LabelTTF.create(
        text,
        getFontName(),
        fontSize,
        dimentions ? dimentions : cc.size(0, 0),
        !isUndefined(alignH) ? alignH : cc.TEXT_ALIGNMENT_CENTER,
        !isUndefined(alignV) ? alignV : cc.VERTICAL_TEXT_ALIGNMENT_CENTER
    );
    label.setColor(color ? color : cc.color.BLACK);
    if (posXY) label.setPosition(posXY);
    return label;
}

function getCenterDiff(x, y) {
    var centerDiff = getCenter();
    centerDiff.x += x;
    centerDiff.y += y;
    return centerDiff;
}

function getCenter() {
    var size = cc.director.getWinSize();
    return cc.p(size.width / 2, size.height / 2);
}

function getCenterNormalize() {
    return cc.p(0.5, 0.5);
}

function setCenter(obj) {
    obj.setPosition(getCenter());
    return obj;
}