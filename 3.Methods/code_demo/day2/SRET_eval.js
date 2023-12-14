/*const jsPsych = initJsPsych({
  auto_update_progress_bar: true,
   extensions: {
     type: naodao,
   }
   on_finish: function() {
    jsPsych.data.get().localSave('csv', 'SRET' + info["ID"] +'_'+ '.csv'); 
    //document.exitFullscreen(); // 退出全屏
    //let bodyNode = document.getElementsByTagName("body"); // 获取Body窗体
          }
   });*/

var Q_math = [
  { math: "1+1= ?", correct_answer: "2" },
  { math: "1+2= ?", correct_answer: "3" },
  { math: "9-1= ?", correct_answer: "8" },
  { math: "1+8= ?", correct_answer: "9" },
  { math: "1+7= ?", correct_answer: "8" },
  { math: "1+6= ?", correct_answer: "7" },
  { math: "1+8= ?", correct_answer: "9" },
  { math: "2+1= ?", correct_answer: "3" },
  { math: "2+2= ?", correct_answer: "4" },
  { math: "2+3= ?", correct_answer: "5" },
  { math: "2+4= ?", correct_answer: "6" },
  { math: "2+5= ?", correct_answer: "7" },
  { math: "2+6= ?", correct_answer: "8" },
  { math: "2+7= ?", correct_answer: "9" },
  { math: "9-2= ?", correct_answer: "7" },
  { math: "9-3= ?", correct_answer: "6" },
  { math: "3+1= ?", correct_answer: "4" },
  { math: "3+2= ?", correct_answer: "5" },
  { math: "3+3= ?", correct_answer: "6" },
  { math: "3+4= ?", correct_answer: "7" },
  { math: "3+5= ?", correct_answer: "8" },
  { math: "3+6= ?", correct_answer: "9" },
  { math: "9-4= ?", correct_answer: "5" },
  { math: "9-5= ?", correct_answer: "4" },
  { math: "9-6= ?", correct_answer: "3" },
  { math: "4+1= ?", correct_answer: "5" },
  { math: "4+2= ?", correct_answer: "6" },
  { math: "4+3= ?", correct_answer: "7" },
  { math: "4+4= ?", correct_answer: "8" },
  { math: "4+5= ?", correct_answer: "9" },
  { math: "9-7= ?", correct_answer: "2" },
  { math: "9-8= ?", correct_answer: "1" },
  { math: "9-9= ?", correct_answer: "0" },
  { math: "8-1= ?", correct_answer: "7" },
  { math: "5+1= ?", correct_answer: "6" },
  { math: "5+2= ?", correct_answer: "7" },
  { math: "5+3= ?", correct_answer: "8" },
  { math: "5+4= ?", correct_answer: "9" },
  { math: "8-2= ?", correct_answer: "6" },
  { math: "8-3= ? ", correct_answer: "5" },
  { math: "8-4= ?", correct_answer: "4" },
  { math: "8-5= ?", correct_answer: "3" },
  { math: "8-6= ?", correct_answer: "2" },
  { math: "6+1= ?", correct_answer: "7" },
  { math: "6+2= ?", correct_answer: "8" },
  { math: "6+3= ?", correct_answer: "9" },
  { math: "7+1= ?", correct_answer: "8" },
  { math: "7+2= ?", correct_answer: "9" },
  { math: "8+1= ?", correct_answer: "9" },
  { math: "1-1= ?", correct_answer: "0" },
  { math: "3*2= ?", correct_answer: "6" },
  { math: "3*3= ?", correct_answer: "9" },
  { math: "4/4= ?", correct_answer: "1" },
  { math: "9/3= ?", correct_answer: "3" },
  { math: "8/4= ?", correct_answer: "2" },
  { math: "6/2= ?", correct_answer: "3" },
  { math: "5/1= ?", correct_answer: "5" },
  { math: "32-23= ?", correct_answer: "9" },
  { math: "15-10= ?", correct_answer: "5" },
  { math: "16-11= ?", correct_answer: "5" },
  { math: "14-9= ?", correct_answer: "5" },
  { math: "13-6= ?", correct_answer: "7" },
  { math: "12-5= ?", correct_answer: "7" },
  { math: "11-4= ?", correct_answer: "7" },
  { math: "10-5= ?", correct_answer: "5" },
  { math: "11-3= ?", correct_answer: "8" },
  { math: "20/5= ?", correct_answer: "4" },
  { math: "21/7=  ?", correct_answer: "3" },
  { math: "22/11= ?", correct_answer: "2" },
  { math: "29-27= ?", correct_answer: "2" },
  { math: "30-29= ?", correct_answer: "1" },
  { math: "90/45= ?", correct_answer: "2" },
  { math: "81/9= ?", correct_answer: "9" },
  { math: "72/9= ?", correct_answer: "8" },
  { math: "56/7= ?", correct_answer: "8" },
  { math: "49/7 = ?", correct_answer: "7" },
  { math: "43-34= ?", correct_answer: "9" },
  { math: "32-32= ?", correct_answer: "0" },
  { math: "50-42= ?", correct_answer: "8" },
  { math: "4*2= ?", correct_answer: "8" },
  { math: "3*1= ?", correct_answer: "3" },
  { math: "2*4= ?", correct_answer: "8" },
  { math: "4*1= ?", correct_answer: "4" },
  { math: "5*0= ?", correct_answer: "0" },
  { math: "6*0= ?", correct_answer: "0" },
  { math: "7*0= ?", correct_answer: "0" },
  { math: "12/4= ?", correct_answer: "3" },
  { math: "12/6= ?", correct_answer: "2" },
  { math: "12/12= ?", correct_answer: "1" },
  { math: "13-9= ?", correct_answer: "4" },
  { math: "22-22= ?", correct_answer: "0" },
  { math: "21/3= ? ", correct_answer: "7" },
  { math: "18/9= ?", correct_answer: "2" },
  { math: "18/2= ?", correct_answer: "9" },
  { math: "13-5= ?", correct_answer: "8" },
  { math: "12-12= ?", correct_answer: "0" },
  { math: "19-17= ?", correct_answer: "2" },
  { math: "17-12= ? ", correct_answer: "5" },
  { math: "3+0= ?", correct_answer: "3" },
  { math: "11-8= ?", correct_answer: "3" },
  { math: "11-5= ?", correct_answer: "6" },
  { math: "2*3= ?", correct_answer: "6" },
  { math: "1*9= ?", correct_answer: "9" },
  { math: "1*8= ?", correct_answer: "8" },
  { math: "8*1= ?", correct_answer: "8" },
  { math: "10-9= ?", correct_answer: "1" },
  { math: "7*1=  ?", correct_answer: "7" },
  { math: "12-7= ?", correct_answer: "5" },
  { math: "5-3= ?", correct_answer: "2" },
];
var Q_math_copy = Q_math.slice();//复制一份
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

