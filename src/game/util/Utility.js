
function isUndefined(obj) {
    return typeof(obj) == "undefined";
}

function stringFormat(text, args) {

    let work = text;

    for (let i = 1; i < arguments.length; i++) {
        let str = "{" + (i - 1) +"}";
        work = work.replace(str, arguments[i]);
    }

    return work;
};

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * Math.floor(max - min))
}

function getRandomFloat(min, max) {
    return min + Math.random() * Math.floor(max - min)
}

function clamp01(val) {
    return clamp(val, 0, 1);
}

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

function zeroPadding(num, length){
    return ('0000000000' + num).slice(-length);
}

function getRadian(degree) {
    return degree * (Math.PI / 180);
}

function getDistinctString(str) {
    let list = str.split("");
    let ret = list.filter((x, i, self) => {
        return self.indexOf(x) == i;
    });
    return ret.join("");
}