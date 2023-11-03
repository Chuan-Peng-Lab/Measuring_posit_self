/**
* SGPS，拖延问卷
*
* 张亚利等(2020)的中文翻译版的简版一般拖延量表（Short General Procrastination Scale，SGPS），由 9 个题目构成，属单维度测验，其中 3 个题目为反向计分。
题目采用李克特5 点计分（非常不符合~非常符合）。总分越高表明拖延倾向越明显。中文版的内部一致性信度为0.87，8周后的重测信度为0.77。
*
**/

var SGPS = {
  type: jsPsychSurveyTemplate,
  items: [

    "在完成截止日期临近的任务时， 我还经常浪费时间做其它事情。",

    "我经常说“明天再做”。",

    "我通常会提前完成任务。",

    "对于必须要做的事，我也会拖几天再做 。",

    "我会完成当天打算做的所有事情。",

    "我在晚上休息放松之前，通常会处理好当天需要做的一切事情。",

    "即使是容易做的简单事情，我也很少会在几天内把它完成。",

    "我经常在做几天前就该做的事情。",

    "即使是必需品，我通常也会拖到最后一刻才买。",

  ],
  scale: [
    "1",
    "2",
    "3",
    "4",
    "5"
  ],
  reverse: [

    false,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false

  ],
  scoring_index:1,
  instructions: `<p style='color:white; font-size:22px;line-height: 20px;'>下面是对您自身状况的一些描述， </p>
  <p style='color:white; font-size:22px;line-height: 20px;'>1代表“非常不符合”，2代表“基本不符合”，3代表“不确定”，</p>4代表“基本符合”，5代表“非常符合”。</p>
  <p style='color:white; font-size:22px;line-height: 20px;'>请判断哪一等级的描述最符合您的实际情况。</p>`,
  randomize_question_order: false,
  scale_repeat: 9,
  survey_width: 950,
  item_width: 50,
  on_finish: function (data) {
    var responses = data.responses;
    data.response = data.responses;
    $("body").css("cursor", "default");
    $('html,body').scrollTop(3000);
    jsPsych.data.addProperties({
      SGPS_1: responses.Q01, SGPS_2: responses.Q02,
      SGPS_3: responses.Q03, SGPS_4: responses.Q04,
      SGPS_5: responses.Q05,
      SGPS_6: responses.Q06, SGPS_7: responses.Q07,
      SGPS_8: responses.Q08, SGPS_9: responses.Q09,
      
    });
  }
}