var Q_math_sample = shuffle(Q_math).slice(0, 108);


//160 for formal analysis，4 for ew_exercise, 4 old+ 4 new for rj_exercise,4 head+ 4 tail干扰词 for ew_formal
var all_words = [
  { Words: "能干", Domain: "ability", Valence: "Positive" },
  { Words: "上进", Domain: "ability", Valence: "Positive" },
  { Words: "全才", Domain: "ability", Valence: "Positive" },
  { Words: "高效", Domain: "ability", Valence: "Positive" },
  { Words: "精干", Domain: "ability", Valence: "Positive" },
  { Words: "果断", Domain: "ability", Valence: "Positive" },
  { Words: "沉着", Domain: "ability", Valence: "Positive" },
  { Words: "周到", Domain: "ability", Valence: "Positive" },
  { Words: "扎实", Domain: "ability", Valence: "Positive" },
  { Words: "干练", Domain: "ability", Valence: "Positive" },
  { Words: "博识", Domain: "ability", Valence: "Positive" },
  { Words: "无敌", Domain: "ability", Valence: "Positive" },
  { Words: "独立", Domain: "ability", Valence: "Positive" },
  { Words: "智慧", Domain: "ability", Valence: "Positive" },
  { Words: "博学", Domain: "ability", Valence: "Positive" },
  { Words: "学霸", Domain: "ability", Valence: "Positive" },
  { Words: "远见", Domain: "ability", Valence: "Positive" },
  { Words: "娴熟", Domain: "ability", Valence: "Positive" },
  { Words: "高明", Domain: "ability", Valence: "Positive" },
  { Words: "毅力", Domain: "ability", Valence: "Positive" },
  { Words: "勤奋", Domain: "ability", Valence: "Positive" },
  { Words: "聪明", Domain: "ability", Valence: "Positive" },
  { Words: "专注", Domain: "ability", Valence: "Positive" },
  { Words: "稳健", Domain: "ability", Valence: "Positive" },
  { Words: "变通", Domain: "ability", Valence: "Positive" },
  { Words: "有力", Domain: "ability", Valence: "Positive" },
  { Words: "自律", Domain: "ability", Valence: "Positive" },
  { Words: "骁勇", Domain: "ability", Valence: "Positive" },
  { Words: "果决", Domain: "ability", Valence: "Positive" },
  { Words: "细心", Domain: "ability", Valence: "Positive" },
  { Words: "努力", Domain: "ability", Valence: "Positive" },
  { Words: "懂行", Domain: "ability", Valence: "Positive" },
  { Words: "刻苦", Domain: "ability", Valence: "Positive" },
  { Words: "敏捷", Domain: "ability", Valence: "Positive" },
  { Words: "坚持", Domain: "ability", Valence: "Positive" },
  { Words: "顶事", Domain: "ability", Valence: "Positive" },
  { Words: "利落", Domain: "ability", Valence: "Positive" },
  { Words: "肯干", Domain: "ability", Valence: "Positive" },
  { Words: "思辨", Domain: "ability", Valence: "Positive" },
  { Words: "中用", Domain: "ability", Valence: "Positive" },

  { Words: "无能", Domain: "ability", Valence: "Negative" },
  { Words: "依靠", Domain: "ability", Valence: "Negative" },
  { Words: "废物", Domain: "ability", Valence: "Negative" },
  { Words: "拙笨", Domain: "ability", Valence: "Negative" },
  { Words: "新手", Domain: "ability", Valence: "Negative" },
  { Words: "业余", Domain: "ability", Valence: "Negative" },
  { Words: "愚钝", Domain: "ability", Valence: "Negative" },
  { Words: "盲目", Domain: "ability", Valence: "Negative" },
  { Words: "浅薄", Domain: "ability", Valence: "Negative" },
  { Words: "无知", Domain: "ability", Valence: "Negative" },
  { Words: "毛糙", Domain: "ability", Valence: "Negative" },
  { Words: "外行", Domain: "ability", Valence: "Negative" },
  { Words: "草率", Domain: "ability", Valence: "Negative" },
  { Words: "怠惰", Domain: "ability", Valence: "Negative" },
  { Words: "马虎", Domain: "ability", Valence: "Negative" },
  { Words: "无为", Domain: "ability", Valence: "Negative" },
  { Words: "昏庸", Domain: "ability", Valence: "Negative" },
  { Words: "庸碌", Domain: "ability", Valence: "Negative" },
  { Words: "差生", Domain: "ability", Valence: "Negative" },
  { Words: "拖拉", Domain: "ability", Valence: "Negative" },
  { Words: "屈才", Domain: "ability", Valence: "Negative" },
  { Words: "无助", Domain: "ability", Valence: "Negative" },
  { Words: "逞能", Domain: "ability", Valence: "Negative" },
  { Words: "弱智", Domain: "ability", Valence: "Negative" },
  { Words: "窝囊", Domain: "ability", Valence: "Negative" },
  { Words: "迂拙", Domain: "ability", Valence: "Negative" },
  { Words: "驽钝", Domain: "ability", Valence: "Negative" },
  { Words: "粗心", Domain: "ability", Valence: "Negative" },
  { Words: "愚痴", Domain: "ability", Valence: "Negative" },
  { Words: "迟钝", Domain: "ability", Valence: "Negative" },
  { Words: "愚蠢", Domain: "ability", Valence: "Negative" },
  { Words: "畏难", Domain: "ability", Valence: "Negative" },
  { Words: "短视", Domain: "ability", Valence: "Negative" },
  { Words: "短浅", Domain: "ability", Valence: "Negative" },
  { Words: "逞强", Domain: "ability", Valence: "Negative" },
  { Words: "独断", Domain: "ability", Valence: "Negative" },
  { Words: "笨蛋", Domain: "ability", Valence: "Negative" },
  { Words: "拖延", Domain: "ability", Valence: "Negative" },
  { Words: "才尽", Domain: "ability", Valence: "Negative" },
  { Words: "犹豫", Domain: "ability", Valence: "Negative" },

  { Words: "高尚", Domain: "morality", Valence: "Positive" },
  { Words: "诚信", Domain: "morality", Valence: "Positive" },
  { Words: "善良", Domain: "morality", Valence: "Positive" },
  { Words: "君子", Domain: "morality", Valence: "Positive" },
  { Words: "廉正", Domain: "morality", Valence: "Positive" },
  { Words: "敬业", Domain: "morality", Valence: "Positive" },
  { Words: "无私", Domain: "morality", Valence: "Positive" },
  { Words: "义气", Domain: "morality", Valence: "Positive" },
  { Words: "厚道", Domain: "morality", Valence: "Positive" },
  { Words: "清廉", Domain: "morality", Valence: "Positive" },
  { Words: "忠义", Domain: "morality", Valence: "Positive" },
  { Words: "淡泊", Domain: "morality", Valence: "Positive" },
  { Words: "廉明", Domain: "morality", Valence: "Positive" },
  { Words: "高洁", Domain: "morality", Valence: "Positive" },
  { Words: "忠良", Domain: "morality", Valence: "Positive" },
  { Words: "慈悲", Domain: "morality", Valence: "Positive" },
  { Words: "守信", Domain: "morality", Valence: "Positive" },
  { Words: "坦荡", Domain: "morality", Valence: "Positive" },
  { Words: "热心", Domain: "morality", Valence: "Positive" },
  { Words: "孝顺", Domain: "morality", Valence: "Positive" },
  { Words: "好心", Domain: "morality", Valence: "Positive" },
  { Words: "刚正", Domain: "morality", Valence: "Positive" },
  { Words: "守时", Domain: "morality", Valence: "Positive" },
  { Words: "奉献", Domain: "morality", Valence: "Positive" },
  { Words: "正气", Domain: "morality", Valence: "Positive" },
  { Words: "仁爱", Domain: "morality", Valence: "Positive" },
  { Words: "忠诚", Domain: "morality", Valence: "Positive" },
  { Words: "慷慨", Domain: "morality", Valence: "Positive" },
  { Words: "谦逊", Domain: "morality", Valence: "Positive" },
  { Words: "礼貌", Domain: "morality", Valence: "Positive" },
  { Words: "仗义", Domain: "morality", Valence: "Positive" },
  { Words: "文明", Domain: "morality", Valence: "Positive" },
  { Words: "仁厚", Domain: "morality", Valence: "Positive" },
  { Words: "侠义", Domain: "morality", Valence: "Positive" },
  { Words: "爱国", Domain: "morality", Valence: "Positive" },
  { Words: "勤恳", Domain: "morality", Valence: "Positive" },
  { Words: "守法", Domain: "morality", Valence: "Positive" },
  { Words: "善心", Domain: "morality", Valence: "Positive" },
  { Words: "忠勇", Domain: "morality", Valence: "Positive" },
  { Words: "宽容", Domain: "morality", Valence: "Positive" },

  { Words: "缺德", Domain: "morality", Valence: "Negative" },
  { Words: "卑鄙", Domain: "morality", Valence: "Negative" },
  { Words: "不孝", Domain: "morality", Valence: "Negative" },
  { Words: "不仁", Domain: "morality", Valence: "Negative" },
  { Words: "小人", Domain: "morality", Valence: "Negative" },
  { Words: "黑心", Domain: "morality", Valence: "Negative" },
  { Words: "失信", Domain: "morality", Valence: "Negative" },
  { Words: "虚伪", Domain: "morality", Valence: "Negative" },
  { Words: "奸险", Domain: "morality", Valence: "Negative" },
  { Words: "无耻", Domain: "morality", Valence: "Negative" },
  { Words: "伪善", Domain: "morality", Valence: "Negative" },
  { Words: "混账", Domain: "morality", Valence: "Negative" },
  { Words: "贪腐", Domain: "morality", Valence: "Negative" },
  { Words: "奸诈", Domain: "morality", Valence: "Negative" },
  { Words: "腐败", Domain: "morality", Valence: "Negative" },
  { Words: "蛇蝎", Domain: "morality", Valence: "Negative" },
  { Words: "自私", Domain: "morality", Valence: "Negative" },
  { Words: "偏私", Domain: "morality", Valence: "Negative" },
  { Words: "下流", Domain: "morality", Valence: "Negative" },
  { Words: "龌龊", Domain: "morality", Valence: "Negative" },
  { Words: "低劣", Domain: "morality", Valence: "Negative" },
  { Words: "势利", Domain: "morality", Valence: "Negative" },
  { Words: "歹毒", Domain: "morality", Valence: "Negative" },
  { Words: "拜金", Domain: "morality", Valence: "Negative" },
  { Words: "利己", Domain: "morality", Valence: "Negative" },
  { Words: "恶劣", Domain: "morality", Valence: "Negative" },
  { Words: "狡狯", Domain: "morality", Valence: "Negative" },
  { Words: "罪恶", Domain: "morality", Valence: "Negative" },
  { Words: "狡诈", Domain: "morality", Valence: "Negative" },
  { Words: "无赖", Domain: "morality", Valence: "Negative" },
  { Words: "阴毒", Domain: "morality", Valence: "Negative" },
  { Words: "不良", Domain: "morality", Valence: "Negative" },
  { Words: "虚假", Domain: "morality", Valence: "Negative" },
  { Words: "贪污", Domain: "morality", Valence: "Negative" },
  { Words: "诡诈", Domain: "morality", Valence: "Negative" },
  { Words: "刻薄", Domain: "morality", Valence: "Negative" },
  { Words: "不端", Domain: "morality", Valence: "Negative" },
  { Words: "邪恶", Domain: "morality", Valence: "Negative" },
  { Words: "淫乱", Domain: "morality", Valence: "Negative" },
  { Words: "背叛", Domain: "morality", Valence: "Negative" },
];
//4 for ew_exercise, 4 old+ 4 new for rj_exercise,4 head+ 4 tail for ew_exercise
var EW_exercise_words = [
  { Words: "严谨", Domain: "ability", Valence: "Positive", person: '自己' },
  { Words: "刻板", Domain: "ability", Valence: "Negative", person: '自己' },
  { Words: "忠实", Domain: "morality", Valence: "Positive", person: '朋友' },
  { Words: "徇私", Domain: "morality", Valence: "Negative", person: '朋友' },
];
var RJ_exercise_words = [
  { Words: "严谨", Domain: "ability", Valence: "Positive", person: '自己' },
  { Words: "认真", Domain: "ability", Valence: "Positive", person: '朋友' },
  { Words: "刻板", Domain: "ability", Valence: "Negative", person: '自己' },
  { Words: "白痴", Domain: "ability", Valence: "Negative", person: '朋友' },
  { Words: "忠实", Domain: "morality", Valence: "Positive", person: '自己' },
  { Words: "宽宏", Domain: "morality", Valence: "Positive", person: '朋友' },
  { Words: "徇私", Domain: "morality", Valence: "Negative", person: '自己' },
  { Words: "可鄙", Domain: "morality", Valence: "Negative", person: '朋友' },
]
var EW_interf_words1 = [
  { Words: "务实", Domain: "ability", Valence: "Positive", person: '朋友' },
  { Words: "迷糊", Domain: "ability", Valence: "Negative", person: '朋友' },
  { Words: "坚贞", Domain: "morality", Valence: "Positive", person: '自己' },
  { Words: "说谎", Domain: "morality", Valence: "Negative", person: '自己' },
]
var EW_interf_words2 = [
  { Words: "主见", Domain: "ability", Valence: "Positive", person: '自己' },
  { Words: "缓慢", Domain: "ability", Valence: "Negative", person: '自己' },
  { Words: "素养", Domain: "morality", Valence: "Positive", person: '朋友' },
  { Words: "低俗", Domain: "morality", Valence: "Negative", person: '朋友' },
]


