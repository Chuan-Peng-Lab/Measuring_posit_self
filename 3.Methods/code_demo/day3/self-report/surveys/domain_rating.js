/*
领域自评测量表(来自传鹏的博士毕业论文)
与其他同龄人相比，你觉得自己在以下方面处在什么水平？1=非常低，12=非常高
1） 能力
2） 身体吸引
3） 物质财富
4） 社交能力
5） 道德
*/ 
var domain_items= [
    "（1） 能力",
    "（2） 身体吸引",
    "（3） 物质财富",
    "（4） 社交能力",
    "（5） 道德",];


var domain_rating = {
    type: jsPsychSurveyTemplate,
  items:domain_items ,
    scale: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
    ],
    reverse: [
        false,
        false,
        false,
        false,
        false,
    ],
    scoring_index:1,
    instructions: `<p style = "font-size: 22px"></br></br></br></br>与其他同龄人相比，你觉得自己在以下方面处在什么水平？1=非常低，12=非常高</p>`,
    randomize_question_order: false,
    scale_repeat: 5,
    survey_width: 950,
    item_width: 50,
    on_finish: function (data) {
        var responses = data.responses;
        data.response = data.responses;
        $("body").css("cursor", "default");
    jsPsych.data.addProperties({
        domain_rating_1: responses.Q01, domain_rating_2: responses.Q02,
        domain_rating_3: responses.Q03, domain_rating_4: responses.Q04,
        domain_rating_5: responses.Q05,})
    }
    };