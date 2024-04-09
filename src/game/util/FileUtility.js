
var IMAGE_TYPE_NONE = 0;
var IMAGE_TYPE_CHARA = 1;
var IMAGE_TYPE_UI_COMMON = 2;
var IMAGE_TYPE_UI_GROW = 3;
var IMAGE_TYPE_UI_GRADUATE = 4;

var AUDIO_BGM_YOSHO = 0;
var AUDIO_SE_SELECT_KTDM = 1;
var AUDIO_SE_EVOLVE = 2;

function getImagePath(fileName, imageType) {
    let type = isUndefined(imageType)
             ? IMAGE_TYPE_NONE
             : imageType;
    
    let subPath = "";
    switch (type) {
        case IMAGE_TYPE_CHARA:       subPath = "chara/"; break;
        case IMAGE_TYPE_UI_COMMON:   subPath = "ui/common/"; break;
        case IMAGE_TYPE_UI_GROW:     subPath = "ui/grow/"; break;
        case IMAGE_TYPE_UI_GRADUATE: subPath = "ui/graduate/"; break;
        default: break;
    }
    
    let ext = ".png";

    return "res/image/" + subPath + fileName + ext;
}

function getAudioPath(audio) {

    let subPath = "";
    switch (audio) {
        case AUDIO_BGM_YOSHO:      subPath = "bgm/0_yosho.mp3"; break;
        case AUDIO_SE_SELECT_KTDM: subPath = "se/select_ktdm.wav"; break;
        case AUDIO_SE_EVOLVE:      subPath = "se/evolve.mp3"; break;
        default: break;
    }

    return "res/audio/" + subPath;
}

function getFontPath() {
    return "res/font/" + getFontName() + ".ttf";
}

function getFontName() {
    return "jf-openhuninn-2.0";
}