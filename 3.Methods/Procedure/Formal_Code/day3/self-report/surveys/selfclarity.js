/**
*selfclarity
*
*题源：陈艳霞，（2021），自我关注与大学生社交焦虑的关系,
Campbell（1996），原版
翻译版：牛更枫（2016），青少年社交网站使用对自我概念清晰性的影响:社会比较的中介作用，该问卷共 12 个项目来测量个体自我概念的 清晰性和一致性（如，“我对自己的一些看法经常 相互冲突”）。该量表使用 5 点计分法，1 表示“完全不符”，5 表示“完全符合”，共 12 题，其中 6、11 采用正向计分题，其余题目均需反向计分。最终总分越高说明自我概念清晰性越高。徐海玲（2007）在其研究中使用过该量表，发现该量表信效度良好。该量表在冯泽雨（2010）相关研究中，也具备良好的信效度。本研究中该量表的 Cronbach's a 系数是 0.846。
*
**/

var selfclarity = {
    type: jsPsychSurveyTemplate,
    items: [

        "我对自己的看法常常和其他人对我的看法相冲突。",
    
        "关于自己，今天我有这样的想法，而明天我又会有另外的想法。",
    
        "我花很多的时间去考虑我到底是一个怎样的人。",
    
        "有些时候我感觉到我不是真正想成为的那个人。",
    
        "当我想到过去我是个什么样的人的时候，我不确定我过去到底是不是那样。",
    
        "我对自己各方面品质（如能力、脾气、性格等)的认识，很少感到冲突。",
    
        "有些时候我认为，我了解他人比了解自己的要多。",
    
        "我对自己的想法，变化的非常频繁。",
    
        "如果让我描述自己的品质（比如世界观、人生观、价值观、理想等），今天的描述很可能和昨天的不一样。",
    
        "即使我想告诉，我也不认为我会告诉其他人我真的想要什么。",
    
        "一般来讲，我清楚的知道我是谁、我是怎么样的人。",
    
        "我通常很难下决定，因为我真的不知道自己想要什么。",
    
    ],
    scale: [
      "1",
      "2",
      "3",
      "4",
        "5"
    ],
    reverse: [

       true,
    
       true,
    
       true,
    
       true,
    
       true,
    
       false,//6正向计分
    
       true,
    
       true,
    
       true,
    
       true,
    
       false,//11正向计分
    
       true,
    
    ],
    scoring_index:1,
    instructions: `<p><div style = "font-size: 25px">以下提及的是人们关于自己的一些看法，<br>这些描述并无好坏对错之分，请您按照自己的实际情况，<br>判断对下列所列的条目的赞同程度，<br>1 代表“非常不同意”，2 代表“比较不同意”，3 代表“不确定”，<br>4 代表“比较同意”，5 代表“非常同意”。</div> </p>`,
    randomize_question_order: false,
    scale_repeat: 6,
    survey_width: 950,
    item_width: 50,
    on_finish: function (data) {
      var responses = data.responses;
      data.response = data.responses;
      jsPsych.data.addProperties({
        selfclarity_1: responses.Q01, selfclarity_2: responses.Q02,
        selfclarity_3: responses.Q03, selfclarity_4: responses.Q04,
         selfclarity_5: responses.Q05,
        selfclarity_6: responses.Q06, selfclarity_7: responses.Q07,
        selfclarity_8: responses.Q08, selfclarity_9: responses.Q09,
        selfclarity_10: responses.Q10, selfclarity_11: responses.Q11,
        selfclarity_12: responses.Q12,
      });
  }
};