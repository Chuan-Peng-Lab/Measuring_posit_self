/**
* IM,Impression Management (bias toward pleasing others)
*
* IM的α系数为0.75-0.86
*
**/
IM_items =  [

    "如果迫不得已，我有时说些谎话。",
    "我从不掩盖自己的错误。",
    "我有过利用别人的时候。",
    "我从不咒骂别人。",
    "我有时想以牙还牙，不想原谅或忘记了事。",
    "我总是遵纪守法，即使不可能被发现也一样。",
    "我曾在背后说过朋友的坏话。",
    "当我看到别人进行私人谈话，我尽量避开以免听见。",
    "我曾悄悄收下多找给我的钱。",
    "在海关，我总是如数申报所有东西。",
    "小的时候，我有时偷东西。",
    "我从来不在街上扔脏东西。",
    "我有时超速驾车。",
    "我从来不看色情书刊。",
    "我做过一些谁也不知道的事。",
    "我从来不拿不属于自己的东西。",
    "我曾经在并没生病时，向单位或学校请病假。",
    "我从来没有损坏了图书馆的书或商店的东西而又不说的情况。",
    "我有些很不好的习惯。",
    "我不对别人的事情说长道短。"
  ];

var IM = {
  type: jsPsychSurveyTemplate,
  items: IM_items,
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
    true,//1
    false,//2
    true,//3
    false,  //4
    true,//5
    false,//6
    true,//7
    false,//8
    true,//9
    false,//10
    true,//11
    false,//12
    true,//13
    false,//14
    true,//15
    false,//16
    true,//17
    false,//18
    true,//19
    false,  //20
  ],
  scoring_index: 1,
  instructions: `<p style='color:white; font-size: 25px;'>以下条目是描述您在日常中的一些心理感受或做法，</p>
  <p style='color:white; font-size: 25px;'>请判断哪一等级的描述最符合您的实际情况，</p>
 <p style='color:white; font-size: 25px;'>1 代表 “完全不同意” ，4 代表 “不确定” ，7 代表 “非常同意”。</p>`,
 randomize_question_order: false,
  scale_repeat: 10,
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
      IM_1: responses.Q01, IM_2: responses.Q02,
      IM_3: responses.Q03, IM_4: responses.Q04,
      IM_5: responses.Q05,
      IM_6: responses.Q06, IM_7: responses.Q07,
      IM_8: responses.Q08, IM_9: responses.Q09,
      IM_10: responses.Q10, IM_11: responses.Q11,
      IM_12: responses.Q12, IM_13: responses.Q13,
      IM_14: responses.Q14, IM_15: responses.Q15,
      IM_16: responses.Q16, IM_17: responses.Q17,
      IM_18: responses.Q18, IM_19: responses.Q19,
      IM_20: responses.Q20,
     
    });
  }
}