/*var timeline = [] //设置一个时间线
var info = []
var key = ['f', 'j']*/
function permutation(arr, num) {
  var r = [];
  (function f(t, a, n) {
    if (n == 0) return r.push(t);
    for (var i = 0, l = a.length; i < l; i++) {
      f(t.concat(a[i]), a.slice(0, i).concat(a.slice(i + 1)), n - 1);
    }
  })([], arr, num);
  return r;
}
/* basic data collection jsPsychInstructions trial 被试基本信息收集 */
/*var information = {
  timeline: [
   {
    type: jsPsychSurveyHtmlForm,
    preamble: "<p style='color: white'>您的实验编号是</p>",
    html: function () {
     let data = localStorage.getItem(info["subj_idx"]) ? JSON.parse(localStorage.getItem(info["subj_idx"]))["Name"] : "";
     return "<p><input name='Q0' type='text' value='" + data + "' required/></p>";
   },
   
    button_label: '继续',
    
    on_finish: function (data) {  
     info["ID"] = data.response.Q0;
     data.id = info["ID"];

     key = permutation(key, 2)[parseInt(info["ID"]) % 2];
     data.yes_key = key[0];
                  }
  }  
]  }*/

//timeline.push(information);

//--------------------------------------------
// 函数返回包含数字范围的 arr 数组。
function range(start, end) {
  // 这个函数接受两个参数，'start' 和 'end'，表示数字的范围。
  var arr = [];
  for (var i = start; i < end; i++) {
    arr.push(i);
  }
  return arr;
}

