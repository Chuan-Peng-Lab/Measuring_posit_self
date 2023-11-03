/**
* LOT-R
*
* 采用温娟娟等(2007)修订的中文版“生活取向测验修订版（LOT-R）”，测验包含6个条目，乐观与悲观两个维度，使用李克特五点评分（1 = 非常不同意，2 = 不同意，3 = 不确定，4 = 同意，5 = 非常同意）。乐观倾向维度有 3 个条目，得分越高个体的乐观倾向越高；悲观倾向维度有 3 个条目，得分越高个体的悲观倾向越高。将 悲观维度反向计分后与乐观维度得分相加得到个体乐观人格总分，得分越高越乐观。修订后的量表具有较好的信度和效度，内部一致性 Cronbach α 为 0.78，重测信度为 0.79， 与 LOT 的相关系数为 0.95。
题源：高校教师工作压力、乐观人格、心理控制源与睡 眠质量的关系
*
**/

var lot = {
  type: jsPsychSurveyTemplate,
  items: [

    "在不确定的情况下，我常常期望最好的结果。",//乐观

    "对我来说，如果事情有出错的可能，那么实际上就会出差错。",//悲观

    "我对自己的未来充满乐观。",//乐观

    "我从不期望事情会朝我希望的方向发展。",//悲观

    "我从不指望好事情会发生在我身上。",//悲观

    "总体来说，我更期望好的事情而不是坏事情，发生在我身上。",//乐观

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

    false,

    true,

    true,

    false,

  ],
  scoring_index:1,
  instructions: `<p><div style='color:white; font-size: 25px'>以下条目是描述您在日常中的一些心理感受或做法，</div>
  <div style='color:white; font-size: 25px'>请判断哪一等级的描述最符合您的实际情况，</div>
  <div style='color:white; font-size: 25px'>1 代表 “非常不同意”，2 代表 “不同意”，3 代表 “不确定”，</div>
  <div style='color:white; font-size: 25px'>4 代表 “有些同意”，5 代表 “非常同意”。</div></p>`,
  randomize_question_order: false,
  scale_repeat: 6,
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
      LOT_1: responses.Q01, LOT_2: responses.Q02,
      LOT_3: responses.Q03, LOT_4: responses.Q04,
      LOT_5: responses.Q05,
      LOT_6: responses.Q06,
    });
  }
}
