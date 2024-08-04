/**
*selfesteem
*原版：
Rosenberg, M. (1965). Rosenberg self-esteem scale (RSE). Acceptance and commitment therapy. Measures package, 61(52), 18.
孙钦铃（2007）自尊量表的修订P26,修改了两个条目，先前研究表明原版条目8有争议，条目9,10疑似重复
*
*指导语：下面是一些关于我们对自己看法的句子，请根据你的真实情况作答，其中1代表很不符合；2代表不符合；3代表符合；4代表非常符合。
**/

var selfesteem = {
  type: jsPsychSurveyTemplate,
  items: [

    "我感到我是一个有价值的人，至少与其他人在同一水平。",

    "我感到我有许多好的品质。",

    "归根到底，我倾向于觉得自己是一个失败者。",

    "我能像大多数人一样把事情做好。",

    "我感到自己值得自豪的地方不多。",

    "我对自己持肯定态度。",

    "总的来说，我对自己是满意的。",

    "我要是能看得起自己就好了。",

    "我确实时常感到自己毫无用处。",

    "我时常认为自己一无是处。",

  ],
  scale: [
    "1",
    "2",
    "3",
    "4"
  ],
  reverse: [
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    true,
    true,
    true,

  ],
  scoring_index:1,
  instructions: `<p style = "font-size: 22px">下面是一些关于我们对自己看法的句子，请根据你的真实情况作答，</p>
  <p style = "font-size: 22px">其中 1 代表 “很不符合”；2 代表 “不符合”；3 代表 “符合”；4 代表 “非常符合”。</p>`,
  randomize_question_order: false,
  scale_repeat: 10,
  survey_width: 950,
  item_width: 50,
  on_finish: function (data) {
    var responses = data.responses;
    data.response = data.responses;
    $("body").css("cursor", "default");
    jsPsych.data.addProperties({
      ses_1: responses.Q01, ses_2: responses.Q02,
      ses_3: responses.Q03, ses_4: responses.Q04,
      ses_5: responses.Q05,
      ses_6: responses.Q06, ses_7: responses.Q07,
      ses_8: responses.Q08, ses_9: responses.Q09,
      ses_10: responses.Q10,
    });
  }
}