//Domain: "ability", Valence: "POS"，0-46，47个词
var indexx_1 = jsPsych.randomization.shuffle(range(0, 40));

//Domain: "ability", Valence: "NEG"
var indexx_2 = jsPsych.randomization.shuffle(range(40, 80));

//Domain: "MOR", Valence: "POS"
var indexx_3 = jsPsych.randomization.shuffle(range(80, 120));

//Domain: "CORE", Valence: "NEG"
var indexx_4 = jsPsych.randomization.shuffle(range(120, 160));

// 这里使用 filter 方法对 all_words 数组进行筛选。在 filter 方法中，我们传递了一个空的箭头函数 () => true 作为筛选函数。这个箭头函数对所有的元素都返回 true，即对所有的元素都保留下来。这样，我们就得到了 all_words 数组的一个副本，即 formal_words 数组。
var formal_words = all_words.filter(() => true);

//抽取4个词表的头两个单词作为练习词----原来只需要8个总共，现在前半需要8个，选头4个单词
// 1--[0,1;2,3,4;5,6] 2--[47,48;49,50,51;52,53] 3--[94,95;96,97,98;99,100] 4--[141,142;143,144,145;146,147]

//它用于从数组中移除具有指定id属性值的项。
function removeItemsById(arr, id) {
  var i = arr.length;
  if (i) {
    // (not 0)
    while (--i) {
      var cur = arr[i];
      if (cur.Words == id) {
        arr.splice(i, 1);
      }
    }
  }
}

/* example: var x = [2, 3, 1]; var y = [];
 var z = {1: "Apple",2: "Banana",3: "Orange"};
 var result = addd(x, y, z);//output: ['Banana', 'Orange', 'Apple']
 */
//addd(EW_exercise_index, EW_exercise_words, all_words)：这是一个函数调用，它接受三个参数 EW_exercise_index、EW_exercise_words 和 all_words。该函数的目的是将 EW_exercise_words 数组中的元素按照 EW_exercise_index 数组中的索引进行重新排列，同时保留 all_words 数组中与 EW_exercise_index 对应索引位置的元素。
function addd(x, y, z) {
  y = [];
  for (var i = 0; i < x.length; i++) {
    y = y.concat(z[x[i]]);
  }
  return y;
}


// 提取索引为 0 到 19 的元素（即从第1个元素开始的连续 20 个元素）。
var EW_formal_index = Array.prototype.concat.call(
  indexx_1.slice(0, 0 + 20),
  indexx_2.slice(0, 0 + 20),
  indexx_3.slice(0, 0 + 20),
  indexx_4.slice(0, 0 + 20),

);//EW_formal_index对应的是all_words数组中的位置

//  indexx_3.slice(6, 6 + 20),indexx_4.slice(6, 6 + 20)

// var EW_formal_index = Array.prototype.concat.call(indexx_1.slice(2,2+20),indexx_2.slice(2,2+20),indexx_3.slice(2,2+20),indexx_4.slice(2,2+20));

var EW_formal_words = addd(EW_formal_index, EW_formal_words, all_words)

//---------------------------------------------------------------------
//const fruits = ["Banana0", "Orange1", "Lemon2", "Apple3, "Mango"];const citrus = fruits.slice(1, 3);
// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']，不包括后面那个


var RJ_formal_index = Array.prototype.concat.call(indexx_1.slice(0, 0 + 40), indexx_2.slice(0, 0 + 40),
  indexx_3.slice(0, 0 + 40), indexx_4.slice(0, 0 + 40),);

