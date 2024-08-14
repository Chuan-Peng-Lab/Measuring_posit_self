/**
* 生活满意度量表
*
* 单维生活满意度量表，由 Diener 等人（1985）编制，一共包含五个项目，采用里克特五点量表评定法。从 1 到 7 分别表示非常不同意、不同意、有点不同意、中立、有点同意、
同意和非常同意。得分之和即为个体总的生活满意度。得分越高，说明个体对自己的生活越满意。内部一致性系数 R 在 0.61~0.81 之间，证明量表拥有良好的信效度（Diener, 1985）。
本研究中，生活满意度总量表信度为 0.855。(陈振圻, 2020)

**/

var swb = {
  type: jsPsychSurveyTemplate,
  items: [

    "我的生活大致符合我的理想。",

    "我的生活状况非常圆满。",

    "我对我的生活很满意。",

    "直到现在为止，我已经得到了我在生活上想要拥有的重要东西。",

    "如果我能重新活过，我基本上不会做任何改变。",

  ],
  scale: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
  ],
  reverse: [
    false,

    false,

    false,

    false,

    false,

  ],
  scoring_index: 1,
  instructions: `<p style='color:white; font-size: 25px'>下面有一些句子，描述了您对自己生活的评价情况。</p>
  <p style='color:white; font-size: 25px'>请根据自己的真实情况选择最符合自己的选项，</p>
  <p style='color:white; font-size: 25px'>1 代表 “非常不同意”，2 代表 “不同意”，3 代表 “有点不同意”，4 代表 “中立”，</p>
  <p style='color:white; font-size: 25px'> 5 代表 “有点同意”，6 代表 “同意”，7 代表 “非常同意”。</p>`,
  randomize_question_order: false,
  scale_repeat: 5,
  survey_width: 950,
  item_width: 50,
  on_load: () => {
    $("body").css("cursor", "default");
  },
  on_finish: function (data) {
    var responses = data.responses;
    data.response = data.responses;
    $("body").css("cursor", "default");
    jsPsych.data.addProperties({
      swb_1: responses.Q01, swb_2: responses.Q02,
      swb_3: responses.Q03, swb_4: responses.Q04,
      swb_5: responses.Q05,

    });
  }
}
