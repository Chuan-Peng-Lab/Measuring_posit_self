var selfReport_items = [
    { selfReport: "在填问卷时，我并没有太在意这些问题的实际含义。", },
    { selfReport: "在填问卷时，我回答问题的时候很粗心。", },
    { selfReport: "在填问卷时，我没有带着对自己的思考，就填写了问题。", },
    
]
var selfReport_items_copy = selfReport_items.slice();//复制一份
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var selfReport_items_sample = shuffle(selfReport_items).slice(0, 1);
var selfReport = [];
for (var i = 0; i < selfReport_items_sample.length; i++) {
    selfReport.push(selfReport_items_sample[i].selfReport);
    }


    var trap3 = {
        type: jsPsychSurveyTemplate,
        items: selfReport,
        scale: [
          "1",
          "2",
          "3",
          "4",
          "5",
         
        ],
        reverse: [
          false,//trap3
        ],
        scoring_index: 1,
        instructions: `<p style = "font-size: 22px">以下条目是描述您填写问卷过程中的行为或想法，请判断哪一等级的描述最符合您的实际情况。</p><p style = "font-size: 22px">1 代表“完全不同意”，2 代表“不同意”，</p>
        <p style = "font-size: 22px">3 代表“不确定”，4 代表“同意”，5 代表“完全同意”。</p>
        `,
       randomize_question_order: false,
        scale_repeat: 1,
        survey_width: 1250,
        item_width: 50,
        on_load: () => {
          $("body").css("cursor", "default");
        },
        on_finish: function (data) {
          var responses = data.responses;
          data.response = data.responses;
          data.trap3_item = selfReport_items_sample[0].selfReport;
          $("body").css("cursor", "default");
          jsPsych.data.addProperties({
            trap3: responses.Q01, 
           
          });
        }
      }