var RJ_formal_words = addd(RJ_formal_index, RJ_formal_words, all_words);//160词

//分配到自己or朋友条件下
function assignPersonProperties(array) {
  var length = array.length;
  var quarter = Math.floor(length / 4);
  var eighth = Math.floor(length / 8);
  var teigth = Math.floor(length / 8 * 3);
  var half = Math.floor(length / 2);
  var feighth = Math.floor(length / 8 * 5);
  var seighth = Math.floor(length / 8 * 6);
  var theeighth = Math.floor(length / 8 * 7);
  var result = array.map((obj, index) => {
    if (index < eighth) {
      return { ...obj, person: '自己' };
    } else if (index >= eighth && index < quarter) {
      return { ...obj, person: '朋友' };
    } else if (index >= quarter && index < (teigth)) {
      return { ...obj, person: '自己' };
    } else if (index >= teigth && index < (half)) {
      return { ...obj, person: '朋友' };
    } else if (index >= half && index < (feighth)) {
      return { ...obj, person: '自己' };
    } else if (index >= feighth && index < (seighth)) {
      return { ...obj, person: '朋友' };
    } else if (index >= seighth && index < (theeighth)) {
      return { ...obj, person: '自己' };
    } else if (index >= theeighth && index < (length)) {
      return { ...obj, person: '朋友' };
    }
  });
  return result;
}
var EW_exercise_words = jsPsych.randomization.shuffle(EW_exercise_words);
var EW_interf_words1 = jsPsych.randomization.shuffle(EW_interf_words1);
var EW_interf_words2 = jsPsych.randomization.shuffle(EW_interf_words2);
var EW_formal_words = jsPsych.randomization.shuffle(assignPersonProperties(EW_formal_words));
var EW_words = EW_interf_words1.concat(EW_formal_words, EW_interf_words2);


var RJ_exercise_words = jsPsych.randomization.shuffle(RJ_exercise_words);
/*进行修改，old词才有person，new没有参与评估
var RJ_formal_words = jsPsych.randomization.shuffle(assignPersonProperties(RJ_formal_words));*/
var RJ_formal_words = jsPsych.randomization.shuffle(RJ_formal_words);
//-----------------------------------------------
for (var i = 0; i < RJ_formal_words.length; i++) {
  var foundMatch = false;
  for (var j = 0; j < EW_words.length; j++) {
    if (RJ_formal_words[i].Words === EW_words[j].Words) {
      RJ_formal_words[i].identity = "old";
      foundMatch = true;
      break;
    }
  }
  if (!foundMatch) {
    RJ_formal_words[i].identity = "new";
  }
}
//新的给RJ_words分配person
for (var i = 0; i < RJ_formal_words.length; i++) {
  var foundMatch = false;
  for (var j = 0; j < EW_words.length; j++) {
    if (RJ_formal_words[i].Words === EW_words[j].Words) {
      RJ_formal_words[i].person = EW_words[j].person;
      foundMatch = true;
      break;
    }
  }
  if (!foundMatch) {
    RJ_formal_words[i].person = "NA";
  }
}

for (var i = 0; i < EW_words.length; i++) {
  EW_words[i].identity = "old";
}
//------------------------------------------------
for (var i = 0; i < RJ_exercise_words.length; i++) {
  var foundMatch = false;
  for (var j = 0; j < EW_exercise_words.length; j++) {
    if (RJ_exercise_words[i].Words === EW_exercise_words[j].Words) {
      RJ_exercise_words[i].identity = "old";
      foundMatch = true;
      break;
    }
  }
  if (!foundMatch) {
    RJ_exercise_words[i].identity = "new";
  }
}
for (var i = 0; i < EW_exercise_words.length; i++) {
  EW_exercise_words[i].identity = "old";
}
//-----------------------------------------------
var EW_practice_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    return `
    <p><div style='color:white;font-size:35px; line-height:20px;'>词汇评估任务</div></p><br>
    <p><div style='color:white;font-size:25px; line-height:20px;'>请再次回忆该亲密的朋友，你们至少2年前就认识了，并且最近2年经常见面。</div></p>
    <p><div style='color:white;font-size:25px; line-height:20px;'>在本实验中，您将会看到一些形容词。</div></p>
    <p><div style='color:yellow;font-size:25px; line-height:20px;'>您的任务是判断这些形容词是否符合对您自己或您的朋友的描述。</div></p>`+
      `<p style='font-size:35px'>符合按<span style="color:lightgreen"> ${key[0]} 键</span>，不符合按<span style="color:red"> ${key[1]} 键</span></p>`
  }
  ,
  choices: ['继续'],
  data: {
    task_id: "SRET_EW",
    screen_id: "EW_instructions",
    time_stamp: Date(),
  },
  on_load: () => {
    $("body").css("cursor", "default");
  },
  on_finish: function () {
    $("body").css("cursor", "none");

  }
};
//timeline.push(EW_practice_instructions);


/*var fixation = {
  type:jsPsychHtmlKeyboardResponse,
  stimuli:'<span style="font-size : 40 px;">+</span>',
  choices: "No_KEYS",
  trial_duration: 500
};*/

