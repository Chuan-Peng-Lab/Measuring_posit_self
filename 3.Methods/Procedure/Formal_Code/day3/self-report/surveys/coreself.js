/**
* core self-evaluation questionnaire
*
* The core self-evaluation questionnaire is a 10-item measure 
*CSES,Judge,2003原版12题，r:reversed-score
杜建政,(2012)核心自我评价的结构验证及其量表修订,模型 3 是单因素模型，但只有删除项 目 A3 和 A9 后的 10 个项目负荷在单一因素上。
总分的范围为10-50分，分数越高说明被测者核心自我评价水平越高。该量表的内部一致性系数为0.83，分半信度为0.84，时隔3周的重测信度为0.82(N=70)
 大学生核心自我评价对创业意向的影响，[D]. 侯静怡.河南大学,2018（题目在此找到）
指导语：下面是对您自身状况的一些描述，1代表完全不同意，2代表不同意，3代表不确定，4代表同意，5代表完全同意。以下条目是描述您在日常中的一些心理感受或做法，请判断哪一等级的描述最符合您的实际情况，并将相应选项的数字打勾。
**/

var coreself = {
  type: jsPsychSurveyTemplate,
  items: [

    "我相信自己在生活中能获得成功。",

    "我经常感到情绪低落。",

    "失败时，我感觉自己很没用。",

    "我能成功地完成各项任务。",

    "我觉得自己对学习没有把握。",

    "总的来说，我对自己满意。",

    "我怀疑自己的能力。",

    "我觉得自己对事业上的成功没有把握。",

    "我有能力处理自己的大多数问题。",

    "很多事情我都觉得很糟糕、没有希望。",

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
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,

  ],
  scoring_index:1,
  instructions: `<p style = "font-size: 22px">下面是对您自身状况的一些描述，1 代表“完全不同意”，2 代表“不同意”，</p>
  <p style = "font-size: 22px">3 代表“不确定”，4 代表“同意”，5 代表“完全同意”。</p>
  <p style = "font-size: 22px">以下条目是描述您在日常中的一些心理感受或做法，请判断哪一等级的描述最符合您的实际情况。</p>`,
  randomize_question_order: false,
  scale_repeat: 10,
  survey_width: 950,
  item_width: 50,
  on_finish: function (data) {
    var responses = data.responses;
    data.response = data.responses;
    $("body").css("cursor", "default");
    jsPsych.data.addProperties({
      coreself_1: responses.Q01, coreself_2: responses.Q02,
      coreself_3: responses.Q03, coreself_4: responses.Q04,
      coreself_5: responses.Q05,
      coreself_6: responses.Q06, coreself_7: responses.Q07,
      coreself_8: responses.Q08, coreself_9: responses.Q09,
      coreself_10: responses.Q10,
    });
  }
}
