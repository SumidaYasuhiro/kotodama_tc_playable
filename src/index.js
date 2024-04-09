
function startGame() {

    cc.game.onStart = function(){
                
        // Pass true to enable retina display, disabled by default to improve performance
        cc.view.enableRetina(false);
        // Adjust viewport meta
        cc.view.adjustViewPort(true);
        // Setup the resolution policy and design resolution size
        cc.view.setDesignResolutionSize(RESOLUTION_WIDTH, RESOLUTION_HEIGHT, cc.ResolutionPolicy.SHOW_ALL);
        // The game will be resized when browser size change
        cc.view.resizeWithBrowserSize(true);

        let preloadList = [
            getImagePath("simpleYuka_01_murasaki"),
            getFontPath(),
            getAudioPath(AUDIO_BGM_YOSHO),
            getAudioPath(AUDIO_SE_SELECT_KTDM),
            getAudioPath(AUDIO_SE_EVOLVE)
        ];
        preloadList = preloadList.concat(CharacterRepo.getCharaImageList(FIRST_CHARA_ID));

        // load resources
        cc.LoaderScene.preload(preloadList, function() {

            // 起動後に非同期ロードでいいやつをプリロード
            cc.loader.load([
                getImagePath("chara_fukidashi", IMAGE_TYPE_UI_GROW),
                getImagePath("selection_header1", IMAGE_TYPE_UI_GROW),
                getImagePath("selection_header2", IMAGE_TYPE_UI_GROW),
                getImagePath("selection_header3", IMAGE_TYPE_UI_GROW),
                getImagePath("ktdm_fukidashi", IMAGE_TYPE_UI_GROW),
                getImagePath("message_end", IMAGE_TYPE_UI_GROW),
                getImagePath("Button_Select_A_01_L", IMAGE_TYPE_UI_COMMON),
                getImagePath("Button_Select_A_02_L", IMAGE_TYPE_UI_COMMON),
                getImagePath("ahikei_sozai", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("sen_01", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("sen_02", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("chart_text_L", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("chart_text_D", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("chart_text_M", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("chart_text_Y", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("chart_text_C", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("raddar", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("Zokusei_icon_01", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("Zokusei_icon_02", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("Zokusei_icon_03", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("Zokusei_icon_04", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("Zokusei_icon_05", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("chart_num_0", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("chart_num_1", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("chart_num_2", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("chart_num_3", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("chart_num_4", IMAGE_TYPE_UI_GRADUATE),
                getImagePath("chart_num_5", IMAGE_TYPE_UI_GRADUATE)
            ], () => {});

            // BGM
            cc.audioEngine.playMusic(getAudioPath(AUDIO_BGM_YOSHO), true);
            // シーン起動
            cc.director.runScene(new MainScene());
        }, this);
    };
    cc.game.run("gameCanvas");
}