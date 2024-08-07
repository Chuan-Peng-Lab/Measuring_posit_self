/**
* PHQ9
*
* 采用卞崔冬等(2009)翻译的中文版抑郁障碍量表（PHQ-9），
回答种类包括“完全不会”、“几日”、“一半以上的日子”、及“几乎每日”分别相对应0、1、2、3分值。
PHQ-9总分值范围从0～27分。分值5、10、15、20分别相对应代表轻、中、中重、重度抑郁分界值。
*
**/

var phq = {
    type: jsPsychSurveyTemplate,
    items: [

        "做事时提不起劲或没有兴趣。",
    
        "感到心情低落、沮丧或绝望。",
    
        "入睡困难、睡不安或睡眠过多。",
    
        "感觉疲倦或没有活力。",
    
        "食欲不振或吃太多。",
    
        "觉得自己很糟—或觉得自己很失败，或让自己或家人失望。",
    
        "对事物专注有困难，例如阅读报纸或看电视。",
    
        "动作或说话速度缓慢到别人已经察觉，或正好相反—烦躁或坐立不安、动来动去的情况更胜于平常。",
    
        "有不如死掉或用某种方式伤害自己的念头。",
    
    ],
    scale: [
      "0",
      "1",
      "2",
      "3"
    ],
    reverse: [

       false,
    
       false,
    
       false,
    
       false,
    
       false,
    
       false,
    
       false,
    
       false,
    
       false,
    
    ],
    instructions: `<p><div style = "font-size: 25px">在过去两个星期，有多少时候您被以下问题所困扰，请在数字上圈选，<br>0 代表"完全不会"，1 代表"好几天"，2 代表"一半以上的天数"，3 代表"几乎每天"。</div> </p>`,
    randomize_question_order: false,
    scale_repeat: 9,
    survey_width: 950,
    item_width: 50,
    on_finish: function (data) {
      var responses = data.responses;
      data.response = data.responses;
      jsPsych.data.addProperties({
        phq_1: responses.Q01, phq_2: responses.Q02,
        phq_3: responses.Q03, phq_4: responses.Q04,
         phq_5: responses.Q05,
        phq_6: responses.Q06, phq_7: responses.Q07,
        phq_8: responses.Q08, phq_9: responses.Q09,
       
      });
  }
  }
  