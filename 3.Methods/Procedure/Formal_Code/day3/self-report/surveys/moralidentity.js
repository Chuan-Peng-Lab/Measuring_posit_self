/**滕召军.(2018).暴力电子游戏对青少年道德认知的影响(博士学位论文,西南大学)，初一761名，高一877名，α=0.71 （引用了万增奎的，但是特质词用的：关心他人的、富有同情心的、公平的、有好的、慷慨的、乐于助人的、勤奋的、诚实的、善良的）[P40,道德认同量表采用 Aquino 和 Reed (2002)编制的 10 条目有关道德重要性的量表。国内学者对该量表的中文版的信效度进行了验证（万增奎,  杨韶刚,  2008）。该量表列举了九个可用来描述一个人特征的词语：关心他人的、富有同情心的、公平的、友好的、慷慨的、乐于助人的、勤奋的、诚实的、善良的。
要求被试对这些词汇对自我的重要性程度进行评价。举例条目―做一个有如上品质的人会让我感觉很好‖，采用 5 点量表进行评分，1 =  非常不符合，5 =  非常符合。本研究中，该问卷的内部一致性系数为  0.71。]一是内隐维度,表现为道德特质在自我感中重要性的评价,即自我对道德特质的内在认同,反映了一系列的道德特质是否处在自我概念的核心,与自我价值感的“内在自我”
相对应;二是外显性维度,表现为个人希望在人际互动中表现自我拥有道德特质的程度,主要是看这些特质是否在外显的行为中表现出来,与公共的“外在自我”相对应


*moralidentity
*
**/

var moralidentity = {
  type: jsPsychSurveyTemplate,
  items: [

    "做一个有如上品质的人会让我感觉很好。",//内隐

    "成为拥有这些特征的人对我来说很重要。",//内隐

    "我会因为有如上品质而羞耻。",//内隐,R

    "我认为这些品质对我不是十分重要。",//内隐,R

    "我强烈地渴望具有这些特征。",//内隐

    "我的着装打扮使我看上去是这样的人。",//外显

    "我在空闲时间做的事情能清楚的反映我有如上品质。",//外显

    "我读的书、杂志能清楚地表现出我有如上品质。",//外显

    "我积极参加能表现这些品质的活动。",//外显

    "在我的工作、学习中，平时别人知道我拥有这些特征。",//外显

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

    true,//R

    true,//R

    false,

    false,

    false,

    false,

    false,

    false,

  ],
  scoring_index: 1,
  instructions: `<p><div style='color:white; font-size: 22px;'>下列词语是用来描述一个人的特征的：</p>
  <p style='color:white; font-size: 22px;'>关心他人的、富有同情心的、公平的、友好的、慷慨的、乐于助人的、勤奋的、诚实的、善良的。</p>
  <p style='color:white; font-size: 22px;'>拥有这些品质的人可能是你，也可能是他人。</p>
  <p style='color:white; font-size: 22px;'>现在在你的头脑中想象这样一个人，想像这个人怎么思考、生活和行为。</p>
  <p style='color:white; font-size: 22px;'>当在脑海中对他（她）有一个栩栩如生的形象时，回答下列问题。</p>
  <p style='color:white; font-size: 22px;'>（1：非常不符合；2：不太符合；3:不确定；4：比较符合；5：非常符合）</div></p>`,
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
    $('html,body').scrollTop(0);
    jsPsych.data.addProperties({
      MorIden_1: responses.Q01, MorIden_2: responses.Q02,
      MorIden_3: responses.Q03, MorIden_4: responses.Q04,
      MorIden_5: responses.Q05,
      MorIden_6: responses.Q06, MorIden_7: responses.Q07,
      MorIden_8: responses.Q08, MorIden_9: responses.Q09,
      MorIden_10: responses.Q10,
    });
  }
}
