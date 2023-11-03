/**
* 采用何筱衍等人(2010)翻译的中文版的广泛性焦虑量表（GAD-7），它的内部一致性α系数为0.898，初次测评后的7~14天内的重测信度为0.856。
回答种类“完全不会”、“好几天”、“一半以上的天数”和“几乎每天”分别相对应 0、1、2、3分。
GAD-7总分范围为0～21分。分值 5、10、15分别对应代表“轻度”、“中度”、“重度”焦虑程度分界值。
*
**/

var gad = {
    type: jsPsychSurveyTemplate,
    items: [

        "感觉紧张、焦虑或烦躁。",
    
        "不能停止或控制担忧。",
    
        "对各种各样的事情担忧过多。",
    
        "很难放松下来。",
    
        "由于不安而无法静坐。",
    
        "变得容易烦恼或急躁。",
    
        "害怕将有可怕的事发生。",
    
    ],
    scale: [
      "0",
      "1",
      "2",
      "3",
      
    ],
    reverse: [

       false,
    
       false,
    
       false,
    
       false,
    
       false,
    
       false,
    
       false,
    
    ],
    instructions: `<p><div style = "font-size: 25px">在过去两个星期，有多少时候您被以下问题所困扰，请在数字上圈选，<br> 0 代表"完全不会"，1 代表"好几天"，2 代表"一半以上的天数"，3 代表"几乎每天"。</div> </p>`,
    randomize_question_order: false,
    scale_repeat: 7,
    survey_width: 950,
    item_width: 50,
    on_finish: function (data) {
      var responses = data.responses;
      data.response = data.responses;
      jsPsych.data.addProperties({
        gad_1: responses.Q01, gad_2: responses.Q02,
        gad_3: responses.Q03, gad_4: responses.Q04,
         gad_5: responses.Q05,
        gad_6: responses.Q06, gad_7: responses.Q07,
         
      });
  }
  }
  