var EW_exercise = {

  timeline: [
    {
      data: {
        screen_id: "EW_practice"
      },
      type: jsPsychPsychophysics,
      stimuli: [
        {
          obj_type: 'cross', // fixation
          startX: "center",
          startY: "center",
          line_length: 40, // pixels
          line_width: 5,
          line_color: 'white',
          show_start_time: 500,
          show_end_time: 1000//500ms
        },
        {
          obj_type: 'text',
          content: function () { return jsPsych.timelineVariable('person', true) },
          startX: "center", // location of the cross's center in the canvas
          startY: -175, //图形和文字距离 与加号等距
          font: `${40}px '微软雅黑'`, //字体和颜色设置 文字视角：3.6° x 1.6°
          text_color: '#D3D3D3',
          show_start_time: 1000, // ms after the start of the trial
          response_ends_trial: false,
          show_end_time: 2500,//出现1500ms
          origin_center: true
        },
        //  文字与图形同时呈现 100ms，上图下文，两者与十字等距
        {
          obj_type: 'text',
          content: function () { return jsPsych.timelineVariable('Words', true) },
          startX: "center",
          startY: "center",
          font: `${60}px '微软雅黑'`, //字体和颜色设置 文字视角：3.6° x 1.6°
          text_color: 'white',
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 2500,//出现1500ms
          response_ends_trial: false,
          origin_center: true
        },
        { 
          obj_type:'text',
          content: function(){return `符合按 ${key[0]} 键，不符合按 ${key[1]} 键`},
          startX: "center", // location of the cross's center in the canvas
          startY:225, //图形和文字距离 与加号等距
          font: `${25}px '微软雅黑'`, 
          text_color: "#D3D3D3",
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 2500,//出现1500ms
          response_ends_trial:false,
          origin_center: true
          }

      ],

      choices: ['f', 'j'],
      response_start_time: 1000,//开始作答时间，第二个刺激开始计算
      trial_duration:3000,//结束时间，一共作答时间持续1200ms

      on_finish: function (data) {
        data.person = jsPsych.timelineVariable("person", true);
        data.word = jsPsych.timelineVariable("Words", true);
        data.valence = jsPsych.timelineVariable("Valence", true);
        data.domain = jsPsych.timelineVariable("Domain", true);
        data.task_id = "SRET_EW";
        if (data.key_press == key[0]) {
          data.responses = "yes";
        } else if (data.key_press == key[1]) {
          data.responses = "no";
        };
      },
    },
  ],
  timeline_variables: EW_exercise_words,
  randomize_order: true,
  repetitions: 1,
  on_finish: function () {
    // $("body").css("cursor", "default"); //鼠标出现
  }
};
//timeline.push(EW_exercise);

var EW_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    return `
    <p><div style='color:white;font-size:35px; line-height:20px;'>请您再次阅读实验要求</div></p><br>
    <p><div style='color:white;font-size:25px; line-height:20px;'>请回忆某一个亲密的朋友，你们至少2年前就认识了，并且最近2年经常见面。</div></p>
    <p><div style='color:white;font-size:25px; line-height:20px;'>在本实验中，您将会看到一些形容词。</div></p>
    <p><div style='color:yellow;font-size:25px; line-height:20px;'>您的任务是判断这些形容词是否符合对您自己或您的朋友的描述。</div></p>
    <p><div class='footer' style='font-size:25px; line-height:20px;'>如果对本实验还有不清楚之处，请立即向实验员咨询。</p><p style='font-size:25px; line-height:20px;'>如果您明白了规则：</p><p style='font-size:22px; line-height:20px;'>请按 继续 进入正式实验</p>
    </div>
    `+ `<p style='font-size:35px'>符合按<span style="color:lightgreen"> ${key[0]} 键</span>，不符合按<span style="color:red"> ${key[1]} 键</span></p>`
  },
  choices: ['继续'],
  data: {
    task_id: "SRET_EW",
    screen_id: "prac_instructions",
    time_stamp: Date(),
  },
  on_load: () => {
    $("body").css("cursor", "default");
  },
  on_finish: function () {
    $("body").css("cursor", "none");

  }
};
//timeline.push(EW_instructions);

