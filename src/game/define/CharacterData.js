
var characterData = (function() {

    var dataList = [];

    // 幼少期1
    dataList.push([
{'id':'01_L','imgCount':4,'idleIdxList':[0,1],'eatIdxList':[2],'eatingIdxList':[0,3],'param':'L','name':'言靈仔','evolve_serif':'嘿嘿','intro':'出生不久的言靈仔。很天真很純真'},
    ]);

    // 幼少期2
    dataList.push([
{'id':'02_LD','imgCount':4,'idleIdxList':[0,1],'eatIdxList':[2],'eatingIdxList':[0,3],'param':'LD','name':'可愛仔','evolve_serif':'太棒了','intro':'太可愛了！可愛到會讓人感到不安之類的'},
{'id':'02_YC','imgCount':4,'idleIdxList':[0,1],'eatIdxList':[2],'eatingIdxList':[0,3],'param':'YC','name':'健康仔','evolve_serif':'呀呼','intro':'元氣滿滿，充滿興趣，再一起玩嘛？'},
{'id':'02_M','imgCount':5,'idleIdxList':[0,1],'eatIdxList':[2],'eatingIdxList':[3,4],'param':'M','name':'認真仔','evolve_serif':'好棒','intro':'認真的孩子接下來該怎麼辦呢咯咯咯咯'},
    ]);

    // 思春期
    dataList.push([
{'id':'03_L','imgCount':4,'idleIdxList':[0,1],'eatIdxList':[2],'eatingIdxList':[0,3],'param':'L','name':'愛琳','evolve_serif':'喵喵','intro':'可愛，什麼都很可愛，這很重要，不是嗎？'},
{'id':'03_D','imgCount':4,'idleIdxList':[0,1],'eatIdxList':[2],'eatingIdxList':[0,3],'param':'D','name':'黑暗ー','evolve_serif':'黑暗～','intro':'黑暗，在黑暗中受苦，柔情有時會讓人覺得痛苦，正值嬌嫩的年紀'},
{'id':'03_Y','imgCount':5,'idleIdxList':[0,1,2,3],'eatIdxList':[2],'eatingIdxList':[0,4],'param':'Y','name':'諾里醬','evolve_serif':'嗚呦～','intro':'很開心～所以很強大，就是這麼一回事'},
{'id':'03_M','imgCount':4,'idleIdxList':[0,1],'eatIdxList':[2],'eatingIdxList':[0,3],'param':'M','name':'認真面','evolve_serif':'還不錯啦','intro':'加油～加油～那麼加油有何意義呢？'},
{'id':'03_C','imgCount':7,'idleIdxList':[0,1,0,3],'eatIdxList':[2],'eatingIdxList':[4,5,6],'param':'C','name':'冷靜君','evolve_serif':'那樣很沒效率','intro':'不用勉強自己沒關係啦，就冷靜的前進吧！'},
    ]);
    
    // 卒業期
    dataList.push([
{'id':'05_L','imgCount':4,'idleIdxList':[0,1,2,1,0,1,3,1],'eatIdxList':[0],'eatingIdxList':[0],'param':'L','name':'帕妞妞','evolve_serif':'好開心〜！','intro':'求流行的危險感是可靠的。喝下新鮮果汁後再次出發！'},
{'id':'05_D','imgCount':3,'idleIdxList':[0,1,2,1],'eatIdxList':[0],'eatingIdxList':[0],'param':'D','name':'黑圈圈','evolve_serif':'單純的艱難','intro':'心裡空空的，失去了判斷好壞的判斷力。從某種意義上來說像嬰兒一樣。'},
{'id':'05_M','imgCount':2,'idleIdxList':[0,1],'eatIdxList':[0],'eatingIdxList':[0],'param':'M','name':'優等生','evolve_serif':'每天早上6點起床','intro':'功課我會立刻完成，預習也不會忽略。'},
{'id':'05_Y','imgCount':2,'idleIdxList':[0,1],'eatIdxList':[0],'eatingIdxList':[0],'param':'Y','name':'派對咖','evolve_serif':'以後再相會吧','intro':'自信的快樂，孤獨是心靈的空缺。'},
{'id':'05_Kojirou','imgCount':4,'idleIdxList':[0,1,2,3],'eatIdxList':[0],'eatingIdxList':[0],'param':'C','name':'小次郎','evolve_serif':'上吧…！','intro':'修行所得到的朋友在和鳥嬉戲，而我卻孤獨地拿著長刀'},
{'id':'05_Usaten','imgCount':4,'idleIdxList':[0,1,2,3],'eatIdxList':[0],'eatingIdxList':[0],'param':'LL','name':'兔子天使','evolve_serif':'愛的極限！','intro':'那個孩子喜歡的事物喜歡得太過火，對討厭的事物也非常的激烈。'},
{'id':'05_Usaten_Black','imgCount':4,'idleIdxList':[0,1,2,3],'eatIdxList':[0],'eatingIdxList':[0],'param':'LD','name':'黑兔子天使','evolve_serif':'真的假的！？','intro':'因為相信所以會被背叛，如果這樣的話…後面的事情你明白了吧？'},
{'id':'05_Moyashi','imgCount':6,'idleIdxList':[0,1,2,3,4,5],'eatIdxList':[0],'eatingIdxList':[0],'param':'LM','name':'豆芽君','evolve_serif':'不…不會輸的','intro':'想說的話今天也無法說出，只有努力這個選擇嗎？'},
{'id':'05_LMM','imgCount':3,'idleIdxList':[0,1,2],'eatIdxList':[0],'eatingIdxList':[0],'param':'LMM','name':'新鮮君','evolve_serif':'新鮮！','intro':'知識之泉中漫遊，博覽之海中漂浮，幻想界的博士。'},
{'id':'05_LY','imgCount':4,'idleIdxList':[0,3,2,0,3],'eatIdxList':[0],'eatingIdxList':[0],'param':'LY','name':'波梅吐司','evolve_serif':'哇呼哇呼～','intro':'因過度散播愛，而把自己塞進麵包裡的狗狗般的東西。'},
{'id':'05_LC','imgCount':7,'idleIdxList':[0,1,2,3,4,5,6],'eatIdxList':[0],'eatingIdxList':[0],'param':'LC','name':'傲嬌醬','evolve_serif':'不，不要誤會哦！','intro':'大家都喜歡的傲嬌女孩，只有兩個人獨處的時候才會露出真面目。'},
{'id':'05_Himokun','imgCount':6,'idleIdxList':[0,1,2,3,4,5],'eatIdxList':[0],'eatingIdxList':[0],'param':'DD','name':'希摩君','evolve_serif':'無聊～','intro':'我想為別人做些事情，但卻被別他人幫助了，這算是罪過嗎？'},
{'id':'05_DM','imgCount':2,'idleIdxList':[0,1],'eatIdxList':[0],'eatingIdxList':[0],'param':'DM','name':'陰沉的工程師','evolve_serif':'今日也要加班','intro':'程式不是按照我們所想的方式運作，而是按照我們所寫的方式運作的喔？'},
{'id':'05_Psycho','imgCount':3,'idleIdxList':[0,1,0,2],'eatIdxList':[0],'eatingIdxList':[0],'param':'DY','name':'精神病君','evolve_serif':'嗯嘿嘿嘿','intro':'每個人每個人都不一樣，所以能彼此理解真是不可思議啊？'},
{'id':'05_DCC','imgCount':4,'idleIdxList':[0,3,0,3,0,1,2,1],'eatIdxList':[0],'eatingIdxList':[0],'param':'DCC','name':'樂團仔','evolve_serif':'明天10點在工作室集合','intro':'他的愛人今天又忙著打工，愛是什麼呢？'},
{'id':'05_Muu','imgCount':4,'idleIdxList':[0,1,2,1,0,3],'eatIdxList':[0],'eatingIdxList':[0],'param':'MC','name':'MUFO','evolve_serif':'那傢伙在叫你','intro':'追那傢伙已經追了好幾個年頭了，沒完成任務就不能回家呢。'},
{'id':'05_LDD','imgCount':2,'idleIdxList':[0,1],'eatIdxList':[0],'eatingIdxList':[0],'param':'LDD','name':'病嬌醬','evolve_serif':'你喜歡我嗎？','intro':'如果你想要衡量愛的重量，為什麼不跟我一起試試呢？'},
{'id':'05_Kome_A','imgCount':6,'idleIdxList':[0,1,2,3,4,5],'eatIdxList':[0],'eatingIdxList':[0],'param':'MY','name':'米田桑','evolve_serif':'來吧，吃米吧','intro':'一邊跳著神秘的舞蹈，一邊佈施著米'},
{'id':'05_Hoshino','imgCount':4,'idleIdxList':[1,2,3],'eatIdxList':[0],'eatingIdxList':[0],'param':'YYC','name':'閃耀星野','evolve_serif':'STAR!','intro':'勇氣的偶像，幸福的藝術家，笑容燦爛☆'},
{'id':'05_MMY','imgCount':3,'idleIdxList':[0,1,0,1,2,1],'eatIdxList':[0],'eatingIdxList':[0],'param':'MMY','name':'推特仔','evolve_serif':'草w 長大吧ww','intro':'哇啊，跟隨者突然增加了好多哈哈'},
{'id':'05_LMY','imgCount':4,'idleIdxList':[0,1,2,3],'eatIdxList':[0],'eatingIdxList':[0],'param':'LMY','name':'波梅卷','evolve_serif':'哇哈？','intro':'蛋糕捲真的有一種柔軟的感覺呢～！哇哦～♪'},
{'id':'05_LDY','imgCount':2,'idleIdxList':[0,1],'eatIdxList':[0],'eatingIdxList':[0],'param':'LDY','name':'鍋子貓','evolve_serif':'那～噢？','intro':'尋找溫暖投入鍋中，世間看起來很繁忙，但與我無關'},
{'id':'05_MYY','imgCount':3,'idleIdxList':[0,1,0,2],'eatIdxList':[0],'eatingIdxList':[0],'param':'MYY','name':'米田社長','evolve_serif':'那是米飯吧？','intro':'堅實地推廣米的溫和社長，但是員工們卻任意妄為地在跳舞'},
{'id':'05_MYC','imgCount':3,'idleIdxList':[2,1,0,1],'eatIdxList':[0],'eatingIdxList':[0],'param':'MYC','name':'優啦啦桑','evolve_serif':'希望能好好地飄','intro':'不想引起麻煩，所以一直保持沉默，但其實我還是有意見喔～'},
{'id':'05_YC','imgCount':3,'idleIdxList':[0,1,2,1],'eatIdxList':[0],'eatingIdxList':[0],'param':'YC','name':'企鵝小子.','evolve_serif':'還可以吧','intro':'舞蹈是我的強項，舞蹈對戰是我的興趣，我的目標是成為舞蹈傳奇！'},
{'id':'05_LYC','imgCount':4,'idleIdxList':[0,1,2,3],'eatIdxList':[0],'eatingIdxList':[0],'param':'LYC','name':'康・芭勃羅','evolve_serif':'藝術是靈魂的本質啊！','intro':'每天都用尾巴畫畫，追求藝術絕對不能妥協'},
{'id':'05_DDC','imgCount':4,'idleIdxList':[0,1,2,3],'eatIdxList':[0],'eatingIdxList':[0],'param':'DDC','name':'小偷貓','evolve_serif':'哦哦，被發現了！','intro':'墊起腳來悄悄前進，咧嘴笑著的小偷，今夜也輕盈地四處飛躍。'},
{'id':'05_LLD','imgCount':4,'idleIdxList':[0,1,2,3],'eatIdxList':[0],'eatingIdxList':[0],'param':'LLD','name':'愛喵','evolve_serif':'愛喵登場了喵☆','intro':'神對應的超級偶像。被無名時期的粉絲包圍著，今天依然閃耀著☆'},
{'id':'05_DC','imgCount':4,'idleIdxList':[0,1,2,3],'eatIdxList':[0],'eatingIdxList':[0],'param':'DC','name':'丘西法','evolve_serif':'黑色衝動之中','intro':'全世界都被閉鎖的時刻，成為關鍵的悲愴墮墮落天使'},
{'id':'05_MCC','imgCount':3,'idleIdxList':[0,1,2],'eatIdxList':[0],'eatingIdxList':[0],'param':'MCC','name':'貝多不芬','evolve_serif':'這就是命運','intro':'身體扭曲著彈奏鋼琴的音樂家瘋子，和天才只有一線之隔'},
{'id':'05_MM','imgCount':4,'idleIdxList':[0,1,2,3],'eatIdxList':[0],'eatingIdxList':[0],'param':'MM','name':'抹茶松鼠','evolve_serif':'悠悠哉哉～悠悠哉哉～','intro':'不在意讓嘴巴不好咬的橡果，任性地慢悠悠地以自己的步調生活'},
{'id':'05_YY','imgCount':6,'idleIdxList':[0,1,2,3,4,5],'eatIdxList':[0],'eatingIdxList':[0],'param':'YY','name':'小修','evolve_serif':'嗨！怎麼了嗎？','intro':'被稱為小修的男子受到大家的仰慕，是個心地善良的紳士型壯漢'},
{'id':'05_CC','imgCount':6,'idleIdxList':[0,1,2,3,4,5],'eatIdxList':[0],'eatingIdxList':[0],'param':'CC','name':'英阿雄','evolve_serif':'翱翔天際的英雄，此刻前來拜見！','intro':'對於困難中的人們，颯爽地奔向他們身邊，才是真正的正義英雄！'},
    ]);
    
    return dataList;
})();

// ツール用
try {
    exports.characterData = characterData;
} catch (e) {}