


window.localize = {
    data: {
        'en':{
            'title':'TRY YOUR LUCK WITH THE',
            'name':'LUCKY WHEEL',
            'guide_title':'You have 01 spinning turn',
            'popup_quit_title':'Keep patience',
            'popup_quit_body':'{0} Biggy reward is waiting for you!',
            'continue':'Continue',
            'exit':'Exit'
        },
        'vi':{
            'title':'HÃY THỬ VẬN MAY CỦA BẠN',
            'name':'VÒNG XOAY MAY MẮN',
            'guide_title':'Bạn có 1 lượt để quay',
            'popup_quit_title':'Hãy kiên nhẫn',
            'popup_quit_body':'Phần thưởng {0} Biggy đang chờ bạn đó.',
            'continue':'Chơi tiếp',
            'exit':'Dừng lại'
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