var EW_formal = {
  timeline: [
    {
      data: {
        screen_id: "EW_formal"
      },
      type: jsPsychPsychophysics,
      stimuli: [
        {
          obj_type: 'cross', // fixation
          startX: "center",
          startY: "center",
          line_length: 40, // pixels
          line_width: 5,
          line_color: 'white',
          show_start_time: 500,
          show_end_time: 1000//500ms
        },
        {
          obj_type: 'text',
          content: function () { return jsPsych.timelineVariable('person', true) },
          startX: "center", // location of the cross's center in the canvas
          startY: -175, //图形和文字距离 与加号等距
          font: `${40}px '微软雅黑'`, //字体和颜色设置 文字视角：3.6° x 1.6°
          text_color:'#D3D3D3',
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 2500,//出现1500ms
          response_ends_trial: false,
          origin_center: true
        },
        //  文字与图形同时呈现 100ms，上图下文，两者与十字等距
        {
          obj_type: 'text',
          content: function () { return jsPsych.timelineVariable('Words', true) },
          startX: "center",
          startY: "center",
          font: `${60}px '微软雅黑'`, //字体和颜色设置 文字视角：3.6° x 1.6°
          text_color: 'white',
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 2500,//出现1500ms
          response_ends_trial: false,
          origin_center: true
        },
        { 
          obj_type:'text',
          content: function(){return `符合按 ${key[0]} 键，不符合按 ${key[1]} 键`},
          startX: "center", // location of the cross's center in the canvas
          startY:225, //图形和文字距离 与加号等距
          font: `${25}px '微软雅黑'`, 
          text_color:"#D3D3D3",
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 2500,//出现1500ms
          response_ends_trial:false,
          origin_center: true
      }
      ],

      choices: ['f', 'j'],
      response_start_time: 1000,//开始作答时间，第二个刺激开始计算
      trial_duration:3000,//结束时间，一共作答时间持续1200ms

      on_finish: function (data) {
        data.person = jsPsych.timelineVariable("person", true);
        data.word = jsPsych.timelineVariable("Words", true);
        data.valence = jsPsych.timelineVariable("Valence", true);
        data.domain = jsPsych.timelineVariable("Domain", true);
        data.task_id = "SRET";
        if (data.key_press == key[0]) {
          data.responses = "yes";
        } else if (data.key_press == key[1]) {
          data.responses = "no";
        }

      }
    },
  ],
  timeline_variables: EW_words,
  // randomize_order:true,
  sample: {
    type: "custom",
    fn: (x) => {
      return x.splice(0, SRET_sample)//88个词，4首+80+4尾
    }
  },
  repetitions: 1,
  on_finish: function () {
    $("body").css("cursor", "none"); //鼠标消失
  }
};
//timeline.push(EW_formal);
//--------------------------计算题[指导语，先前抽计算题（材料），按键反应（主），控制时间
var instructions_math = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <p><div style='color:white;font-size:35px; line-height:20px;'>计算任务</div></p><br>
    <p><div style='color:red;font-size:25px; line-height:20px;'>接下来，您将看到一些四则运算题，<b>请从键盘选择 0-9 进行反应。</b></div></p>
    <p><div style='color:red;font-size:25px; line-height:20px;'>请尽可能快地进行计算，计算的速度和正确率将影响报酬的发放。</div></p>
    <p><div class='footer' style='color:white;font-size:25px; line-height:20px;'>如果对本实验还有不清楚之处，请立即向实验员咨询。</p><p style='color:white;font-size:25px; line-height:20px;'>如果您明白了规则：</p><p style='color:white;font-size:22px; line-height:20px;'>请按 继续 进入练习</p>
    </div>
    `,
  choices: ['继续'],
  data: {
    task_id: "SRET_math",
    screen_id: "math_instructions",
    time_stamp: Date(),
  },
  on_load: () => {
    $("body").css("cursor", "default");
  },
  on_finish: function () {
    $("body").css("cursor", "none");

  }
};
//timeline.push(instructions_math);
var start_time;
var end_test_timer;
var trial_count = 0;
var n_trials = Q_math_sample.length;
var math = {
  timeline: [
    {
      data: {
        screen_id: "SRET_math_calculate"
      },
      type: jsPsychPsychophysics,
      stimuli: [
        {
          obj_type: 'cross', // fixation
          startX: "center",
          startY: "center",
          line_length: 40, // pixels
          line_width: 5,
          line_color: 'white',
          show_start_time: 500,
          show_end_time: 1000//500ms
        },
        {
          obj_type: 'text',
          content: function () { return jsPsych.timelineVariable('math', true) },
          startX: "center",
          startY: "center",
          font: `${60}px '微软雅黑'`,
          text_color: 'white',
          show_start_time: 1000, // ms after the start of the trial
          //show_end_time: 4000,//出现3000ms
          response_ends_trial: true,
          origin_center: true
        },
      ],

      choices: ['0', '1', '2', "3", "4", "5", '6', '7', '8', '9'],
      //response_start_time:1000,//开始作答时间，第二个刺激开始计算
      // trial_duration:5000,//结束时间
      on_load: function () {
        trial_count++;
        // we need to set up the timer to end the current timeline after a certain duration, but only on the first trial
        if (trial_count == 1) {
          start_time = performance.now();
          var end_test_timer = setTimeout(function () {
            // this stuff is just for testing
            var end_time = performance.now();
            var elapsed_time = end_time - start_time;
            console.log("elapsed time: ", elapsed_time);
            // this function is all you need to end the current timeline
            jsPsych.endCurrentTimeline();
            // this function ends the current trial 
            jsPsych.finishTrial({ status: "ended early" });
          }, math_time_limit);
        }
      },
      on_finish: function (data) {
        if (trial_count == n_trials) {
          clearTimeout(end_test_timer);
        }
        data.math = jsPsych.timelineVariable("math", true);
        data.correct_response = jsPsych.timelineVariable('correct_answer', true);
        data.responses = data.key_press;
        data.correct = data.response == data.correct_response ? '1' : '0';
        data.task_id = "SRET";
      }
    },
  ],
  timeline_variables: Q_math_sample,//计算题材料
  randomize_order: true,
  repetitions: 1,
  on_finish: function () {
     $("body").css("cursor", "none"); //鼠标消失
  }
};
//timeline.push(math);
//-------------------------再认[指导语，判断是否判断过if]
var Instruct_RJ = {
  type: jsPsychInstructions,
  pages: function () {
    return [
      `<p class='header' style = 'color:white;font-size: 35px; line-height:20px;'><b>回忆部分</b></p><br>` +
      `<p style='color:white;font-size:25px; line-height:20px;'>在本实验中，您将会看到一些形容词。</p>
      <p style='color:white;font-size:25px; line-height:20px;'>您的任务是判断这些形容词是否在前一个实验阶段中出现过。</p>` +
      `<p style='color:white;font-size:25px; line-height:20px;'><b>如果未出现过则为 “ 新词 ”，按 “ 1 ”；</b></p>` +
      `<p style='color:lightgreen;font-size:25px; line-height:20px;'><b>如果感觉该词先前出现过，但不能回忆起细节，对该词的印象模糊，则归为 “ 熟悉 ”，按 “ 2 ”；</b></p>
    <p style='color:yellow;font-size:25px; line-height:20px;'><b>如果先前出现过且能回忆起该词伴随的条件细节，则归为 “ 旧词 ”，按 “ 3 ”。 </b></p>`,
      `<p style='color:white;font-size:25px; line-height:20px;'>对于 “ 熟悉 ”和 “ 旧词 ”，您还需要进行二次判断：</p>
      <p style='color:white;font-size:25px; line-height:20px;'>判断该词是在 “ 朋友 ” 还是 “ 自己 ” 条件下出现过。</p><p style='color:lightgreen;font-size:25px; line-height:30px;'><b>如果是在 “ 自己 ” 条件下出现过，则按 ${key[0]} 键 ；<b></p><p style='color:yellow;font-size:25px; line-height:30px;'><b>如果是在 “ 朋友 ” 条件下出现过，则按 ${key[1]} 键。</b></p>
      <p style='color:red;font-size:25px; line-height:20px;'><b>如果回忆的正确率等于或者低于随机水平，数据将被视为无效，请认真作答。</b></p>
    <p class='footer' style='font-size:25px; line-height:20px;'>如果对本实验还有不清楚之处，请立即向实验员咨询。</p><p style='font-size:25px; line-height:20px;'>如果您明白了规则：</p><p style='font-size:22px; line-height:20px;'>请按 继续 进入练习</p>`
    ];
  },
  show_clickable_nav: true,
  button_label_previous: " <span class='add_' style='color:black; font-size: 20px;'> 返回</span>",
  button_label_next: " <span class='add_' style='color:black; font-size: 20px;'> 继续</span>",
  data: {
    task_id: "SRET_RJ",
    screen_id: "RJ_instruct_practice",
    time_stamp: Date(),
  },
  on_load: () => {
    $("body").css("cursor", "default");
  },
  on_finish: function () {
    $("body").css("cursor", "none");

  }
};

var Instruct_RJ2 = {
  type: jsPsychInstructions,
  pages: function () {
    return [
      `<p class='header' style = 'font-size: 35px; line-height:20px;'><b>回忆部分</b></p>` +
      `<p style='color:white;font-size:25px; line-height:20px;'><b>在本实验中，您将会看到一些形容词。您的任务是判断这些形容词是否在前一个实验阶段中出现过。</b></p>` +
      `<p style='color:white;font-size:25px; line-height:20px;'><b>如果未出现过则为 “ 新词 ”，按 “ 1 ”；</b></p>` +
      `<p style='color:lightgreen;font-size:25px; line-height:20px;'><b>如果感觉该词先前出现过，但不能回忆起细节，对该词的印象模糊，则归为 “ 熟悉 ”，按 “ 2 ”；</b></p>
    <p style='color:yellow;font-size:25px; line-height:20px;'><b>如果先前出现过且能回忆起该词伴随的条件细节，则归为 “ 旧词 ”，按 “ 3 ”。 </b></p>`,
      `<p>对于“熟悉”和“旧词”，您还需要进行二次判断：判断该词是在 “ 朋友 ”还是 “ 自己 ”条件下出现过。</p><p style='color:lightgreen;font-size:25px; line-height:20px;'><b>如果是在 “ 自己 ” 条件下出现过，则按 ${key[0]} 键 ；</b></p><p style='color:yellow;font-size:25px; line-height:20px;'><b>如果是在 “ 朋友 ” 条件下出现过，则按 ${key[1]} 键。</b></p>
      <p style='color:red;font-size:25px; line-height:20px;'><b>如果回忆的正确率等于或者低于随机水平，数据将被视为无效，请认真作答。</b></p>
    <p class='footer' style='font-size:25px; line-height:20px;'>如果对本实验还有不清楚之处，请立即向实验员咨询。</p><p style='font-size:25px; line-height:20px;'>如果您明白了规则：</p><p style='font-size:22px; line-height:20px;'>请按 继续 进入正式实验</p>`
    ];
  },
  show_clickable_nav: true,
  button_label_previous: " <span class='add_' style='color:black; font-size: 20px;'> 返回</span>",
  button_label_next: " <span class='add_' style='color:black; font-size: 20px;'> 继续</span>",
  data: {
    task_id: "SRET_RJ",
    screen_id: "RJ_instruct",
    time_stamp: Date(),
  },
  on_load: () => {
    $("body").css("cursor", "default");
  },
  on_finish: function () {
    $("body").css("cursor", "none");

  }
};

var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<div style="color:white;font-size:80px;line-height:5px;position:absolute;top:calc(50%); transform: translate(-50%, -50%)">+</div>`,
  choices: "NO_KEYS",
  trial_duration: 500,

}
var RJ_formal1 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    var stim = '<p style="position: absolute; top:calc(45%);;transform: translate(-50%, -50%);text-align: center; color: white; font-size: 60px;">' + jsPsych.timelineVariable('Words', true) + '</p>' +
      '<p style="position:absolute; text-align: center;color:	#D3D3D3;font-size: 25px;top:calc(50% + 35%);transform: translate(-50%)">新词按 “1” ，熟悉按 “2” ，旧词按 “3”</p>';


    return stim;
  },
  choices: ['1', '2', '3'],
  data: {
    task_id: "SRET",
    screen_id: "RJ_formal1",
    time_stamp: Date(),
  },
  on_finish: function (data) {

    data.word = jsPsych.timelineVariable("Words", true);
    data.valence = jsPsych.timelineVariable("Valence", true);
    data.domain = jsPsych.timelineVariable("Domain", true);
    data.identity = jsPsych.timelineVariable("identity", true);
    data.person = jsPsych.timelineVariable("person", true);
    if (data.response === '1') {
      data.responses = "new";
    } else if (data.response === '2') {
      data.responses = "familiar";
    } else if (data.response === '3') {
      data.responses = "old";
    }
    if (data.responses === "new" && data.identity === "new") {
      data.correct = "1";//true
    } else if ((data.responses === "familiar" || data.responses === "old") && data.identity === "old") {
      data.correct = "1";
    } else {
      data.correct = "0";
    }
  }
}
var RJ_formal2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return'<p style="position: absolute; top:calc(45%);transform: translate(-50%, -50%);text-align: center; color: white; font-size: 60px;">'+ jsPsych.timelineVariable('Words', true) + '</p>' +
      `<p style="position:absolute; text-align: center;font-size: 25px;color:	#D3D3D3;top:calc(50% + 35%);transform: translate(-50%)">自己按 ${key[0]} 键 ，朋友按 ${key[1]} 键</p>`;
    
  },
  choices: ['f', 'j'],
  data: {
    task_id: "SRET",
    screen_id: "RJ_formal_2",
    time_stamp: Date(),
  },
  on_finish: function (data) {

    if (data.response == key[0]) {
      data.responses = "self";
    } else if (data.response == key[1]) {
      data.responses= "friend";
    }
    data.word = jsPsych.timelineVariable("Words", true);
    data.valence = jsPsych.timelineVariable("Valence", true);
    data.domain = jsPsych.timelineVariable("Domain", true);
    data.identity = jsPsych.timelineVariable("person", true);
  }
}
var if_RJ = {
  timeline: [RJ_formal2],
  conditional_function: function (data) {
    var response = jsPsych.data.get().filter({ screen_id: 'RJ_formal1' }).last(1).values()[0].response;
    if (response === '1') {
      return false;
    } else if (response === '2' || response === '3') {
      return true;
    };
  }
}
var RJ_excercise = {
  timeline: [fixation, RJ_formal1, if_RJ],
  timeline_variables: RJ_exercise_words,
  randomize_order: true,
  repetitions: 1,
};

