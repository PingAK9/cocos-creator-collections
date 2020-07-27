


window.localize = {
    data: {
        'en':{
            'title':'Find the secret number to unlock the chest!',
            'hint':'Hint:',
            'question':'How many provinces in \nVietnam have Big C?',
            'guide_title':'Tap on the chest and enter \nthe right combination of 2 digits',
            'input_title':'Enter passcode to unlock the Chest',
            'correct_title':'MISSION COMPLETED!',
            'correct_des':'The chest has been unlock. \nGot {0} reward Biggy now!',
            'congrats':'CONGRATS!',
            'input_wrong_title':'Think carefully and try again',
            'unlock_button':'UNLOCK',
            'claim_button':'CLAIM BIGGY',
            'popup_quit_title':'Keep patience',
            'popup_quit_body':'{0} Biggy reward is \nwaiting for you!',
            'continue':'Continue',
            'exit':'Exit',
        },
        'vi':{
            'title':'Truy tìm mật mã để mở khoá kho báu!',
            'hint':'Câu hỏi:',
            'question':'Big C đã có mặt tại bao nhiêu \ntỉnh thành tại Việt Nam?',
            'guide_title':'Chạm vào ổ khóa cái rương \nđể giải mật mã với 2 số.',
            'input_title':'Nhập mật mã để mở rương',
            'correct_title':'GIẢI MÃ THÀNH CÔNG!',
            'correct_des':'Chiếc rương đã được mở khóa thành công. \nBạn đã có {0} Biggy!',
            'congrats':'CHÚC MỪNG BẠN!',
            'input_wrong_title':'Hãy suy nghĩ thật kỹ và thử lại',
            'unlock_button':'MỞ KHÓA',
            'claim_button':'NHẬN BIGGY',
            'popup_quit_title':'Hãy kiên nhẫn',
            'popup_quit_body':'Phần thưởng {0} Biggy \nđang chờ bạn đó.',
            'continue':'Chơi tiếp',
            'exit':'Dừng lại',
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
    max_score: 5,
}