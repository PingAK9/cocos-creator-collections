
window.localize = {
    data: {
        'en':{
            'popup_quit_title':'Keep patience',
            'popup_quit_body':'{0} Big Xu reward \nis waiting for you!',
            'continue':'Continue',
            'exit':'Exit',
            'congrat':'Congrats!',
            'score_detail':'You are won {0} Big Xu in total in this stage.',
            'score':'Score:',
            'high_score':'High score:',
            'play_again':'Play again',
            'claim_reward':'Claim reward',
            'start':'PLAY',
            'your_score':'YOUR SCORE',
            'retry_turn':'You have {0} remaining plays',
            'how_to_play':'HOW TO PLAY',
            'how_to_play_alliance':'Take control to collect\nred envelopes and banh chung',
            'how_to_play_enemy':'And don\'t forget jump up\nto avoid obstacles'
        },
        'vi':{
            'popup_quit_title':'Hãy kiên nhẫn',
            'popup_quit_body':'Phần thưởng {0} Big Xu\nđang chờ bạn đó.',
            'continue':'Chơi tiếp',
            'exit':'Dừng lại',
            'congrat':'Xin chúc mừng',
            'score_detail':'Bạn đã dành được {0} Big Xu, Nhận thưởng ngay.',
            'score':'Điểm:',
            'high_score':'Điểm cao:',
            'play_again':'Chơi lại',
            'claim_reward':'Nhận thưởng',
            'start':'BẮT ĐẦU',
            'your_score':'ĐIỂM SỐ CỦA BẠN',
            'retry_turn':'Bạn còn {0} lượt chơi lại',
            'how_to_play':'HƯỚNG DẪN',
            'how_to_play_alliance':'Hãy điều khiển tết thời thượng\năn bao lì xì và bánh chưng nhé',
            'how_to_play_enemy':'Và đừng quên nhảy lên\nné các vật cản nhé'
        },
    },

    languge : 'vi',

    text: function (key) {
        return this.data[this.languge][key];
    },

    textFormat: function(key, array){
        var _value = this.data[this.languge][key];
        for(var i = 0; i < array.length; i++){
            _value=_value.replace('{' + i + '}' ,array[i]);
        }
        return _value;
    }
}

window.config = {
    max_score: 5000,
}

window.game = {
    hero: {
        default: null,
        type: require('Hero')
    },
    game: {
        default: null,
        type: require('GameControl')
    },
    state: -1, // 1 : play, 0 : pause
    speed: 350,
    speedMax: 1000,
    speedDamping: 17,
    scoreChung: 0,
    scoreLixi: 0,
    high_score: 0,
    score_over: 25,
    heart: 3,
    tutorial: false,
}