var RJ = {
  timeline: [fixation, RJ_formal1, if_RJ],
  timeline_variables: RJ_formal_words,
  //randomize_order:true,
  sample: {
    type: "custom",
    fn: (x) => {
      return x.splice(0, RJ_sample)//160个词
    }
  },
  repetitions: 1,
};

/*
timeline.push(Instruct_RJ);
timeline.push(RJ_excercise);
timeline.push(Instruct_RJ2);
timeline.push(RJ);
*/

var SRET = { timeline: [EW_practice_instructions, EW_exercise, EW_instructions, EW_formal, instructions_math, math, Instruct_RJ, RJ_excercise, Instruct_RJ2, RJ] }




//--------------------------------
const start_time_total = new Date();

/* End of task 1 */
var SRET_end = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "<p style='color:white;'>现在是休息时间，当您结束休息后，您可以点击 结束休息 按钮 继续。</p>",
  choices: ["结束休息"],
  data: {
    task_id: "SRET_end",
    screen_id: "SRET_end",
    time_stamp: Date()
  },
  on_load: () => {
    $("body").css("cursor", "default");
  },
  on_finish: function (data) {
    end_time = new Date()
    data.duration = (end_time - start_time_total) / 1000
    console.log('Time spent until the end of Task SRET: ' + data.duration)
  }
};

/*timeline.push(SRET);
timeline.push(SRET_end)
/*timeline.push(SRET_end)*/
/*jsPsych.run(timeline);*/

