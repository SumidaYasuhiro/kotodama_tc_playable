
const RESOLUTION_WIDTH = 750;
const RESOLUTION_HEIGHT = 1334;

const FPS = 60;

const CHARACTER_CENTERDIFF_Y = -50;

const FIRST_CHARA_ID = "01_L";

const PARAM_L = "L";
const PARAM_D = "D";
const PARAM_M = "M";
const PARAM_Y = "Y";
const PARAM_C = "C";

const NO_TEXT = "？？？";
const EVOLVE_PRE_NARRATION = "阿啦。。。情況怪怪的唷？";
const EVOLVE_NARRATION = "「{0}」進化為「{1}」了！";
const GRADUATE_MEMO = "觀察日誌";
const GRADUATE_FAVORITE = "喜歡的詞";
const LAST_BTN_TEXT = "想要繼續遊玩請點此";

// ツール用
try {
    exports.gameDefine = [
        NO_TEXT,
        EVOLVE_PRE_NARRATION,
        EVOLVE_NARRATION,
        GRADUATE_MEMO,
        GRADUATE_FAVORITE,
        LAST_BTN_TEXT
    ];
} catch (e) {}
