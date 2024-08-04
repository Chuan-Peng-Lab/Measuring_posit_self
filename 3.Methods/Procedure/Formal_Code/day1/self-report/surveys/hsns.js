/**
*hsns
*隐性自恋量表是单维度的


*
*
**/
hsns_items_1 =  [

    "当想到我的健康、我的事业或者我的人际关系等有关我个人的事情时，我能够全身心地投入到思考之中。",//1

    "我很容易被别人的讥笑或者别人轻微的评论所伤害。",//2

    "当我走进一个房间，我总感觉到其他人都在注视我。",//3

    "我不喜欢和其他人分享成功的荣誉。",//4

    "我不喜欢参与到一个组织里，除非我知道那个组织里有至少一个人赏识我。",//5
]; 
 for (var i = 0; i < selected_items_sample.length; i++) {
  hsns_items_1.push(selected_items_sample[i].selection);
  }
 
hsns_items_2 =  [
    "我感觉到我的性格和大多数人不一样。",//6

    "我经常以我个人的方式去解释其他人的评论。",//7

    "我很容易沉浸在我自己的兴趣之中而忘记其他人的存在。",//8

    "我认为我不需要担心其他人的烦恼。",//9

    "当有困难的人想占用我的时间、向我寻求同情时，我就悄悄地走开。",//10

  ];

hsns_items=hsns_items_1.concat(hsns_items_2);
var hsns = {
  type: jsPsychSurveyTemplate2,
  items:hsns_items,
  scale: [
    "1",
    "2",
    "3",
    "4",
    "5"
  ],
  reverse: [
   false,//1
   false,//2
   false,//3
   false,//4
   false,//5
   false,//trap1
   false,//6
   false,//7
   false,//8
   false,//9
   false,//10

  ],
  scoring_index:1,
  instructions: `<p style='color:white; font-size:22px;line-height: 20px;'>在“1”到“5”中选择最能表示您的真实状态的水平。</p>
  <p style='color:white; font-size:22px;line-height: 20px;'>“1”代表“不符合”；“2”代表“有点不符合”；“3”代表“不能确定”；</p>
  <p style='color:white; font-size: 22px;line-height: 20px;'>“4”代表“有点符合”；“5”代表“符合”。</p>`,
  randomize_question_order: false,
  scale_repeat: 11,
  survey_width: 950,
  item_width: 50,
  required:false,
  on_finish: function (data) {
    var responses = data.responses;
    data.response = data.responses;
    data.correct_answer=selected_items_sample[0].correct_answer;
    data.correct=selected_items_sample[0].correct_answer==responses.Q06?1:0;
    data.trap1_item = selected_items_sample[0].selection;
    $("body").css("cursor", "default");
    jsPsych.data.addProperties({
      hsns_1: responses.Q01, hsns_2: responses.Q02,
      hsns_3: responses.Q03, hsns_4: responses.Q04,
      hsns_5: responses.Q05,
      trap1:responses.Q06,//trap1,对应的选项才正确
      hsns_6: responses.Q07,
       hsns_7: responses.Q08,
      hsns_8: responses.Q09,
       hsns_9: responses.Q10,
      hsns_10: responses.Q11,
    });
  }
}
