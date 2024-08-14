/**
* sde,Self-Deceptive Enhancement (honest but overly positive responding)
*
* SDE的α系数为0.68-0.80(汪向东等, 1999)。
*
**/
sde_items_1=[

  "我的第一印象往往被证明是正确的。",//1
  "对我来说，要改变任何不良习惯都很难。",//2
  "我无意去知道别人到底对我有什么看法。",//3
  "我并不总是忠实于自己。",//4
  "我总是很明白自己为什么会喜欢某些东西。",//5
  "我在情绪激动的时候，思维会出偏差。",//6
  "我一旦下了决心，别人很少能使我改变主意。",//7
  "超速行驶时，我不是一个安全可靠的驾驶者。",//8
  "我牢牢地把握着自己命运。",//9
  "我很难抛开烦扰人的想法。",//10
];
for (var i = 0; i < bogus_items_sample.length; i++) {
  sde_items_1.push(bogus_items_sample[i].bogus);
}
sde_items_2=[
  "我对自己的决定从不后悔。",//11
  "我有时因为犹豫不决而遭受损失。",//12
  "我之所以参加投票是因为它能起到作用。",//13
  "父母对我的责罚并非总是公平的。",//14
  "我是一个完全理智的人。",//15
  "我很少对别人的批评心怀感激。",//16
  "我对自己的判断非常自信。",//17
  "有的时候我怀疑自己充当情人的能力。",//18
  "假如有人正巧不喜欢我，这对我没什么。",//19
  "对于自己为什么要做某些事情，我并不总是十分明白。",//20
  
]
sde_items=sde_items_1.concat(sde_items_2);

var sde =  {
  timeline: [{
  type: jsPsychSurveyTemplate,
  items: sde_items,
  scale: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7"
  ],
  reverse: [
    false,//1
    true,//2
    false,//3
    true,//4
    false,//5
    true,//6
    false,//7
    true,// 8
    false,//9
    true,//10
false,// trap2
    false,//11
    true,// 12
    false,//13
    true,//14
    false,//15
    true,//16
    false, //17
    true,//18
    false,//19
    true,//20
    

  ],
  scoring_index: 1,
  instructions: `<p><div style='color:white; font-size: 25px;line-height: 20px;'>以下条目是描述您在日常中的一些心理感受或做法，</p>
  <p style='color:white; font-size: 25px;line-height: 20px;'>请判断哪一等级的描述最符合您的实际情况，</p>
  <p style='color:white; font-size: 25px;line-height: 20px;'>1 代表 “完全不同意” ，4 代表 “不确定” ，7 代表 “非常同意”。<br></div></p>`,
  randomize_question_order: false,
  scale_repeat: 11,
  survey_width: 950,
  item_width: 50,
  on_load: () => {
    $("body").css("cursor", "default");
  },
  on_finish: function (data) {
    var responses = data.responses;
    data.response = data.responses;
    data.trap2_item = bogus_items_sample[0].bogus;
    $('html,body').scrollTop(0);
    $("body").css("cursor", "default");
    jsPsych.data.addProperties({
      sde_1: responses.Q01, sde_2: responses.Q02,
      sde_3: responses.Q03, sde_4: responses.Q04,
      sde_5: responses.Q05,
      sde_6: responses.Q06, sde_7: responses.Q07,
      sde_8: responses.Q08, sde_9: responses.Q09,
      sde_10: responses.Q10, //10
      trap2:responses.Q11,//trap2,选1-3都是正确的
      sde_11: responses.Q12,//11
      sde_12: responses.Q13,//12
       sde_13: responses.Q14,//13
      sde_14: responses.Q15,//14
       sde_15: responses.Q16,//15
      sde_16: responses.Q17,
       sde_17: responses.Q18,
      sde_18: responses.Q19,
       sde_19: responses.Q20,
      sde_20: responses.Q21,//20
    });
  }
}],

}