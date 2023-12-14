/*const jsPsych = initJsPsych({
    
     show_progress_bar: true,

     on_data_update: function (data) {
             data = jsPsych.data.get(); //updates the data file with the most recent trial 
         },
     on_finish: function() {
      jsPsych.data.get().localSave('csv', 'ALT1' + info["ID"] + '.csv'); 
      document.exitFullscreen(); // 退出全屏
      let bodyNode = document.getElementsByTagName("body"); // 获取Body窗体
            }
     });*/

     
  
    
//-----------------刺激材料设置------------------------------------------------------------------
//var timeline = [] //设置一个时间线

function getRandomElements(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const im1 = ['img/circle.png', 'img/diamond.png', 'img/square.png', 'img/triangle.png'];
const im2 = ['img/ellipse.png', 'img/hexagon.png', 'img/pentagon.png', 'img/trapezoid.png'];

var picture = ['img/circle.png', 'img/diamond.png', 'img/square.png', 'img/triangle.png', 'img/ellipse.png', 'img/hexagon.png', 'img/pentagon.png', 'img/trapezoid.png'];
var tag = ["圆形", "菱形", "方形", "三角", "椭圆", "六边", "五边", "梯形"];
var words = [];
var images = [];
var words1 = [] 
var words2 = []//储存文字 
var images1 = []; 
var images2 = []; 
do {
  images1 = getRandomElements(picture, 4);
  images2 = picture.filter(element => !images1.includes(element));
} while ((images1.includes('img/circle.png') && images1.includes('img/ellipse.png')) || (images2.includes('img/circle.png') && images2.includes('img/ellipse.png'))||(images1.includes('img/hexagon.png') && images1.includes('img/pentagon.png')) ||(images2.includes('img/hexagon.png') && images2.includes('img/pentagon.png')) );

for (var i = 0; i < images1.length; i++) {
  if (images1[i] === 'img/circle.png') {
    words1.push("圆形");
  } else if (images1[i] === 'img/diamond.png') {
    words1.push("菱形");
  } else if (images1[i] === 'img/square.png') {
    words1.push("方形");
  } else if (images1[i] === 'img/triangle.png') {
    words1.push("三角");
  } else if (images1[i] === 'img/ellipse.png') {
    words1.push("椭圆");
  } else if (images1[i] === 'img/hexagon.png') {
    words1.push("六边");
  } else if (images1[i] === 'img/pentagon.png') {
    words1.push("五边");
  } else if (images1[i] === 'img/trapezoid.png') {
    words1.push("梯形");
  }
}

for (var j = 0; j < images2.length; j++) {
  if (images2[j] === 'img/circle.png') {
    words2.push("圆形");
  } else if (images2[j] === 'img/diamond.png') {
    words2.push("菱形");
  } else if (images2[j] === 'img/square.png') {
    words2.push("方形");
  } else if (images2[j] === 'img/triangle.png') {
    words2.push("三角");
  } else if (images2[j] === 'img/ellipse.png') {
    words2.push("椭圆");
  } else if (images2[j] === 'img/hexagon.png') {
    words2.push("六边");
  } else if (images2[j] === 'img/pentagon.png') {
    words2.push("五边");
  } else if (images2[j] === 'img/trapezoid.png') {
    words2.push("梯形");
  }
}




var words = words1.concat(words2)
var images=images1.concat(images2);
const preload = {
  type: jsPsychPreload,
  images: picture,
}
//timeline.push(preload);//preload图片

var key = ['f', 'j']//按键
//正确率60%
let acc = 60;
let view_texts_images = [];
let view_texts_images2 = [];
//定义排列组合的function，[e.g. arr数组3，num2;r:(1,2),(2,3)]函数将生成 arr 中长度为 num 的所有排列组合，并返回结果数组 r。
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

//-------------------------欢迎语---------------------------------------------------------------
var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
   <p><div style = "color: white;font-size:25px;">您好，欢迎参加本次实验。</div> </p>
   <p><div style = "color: white;font-size:25px;">为充分保障您的权利，请确保您已经知晓并同意《参与实验同意书》以及《数据公开知情同意书》。</div></p>
   <p><div style = "color: white;font-size:25px;">如果您未见过上述内容，请咨询实验员。</div></p>
   <p><div style = "color: white;font-size:25px;">如果您选择继续实验，则表示您已经清楚两份知情同意书的内容并同意。</div></p>
   <p><div style = "color: pink;font-size:30px;">请确保您记得day0的实验编号，您将在本次实验输入该编号，若您忘记，请咨询实验员后作答。</div></p>
   <p><div style = "color: lightblue;font-size:25px;">请您尽可能认真地作答，我们将依据您在各问卷和按键任务中的作答质量发放报酬。</div></p>
   <p> <div style = "color: green;font-size:25px;"><按空格键至下页></div> </p>
   `,
  choices: [' '],
};
//timeline.push(welcome);//设置欢迎语

var info = []

/* basic data collection jsPsychInstructions trial 被试基本信息收集 */
var information = {
  timeline: [{
    // 实验被试信息收集
    type: jsPsychCallFunction, //探测被试显示器数据
    func: function () {
      if ($(window).outerHeight() < 500) {
        alert("您设备不支持实验，请进入全屏模式。若已进入全屏，请换一台高分辨率的设备，谢谢。");
        window.location = "";
      }
    }
  }, {
    type: jsPsychSurveyHtmlForm,
    preamble: "<p style =' color : white;font-size:25px;'>请回忆某一个亲密的朋友，你们至少2年前就认识了，并且最近2年经常见面。</p><p style =' color : white;font-size:25px;'>后续实验中出现的 “朋友” 均指代这个朋友。</p>",
    html: `
      <p><div style =' color : white;font-size:20px;'>1.该朋友的姓氏</div></p> 
      <input type="text" placeholder= '例如: 陈', name="friend_name" required><br>     
      <p><div style =' color : white;font-size:20px;'>2.您的实验编号是</div></p> 
  <input type="text" name="ParticipantID" required/><br> 
  `,

    button_label: "继续",
    on_finish: function (data) {
      var response = data.response;
     var ParticipantID = response["ParticipantID"].trim();
      var friend_name = response["friend_name"].trim();
    var subj_idx=$.ajax("https://www.naodao.com/api/register-server/user/getInfo", {async: false}).responseJSON.data.userId;
      info["subj_idx"] = subj_idx;   
      info["friend_name"] = friend_name;
      info["ParticipantID"] = ParticipantID;
     // key = permutation(key, 2)[parseInt(info["subj_idx"]) % 2] //对应的按键
        key = permutation(key, 2)[parseInt(info["ParticipantID"]) % 2]
      view_texts_images = [] //指导语中呈现的图片和文字对应关系
      jsPsych.randomization.shuffle(images1).forEach((v, i) => { //将image随机
        view_texts_images.push(`<img src="${v}" width=120 style="vertical-align:middle">---${words1[images1.indexOf(v)]}`); //image编号和文字对应
        
      });

      view_texts_images2 = [] //指导语中呈现的图片和文字对应关系
      jsPsych.randomization.shuffle(images2).forEach((v, i) => { //将image随机
        view_texts_images2.push(`<img src="${v}" width=120 style="vertical-align:middle">---${words2[images2.indexOf(v)]}`); //image编号和文字对应
        
      });
      console.log(view_texts_images);console.log(view_texts_images2);
      console.log(images);console.log(images1);console.log(images2);
      console.log(tag);console.log(words);
    }
  },
  ]
};


//timeline.push(information);


//----------<!-- 设备检查-->------------

var chinrest = {
  type: jsPsychVirtualChinrest,
  blindspot_reps: 3,
  resize_units: "deg",
  pixels_per_unit: 50,
  item_path: 'img/card.png',
  adjustment_prompt: function () {
    let html = `<p style = "font-size: 28px">首先，我们将快速测量您的显示器上像素到厘米的转换比率。</p>`;
    html += `<p style = "font-size: 28px">请您将拿出一张真实的银行卡放在屏幕上方，单击并拖动图像的右下角，直到它与屏幕上的信用卡大小相同。</p>`;
    html += `<p style = "font-size: 28px">您可以使用与银行卡大小相同的任何卡，如会员卡或驾照，如果您无法使用真实的卡，可以使用直尺测量图像宽度至85.6毫米。</p>`;
    html += `<p style = "font-size: 28px"> 如果对以上操作感到困惑，请参考这个视频： <a href='https://www.naodao.com/public/stim_calibrate.mp4' target='_blank' style='font-size:24px'>参考视频</a></p>`;
    return html
  },
  blindspot_prompt: function () {
    return `<p style="text-align:left">现在，我们将快速测量您和屏幕之间的距离：<br>
      请把您的左手放在 空格键上<br>
      请用右手遮住右眼<br>
      请用您的左眼专注于黑色方块。将注意力集中在黑色方块上。<br>
      如果您已经准备好了就按下 空格键 ，这时红色的球将从右向左移动，并将消失。当球一消失，就请再按空格键<br>
      如果对以上操作感到困惑，请参考这个视频：<a href='https://www.naodao.com/public/stim_calibrate.mp4' target='_blank' style='font-size:24px'>参考视频</a><br>
      <a style="text-align:center">准备开始时，请按空格键。</a></p>`
  },
  blindspot_measurements_prompt: `剩余测量次数：`,
  on_finish: function (data) {
    console.log(data)
  },
  redo_measurement_button_label: `还不够接近，请重试`,
  blindspot_done_prompt: `是的`,
  adjustment_button_prompt: `图像大小对准后，请单击此处`,
  viewing_distance_report: `<p>根据您的反应，您坐在离屏幕<span id='distance-estimate' style='font-weight: bold;'></span> 的位置。<br>这大概是对的吗？</p> `,
};

//timeline.push(chinrest)

var fullscreen_trial = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: "<p><span class='add_' style='color:white; font-size: 25px;'> 实验需要全屏模式，实验期间请勿退出全屏。 </span></p >",
  button_label: " <span class='add_' style='color:black; font-size: 20px;'> 点击这里进入全屏</span>"
}

//timeline.push(fullscreen_trial);//将全屏设置放入到时间线里

var Instructions0 = {
  type: jsPsychInstructions,
  pages: function () {
    let start = "<p class='header' style = 'color:white;font-size: 35px'>实验说明:</p>";
    return [start + ` <p style='color:white; font-size: 25px;line-height: 20px;'>您好，欢迎参加本实验。</p>
    <p style='color:white; font-size: 25px;'>在本实验中，您需要完成一个简单的知觉匹配任务。</p>
    <p style='color:white; font-size: 25px;'>您将学习几种几何图形与不同标签的对应关系。</p>
   <p class='footer' style='color:yellow;font-size:25px; line-height: 20px;'>您的任务是判断几何图形与图形名称是否匹配，</p>
   <p style='color:white; font-size: 25px; line-height: 30px;'>您将完成2个相似的知觉匹配的子任务</p>
   <p style='color:white; font-size: 25px; line-height: 20px;'>整个知觉匹配任务将持续大约50分钟。</p>
   <p style='color:white; font-size: 25px; line-height: 20px;'>实验的正确率将影响实验报酬的发放，</p>请尽可能保证对每个图形的判断具有60%以上的正确率，</p>同时尽可能快地进行按键反应。</p>
   <p style = 'font-size: 25px; line-height: 20px;'>请点击 继续 进入实验<span style='color: yellow;'>开始任务一</span>的练习</span></p><div>`];
  },
  show_clickable_nav: true,
  button_label_previous: " <span class='add_' style='color:black; font-size: 20px;'> 返回</span>",
  button_label_next: " <span class='add_' style='color:black; font-size: 20px;'> 继续</span>",
  on_load: () => {
    $("body").css("cursor", "default");
  },
  on_finish: function () {
    $("body").css("cursor", "none");
  } //鼠标消失术，放在要消失鼠标的前一个事件里

}
//timeline.push(Instructions0);
//-----------------------------实验指导语--------------------

var Instructions1 = {
  type: jsPsychInstructions,
  pages: function () {
    let start = "<p class='header' style='font-size: 22px'>请您记住如下对应关系:</p>";
    let tmpI = "";
    view_texts_images.forEach(v => {
      tmpI += `<p class="content">${v}</p>`;
    });
    return [
      `<div style="display: flex;">
        <div class="box" style="flex: 1;">${start}${tmpI}</div>` +
        `<div style="flex: 1; display: flex; justify-content: center; align-items: center;">
          <div style="text-align: left; padding: 0 20px;">
            <p >您的任务是：</p>判断几何图形与图形名称是否匹配，</p>
            <p class='footer' style='color: white; font-size: 22px;'>如果二者<span style="color: lightgreen; font-size: 22px;">匹配</span>，请按<span style="color: lightgreen; font-size: 22px;"> ${key[0]}键</span></p>
            <p class='footer' style='color: white; font-size: 22px;'>如果二者<span style="color: red; font-size: 22px;">不匹配</span>，请按<span style="color: red; font-size: 22px;"> ${key[1]}键</span></p>
            <p >请在实验过程中，</p>将您的<span style="color: lightgreen;">食指</span>放在电脑键盘的相应键位上准备按键。</p>
          </div>
        </div>
      </div>`,
      `<p style='color: white; font-size: 22px; line-height: 20px;'>您将首先完成1组练习，以确保您理解了任务要求。</p>
            <p style="color: yellow;">之后您将完成8组正式任务,</p>
            <p>每组包括48次按键的匹配任务。</p>
            <p style='color: white; font-size: 22px; line-height: 20px;'>每组完成后会有休息时间。</p>
            <p style='color: white; font-size: 22px; line-height: 20px;'>完成一组任务大约需要2分钟，整个子任务将持续大约25分钟。</p>`,
        `<p class='footer' style='font-size: 25px;'>如果对本实验还有不清楚之处，请立即向实验员咨询。</p>
            <p style='font-size: 22px; line-height: 20px;'>如果您明白了规则：请点击 继续 进入练习</p>`
    ];
},
  show_clickable_nav: true,
  button_label_previous: " <span class='add_' style='color:black; font-size: 20px;'> 返回</span>",
  button_label_next: " <span class='add_' style='color:black; font-size: 20px;'> 继续</span>",
  on_load: () => {
    $("body").css("cursor", "default");
  },
  on_finish: function () {
    $("body").css("cursor", "none");
  } //鼠标消失术，放在要消失鼠标的前一个事件里
}
//timeline.push(Instructions1);

//---------------------------第一个session-------------------
//----------------------------练习--------------------

var prac_s = {
  timeline: [
    {
      type: jsPsychPsychophysics,
      stimuli: [
        // 500ms注视点，注视点持续出现
        {
          obj_type: 'cross',
          startX: "center", // location of the cross's center in the canvas
          startY: "center",
          line_length: 40, // pixels 视角：0.8° x 0.8°
          line_width: 5,
          line_color: 'white', // You can use the HTML color name instead of the HEX color.
          show_start_time: 500,
          show_end_time: 1200// ms after the start of the trial
        },
        //  图片100ms
        {
          obj_type: "image",
          file: function () { return jsPsych.timelineVariable("Image") },
          startX: "center", // location of the cross's center in the canvas
          startY: -175, //图形和文字距离 与加号等距
          width: 190,  // 调整图片大小 视角：3.8° x 3.8°
          heigth: 190, // 调整图片大小 视角：3.8° x 3.8°
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 1200,//出现200ms
          origin_center: true
        },
        //  文字与图形同时呈现 100ms，上图下文，两者与十字等距
        {
          obj_type: 'text',
          file: function () { return jsPsych.timelineVariable("word") },
          startX: "center",
          startY: 175, //图形和文字距离 与加号等距2度
          content: function () {
            return jsPsych.timelineVariable("word", true);
          },
          font: `${80}px '微软雅黑'`, //字体和颜色设置 文字视角：3.6° x 1.6°
          text_color: 'white',
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 1200,//出现200ms
          origin_center: true
        }
      ],

      choices: ['f', 'j'],
      response_start_time: 1000,//开始作答时间，第二个刺激开始计算
      trial_duration: 2200,//结束时间，一共作答时间持续1200ms
      data: function () { return jsPsych.timelineVariable("identify") },
      on_finish: function (data) {
        data.correct_response = jsPsych.timelineVariable("identify", true)();
        data.correct = data.correct_response == data.key_press;//0错1对
        data.identity = data.correct_response == key[0] ? 'match' : 'nonmatch';
        data.responses = data.response === key[0] ? 'match' : (data.response === key[1] ? 'nonmatch' : null);
        data.Image = jsPsych.timelineVariable("Image");
        data.word = jsPsych.timelineVariable("word");
        var index_i = images.indexOf(data.Image);
        data.condition= words[index_i];
        data.task_id = "ALT1_1";
        data.screen_id = "prac_ALT1_1";

      }
    },

    {
      data: {
        screen_id: "feedback_test"//这里为反馈
      },
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function () {
        let keypress = jsPsych.data.get().last(1).values()[0].key_press; // 被试按键
        //let trial_keypress = jsPsych.data.get().last(1).values()[0].correct; //该trial正确的按键
        let time = jsPsych.data.get().last(1).values()[0].rt;
        let trial_correct_response = jsPsych.data.get().last(1).values()[0].correct_response;//该trial正确的按键
        if (time > 1200 || time === null) { //大于1200或为null为过慢
          return "<span class='add_' style='color:yellow; font-size: 70px;'> 太慢! </span>"
        } else if (time < 200) { //小于两百为过快反应
          return "<span style='color:yellow; font-size: 70px;'>过快! </span>"
        } else {
          if (keypress == trial_correct_response) { //如果按键 == 正确按键
            return "<span style='color:GreenYellow; font-size: 70px;'>正确! </span>"
          }
          else {
            return "<span style='color:red; font-size: 70px;'>错误! </span>"
          }
        }
      },

      choices: "NO_KEYS",
      trial_duration: 500,//500ms反馈
    }
  ],
  //一半匹配0，一半不匹配1，不匹配有12，匹配4*3；24 trials,key[0]匹配
  timeline_variables: [
    { Image: images[0], word: words[0], identify: function () { return key[0] } },
    { Image: images[1], word: words[1], identify: function () { return key[0] } },
    { Image: images[2], word: words[2], identify: function () { return key[0] } },
    { Image: images[3], word: words[3], identify: function () { return key[0] } },
    //
    { Image: images[0], word: words[1], identify: function () { return key[1] } },
    { Image: images[1], word: words[2], identify: function () { return key[1] } },
    { Image: images[2], word: words[3], identify: function () { return key[1] } },
    { Image: images[3], word: words[0], identify: function () { return key[1] } },

    { Image: images[0], word: words[2], identify: function () { return key[1] } },
    { Image: images[1], word: words[3], identify: function () { return key[1] } },
    { Image: images[2], word: words[0], identify: function () { return key[1] } },
    { Image: images[3], word: words[1], identify: function () { return key[1] } },

    { Image: images[0], word: words[3], identify: function () { return key[1] } },
    { Image: images[1], word: words[0], identify: function () { return key[1] } },
    { Image: images[2], word: words[1], identify: function () { return key[1] } },
    { Image: images[3], word: words[2], identify: function () { return key[1] } },
    //
    { Image: images[0], word: words[0], identify: function () { return key[0] } },
    { Image: images[1], word: words[1], identify: function () { return key[0] } },
    { Image: images[2], word: words[2], identify: function () { return key[0] } },
    { Image: images[3], word: words[3], identify: function () { return key[0] } },

    { Image: images[0], word: words[0], identify: function () { return key[0] } },
    { Image: images[1], word: words[1], identify: function () { return key[0] } },
    { Image: images[2], word: words[2], identify: function () { return key[0] } },
    { Image: images[3], word: words[3], identify: function () { return key[0] } },
  ],
  sample: {
    type: "custom",
    fn: (x) => {
      return jsPsych.randomization.shuffle(x).splice(0, alt1_sample)
    }
  },
  //randomize_order:true,
  repetitions: alt1_n,//2次
  on_finish: function () {
    $("body").css("cursor", "none"); //鼠标出现
  }
}


var feedback_p = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    let trials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    ).last(alt1_sample * alt1_n); // 运行逻辑：先挑出data里的所有的correct：true/false的数据行，成为新的数组，然后对倒数的某几组进行计算,48
    //这里填入timeline_variables里面的trial数量
    let correct_trials = trials.filter({
      correct: true
    });
    let accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    let rt = Math.round(correct_trials.select('rt').mean());
    return "<style>.context{color:white; font-size: 35px; line-height:40px}</style>\
                            <div><p class='context'>您正确回答了" + accuracy + "% 的试次。</p>" +
      "<p class='context'>您的平均反应时为" + rt + "毫秒。</p>" + "<p class='context'>按空格键继续。</p></div>";;
  }
}



var feedback_continue_practice3 = { //在这里呈现文字recap，让被试再记一下
  type: jsPsychInstructions,
  pages: function () {
    let start = "<p class='header' style='color: lightgreen;font-size:22px; line-height:20px;'>请您努力记下如下匹配对应关系，再次进行练习。</p>",
      middle = "<p class='footer' style='font-size:22px; line-height:20px;'>如果对本实验还有不清楚之处，请立即向实验员咨询。</p>",
      end = "<p style='font-size:22px; line-height:20px;'>如果您明白了规则：</p><p style='font-size:22px; line-height:20px;'>请按 继续 进入练习</p><div>";
    let tmpI = "";
    view_texts_images.forEach(v => {
      tmpI += `<p class="content" style='font-size:22px'>${v}</p>`;
    });
    return ["<p class='header' style='font-size:22px; line-height:20px;'>您的正确率未达到进入下一阶段练习的要求。</p>",
    `<div style="display: flex;">
    <div class="box" style="flex: 1;">${start}${tmpI}</div>` +
    `<div style="flex: 1; display: flex; justify-content: center; align-items: center;">
      <div style="text-align: left; padding: 0 20px;">
        <p >您的任务是：</p>判断几何图形与图形名称是否匹配，</p>
        <p class='footer' style='color: white; font-size: 22px;'>如果二者<span style="color: lightgreen; font-size: 22px;">匹配</span>，请按<span style="color: lightgreen; font-size: 22px;"> ${key[0]}键</span></p>
        <p class='footer' style='color: white; font-size: 22px;'>如果二者<span style="color: red; font-size: 22px;">不匹配</span>，请按<span style="color: red; font-size: 22px;"> ${key[1]}键</span></p>
        <p >请在实验过程中，</p>将您的<span style="color: lightgreen;">食指</span>放在电脑键盘的相应键位上准备按键。</p>
      </div>
    </div>
  </div>`,
      middle + end];
  },
  show_clickable_nav: true,
  button_label_previous: " <span class='add_' style='color:black; font-size: 20px;'> 返回</span>",
  button_label_next: " <span class='add_' style='color:black; font-size: 20px;'> 继续</span>",
  on_finish: function () {
    $("body").css("cursor", "none");
  },
  on_load: () => {
    $("body").css("cursor", "default");
  }
}

//if_node 用于判断是否呈现feedback，feedback_continue_practice
/** 计算48个试次的反应数，挑出正确的试次数，计算准确率，大于60%，反馈，不再练习*/
var if_node3 = {
  timeline: [feedback_p, feedback_continue_practice3],
  conditional_function: function (data) {
    var trials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    ).last(alt1_sample * alt1_n);//这里注意：只需要上一组的练习数据，而不是所有的数据！！ 如何实现：.last() 取data最后的几组数据（上一组练习数据）,48
    var correct_trials = trials.filter({
      correct: true
    });
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    if (accuracy >= acc) {
      return false;//达标就skip掉feedback_continue_practice这一段
    } else if (accuracy < acc) { //没达标反馈feedback,feedback_continue_practice
      return true;
    }
  }
}

/**判断是否需要循环prac_s, if_node3 */
var loop_node3 = {
  timeline: [prac_s, if_node3],
  loop_function: function () {
    var trials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    ).last(alt1_sample * alt1_n);//记得改，取数据,48
    var correct_trials = trials.filter({
      correct: true
    });
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    if (accuracy >= acc) {
      return false;//end 进入正式实验前的反馈
    } else if (accuracy < acc) { // repeat
      return true;
    }
  }
}
//timeline.push(loop_node3);


var feedback_goformal = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    let trials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    ).last(alt1_sample * alt1_n);//48
    let correct_trials = trials.filter({
      correct: true
    });
    let accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    let rt = Math.round(correct_trials.select('rt').mean());
    return "<style>.context{color:white; font-size: 35px; line-height:40px}</style>\
                            <div><p class='context'>您正确回答了" + accuracy + "% 的试次。</p>" +
      "<p class='context'>您的平均反应时为" + rt + "毫秒。</p>" +
      "<p class='context'>恭喜您完成练习。按空格键进入正式实验。</p>" +
      "<p class='footer' style='font-size: 35px; line-height:40px;'>请在进入正式实验之前将您的<span style='color: lightgreen;'>食指</span>放在电脑键盘的相应键位上进行按键。</p>"
  },
  on_finish: function () {
    $("body").css("cursor", "none");
  }
}
//timeline.push(feedback_goformal);

//-------------正式实验----------------

let same = {
  timeline: [
    {
      type: jsPsychPsychophysics,
      stimuli: [
        {
          obj_type: 'cross',
          startX: "center", // location of the cross's center in the canvas
          startY: "center",
          line_length: 40, // pixels 视角：0.8° x 0.8°
          line_width: 5,
          line_color: 'white', // You can use the HTML color name instead of the HEX color.
          show_start_time: 500,
          show_end_time: 1200// ms after the start of the trial
        },
        {
          obj_type: "image",
          file: function () { return jsPsych.timelineVariable("Image") },
          startX: "center", // location of the cross's center in the canvas
          startY: -175, //图形和文字距离 与加号等距
          width: 190,  // 调整图片大小 视角：3.8° x 3.8°
          heigth: 190, // 调整图片大小 视角：3.8° x 3.8°
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 1200,//出现50ms
          origin_center: true
        },//上一组end时间减去下一组show时间就是空屏的100ms
        {
          obj_type: 'text',
          file: function () { return jsPsych.timelineVariable("word") },
          startX: "center",
          startY: 175, //图形和文字距离 与加号等距2度
          content: function () {
            return jsPsych.timelineVariable("word", true);
          },
          font: `${80}px '微软雅黑'`, //字体和颜色设置 文字视角：3.6° x 1.6°
          text_color: 'white',
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 1200,//出现100ms
          origin_center: true
        }
      ],

      choices: ['f', 'j'],
      response_start_time: 1000,//开始作答时间，第二个刺激开始计算
      trial_duration: 2200,//结束时间，一共作答时间持续1200ms
      data: function () { return jsPsych.timelineVariable("identify") },
      on_finish: function (data) {
        data.correct_response = jsPsych.timelineVariable("identify", true)();
        data.correct = data.correct_response == data.key_press;//0错1对
        data.identity = data.correct_response == key[0] ? 'match' : 'nonmatch';
        data.responses = data.response === key[0] ? 'match' : (data.response === key[1] ? 'nonmatch' : null);
        data.Image = jsPsych.timelineVariable("Image");
        data.word = jsPsych.timelineVariable("word");
        var index_i = images.indexOf(data.Image);
        data.condition = words[index_i];
        data.task_id = "ALT1";
        data.screen_id = "formal_ALT1_1";

      }
    },
    {
      data: {
        screen_id: "feedback_test"//这里为反馈
      },
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function () {
        let keypress = jsPsych.data.get().last(1).values()[0].key_press; // 被试按键
        //let trial_keypress = jsPsych.data.get().last(1).values()[0].correct; //该trial正确的按键
        let time = jsPsych.data.get().last(1).values()[0].rt;
        let trial_correct_response = jsPsych.data.get().last(1).values()[0].correct_response;//该trial正确的按键
        if (time > 1200 || time === null) { //大于1200或为null为过慢
          return "<span class='add_' style='color:yellow; font-size: 70px;'> 太慢! </span>"
        } else if (time < 200) { //小于两百为过快反应
          return "<span style='color:yellow; font-size: 70px;'>过快! </span>"
        } else {
          if (keypress == trial_correct_response) { //如果按键 == 正确按键
            return "<span style='color:GreenYellow; font-size: 70px;'>正确! </span>"
          }
          else {
            return "<span style='color:red; font-size: 70px;'>错误! </span>"
          }
        }
      },

      choices: "NO_KEYS",
      trial_duration: 500,//500ms反馈
    }
  ],

  //一半匹配0，一半不匹配1，不匹配有12，匹配4*3；24 trials
  timeline_variables: [
    { Image: images[0], word: words[0], identify: function () { return key[0] } },
    { Image: images[1], word: words[1], identify: function () { return key[0] } },
    { Image: images[2], word: words[2], identify: function () { return key[0] } },
    { Image: images[3], word: words[3], identify: function () { return key[0] } },
    //
    { Image: images[0], word: words[1], identify: function () { return key[1] } },
    { Image: images[1], word: words[2], identify: function () { return key[1] } },
    { Image: images[2], word: words[3], identify: function () { return key[1] } },
    { Image: images[3], word: words[0], identify: function () { return key[1] } },

    { Image: images[0], word: words[2], identify: function () { return key[1] } },
    { Image: images[1], word: words[3], identify: function () { return key[1] } },
    { Image: images[2], word: words[0], identify: function () { return key[1] } },
    { Image: images[3], word: words[1], identify: function () { return key[1] } },

    { Image: images[0], word: words[3], identify: function () { return key[1] } },
    { Image: images[1], word: words[0], identify: function () { return key[1] } },
    { Image: images[2], word: words[1], identify: function () { return key[1] } },
    { Image: images[3], word: words[2], identify: function () { return key[1] } },
    //
    { Image: images[0], word: words[0], identify: function () { return key[0] } },
    { Image: images[1], word: words[1], identify: function () { return key[0] } },
    { Image: images[2], word: words[2], identify: function () { return key[0] } },
    { Image: images[3], word: words[3], identify: function () { return key[0] } },

    { Image: images[0], word: words[0], identify: function () { return key[0] } },
    { Image: images[1], word: words[1], identify: function () { return key[0] } },
    { Image: images[2], word: words[2], identify: function () { return key[0] } },
    { Image: images[3], word: words[3], identify: function () { return key[0] } },
  ],
  sample: {
    type: "custom",
    fn: (x) => {
      return jsPsych.randomization.shuffle(x).splice(0, alt1_sample)
    }
  },
  //randomize_order:true,
  repetitions: alt1_n,//重复2次
  on_finish: function () {
    $("body").css("cursor", "none"); //鼠标出现
  }
}

let feedback_block = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    // aaaaa = 1;  筛选，必须要！！！！！！！！！！！
    let trials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    ).last(alt1_sample * alt1_n);// last()填入一个block里的trial总数,48
    let correct_trials = trials.filter({
      correct: true
    });
    let accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    let rt = Math.round(correct_trials.select('rt').mean());
    return "<style>.context{color:white; font-size: 35px; line-height:40px}</style>\
                            <div><p class='context'>您正确回答了" + accuracy + "% 的试次。</p>" +
      "<p class='context'>您的平均反应时为" + rt + "毫秒。</p>" +
      "<p class='context'>请按空格键进入休息。</p></div>";
  },
  on_finish: function () {
    $("body").css("cursor", "none"); //鼠标出现
  }
};


let blockTotalNum = blockTotalNum_same;// 此处填入总block数量-1，比如总数量是3，那么值就需要是2，此处为7
let rest_same = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    let totaltrials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    );

    return `
    
        <p >您当前还剩余${blockTotalNum}组实验</p>
        <p >现在是休息时间，当您结束休息后，</p>
        <p>您可以点击 结束休息 按钮 继续。</p>
        <p>建议休息时间还剩余<span id="iii">60</span>秒。</p>`
  },
  choices: ["结束休息"],
  on_load: function () {
    $("body").css("cursor", "default");
    let tmpTime = setInterval(function () {
      $("#iii").text(parseInt($("#iii").text()) - 1);
      if (parseInt($("#iii").text()) < 1) {
        $("#iii").parent().text("当前限定休息时间已到达，如果还未到达状态，请继续休息。");
        clearInterval(parseInt(sessionStorage.getItem("tmpInter")));
      }
    }, 1000);
    sessionStorage.setItem("tmpInter", tmpTime);
  },
  on_finish: function () {
    $("body").css("cursor", "none"); //鼠标消失
    blockTotalNum -= 1;
    $(document.body).unbind();
    clearInterval(parseInt(sessionStorage.getItem("tmpInter")));
  }
}


let cong_same = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p style='color: white; font-size: 22px'>恭喜您，当前的子任务已经完成。</p>
    <p> <div style = "color: green"><按空格键继续></div></p>
    `,
  choices: "ALL_KEYS",
  on_finish: function () {
    $("body").css("cursor", "none");

  }
};

let p_gotosame = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p style='color: white; font-size: 22px'>请您将手指放在按键上，准备进入正式的匹配任务。</p>
    <p> <div style = "color: green"><按空格键进入下一阶段的匹配任务></div></p>
    `,
  choices: "ALL_KEYS",
  on_finish: function () {
    $("body").css("cursor", "none");

  }
};

var repeatblock3 = [
  Instructions1, loop_node3, feedback_goformal,
  p_gotosame,//进入正式实验的指导语
  {
    timeline: [same, feedback_block, rest_same],//48 trials的，先十字，刺激，反馈，数据；休息的反馈；结束休息的信号（休息1分钟）
    repetitions: blockTotalNum_same+1,//之前是blockTotalNum_same + 1
  },
  cong_same//完成一个的结束语
];

//-------------第二个session--------------------------------
//---------------------------------------------------------


var Instructions2 = {
  type: jsPsychInstructions,
  pages: function () {
    let start = "<p class='header' style = 'font-size: 22px'>请您记住如下对应关系:</p>";
    let tmpI2 = "";
    view_texts_images2.forEach(v => {
      tmpI2 += `<p class="content">${v}</p>`;
    });
    return [
      `<div style="display: flex;">
      <div class="box" style="flex: 1;">${start}${tmpI2}</div>` +
      `<div style="flex: 1; display: flex; justify-content: center; align-items: center;">
        <div style="text-align: left; padding: 0 20px;">
          <p >您的任务是：</p>判断几何图形与图形名称是否匹配，</p>
          <p class='footer' style='color: white; font-size: 22px;'>如果二者<span style="color: lightgreen; font-size: 22px;">匹配</span>，请按<span style="color: lightgreen; font-size: 22px;"> ${key[0]}键</span></p>
          <p class='footer' style='color: white; font-size: 22px;'>如果二者<span style="color: red; font-size: 22px;">不匹配</span>，请按<span style="color: red; font-size: 22px;"> ${key[1]}键</span></p>
          <p >请在实验过程中，</p>将您的<span style="color: lightgreen;">食指</span>放在电脑键盘的相应键位上准备按键。</p>
        </div>
      </div>
    </div>`,
    `<p style='color: white; font-size: 22px; line-height: 20px;'>您将首先完成1组练习，以确保您理解了任务要求。</p>
          <p style="color: yellow;">之后您将完成8组正式任务,</p>
          <p>每组包括48次按键的匹配任务。</p>
          <p style='color: white; font-size: 22px; line-height: 20px;'>每组完成后会有休息时间。</p>
          <p style='color: white; font-size: 22px; line-height: 20px;'>完成一组任务大约需要2分钟，整个子任务将持续大约25分钟。</p>`,      
         ` <p class='footer' style='font-size: 25px;'>如果对本实验还有不清楚之处，请立即向实验员咨询。</p>
          <p style='font-size: 22px; line-height: 20px;'>如果您明白了规则：请点击 继续 进入练习</p>`];
  },
  show_clickable_nav: true,
  button_label_previous: " <span class='add_' style='color:black; font-size: 20px;'> 返回</span>",
  button_label_next: " <span class='add_' style='color:black; font-size: 20px;'> 继续</span>",
  on_load: () => {
    $("body").css("cursor", "default");
  },
  on_finish: function () {
    $("body").css("cursor", "none");
  } //鼠标消失术，放在要消失鼠标的前一个事件里
}
//timeline.push(Instructions2);

//----------------------------练习--------------------

var prac_s2 = {
  timeline: [
    {
      type: jsPsychPsychophysics,
      stimuli: [
        // 500ms注视点
        {
          obj_type: 'cross',
          startX: "center", // location of the cross's center in the canvas
          startY: "center",
          line_length: 40, // pixels 视角：0.8° x 0.8°
          line_width: 5,
          line_color: 'white', // You can use the HTML color name instead of the HEX color.
          show_start_time: 500,
          show_end_time: 1200// ms after the start of the trial
        },
        //  图片100ms
        {
          obj_type: "image",
          file: function () { return jsPsych.timelineVariable("Image") },
          startX: "center", // location of the cross's center in the canvas
          startY: -175, //图形和文字距离 与加号等距
          width: 190,  // 调整图片大小 视角：3.8° x 3.8°
          heigth: 190, // 调整图片大小 视角：3.8° x 3.8°
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 1200,//出现100ms
          origin_center: true
        },
        //  文字与图形同时呈现 100ms，上图下文，两者与十字等距
        {
          obj_type: 'text',
          file: function () { return jsPsych.timelineVariable("word") },
          startX: "center",
          startY: 175, //图形和文字距离 与加号等距2度
          content: function () {
            return jsPsych.timelineVariable("word", true);
          },
          font: `${80}px '微软雅黑'`, //字体和颜色设置 文字视角：3.6° x 1.6°
          text_color: 'white',
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 1200,//出现100ms
          origin_center: true
        }
      ],

      choices: ['f', 'j'],
      response_start_time: 1000,//开始作答时间，第二个刺激开始计算
      trial_duration: 2200,//结束时间，一共作答时间持续1200ms
      data: function () { return jsPsych.timelineVariable("identify") },
      on_finish: function (data) {
        data.correct_response = jsPsych.timelineVariable("identify", true)();
        data.correct = data.correct_response == data.key_press;//0错1对
        data.identity = data.correct_response == key[0] ? 'match' : 'nonmatch';
        data.responses = data.response === key[0] ? 'match' : (data.response === key[1] ? 'nonmatch' : null);
        data.Image = jsPsych.timelineVariable("Image");
        data.word = jsPsych.timelineVariable("word");
        var index_i = images.indexOf(data.Image);
        data.condition = words[index_i];
        data.task_id = "ALT1_2";
        data.screen_id = "prac_ALT1_2";
      }
    },

    {
      data: {
        screen_id: "feedback_test"//这里为反馈
      },
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function () {
        let keypress = jsPsych.data.get().last(1).values()[0].key_press; // 被试按键
        //let trial_keypress = jsPsych.data.get().last(1).values()[0].correct; //该trial正确的按键
        let time = jsPsych.data.get().last(1).values()[0].rt;
        let trial_correct_response = jsPsych.data.get().last(1).values()[0].correct_response;//该trial正确的按键
        if (time > 1200 || time === null) { //大于1200或为null为过慢
          return "<span class='add_' style='color:yellow; font-size: 70px;'> 太慢! </span>"
        } else if (time < 200) { //小于两百为过快反应
          return "<span style='color:yellow; font-size: 70px;'>过快! </span>"
        } else {
          if (keypress == trial_correct_response) { //如果按键 == 正确按键
            return "<span style='color:GreenYellow; font-size: 70px;'>正确! </span>"
          }
          else {
            return "<span style='color:red; font-size: 70px;'>错误! </span>"
          }
        }
      },

      choices: "NO_KEYS",
      trial_duration: 500,//500ms反馈
    }
  ],
  //一半匹配0，一半不匹配1，不匹配有12，匹配4*3；24 trials
  timeline_variables: [
    { Image: images[4], word: words[4], identify: function () { return key[0] } },
    { Image: images[5], word: words[5], identify: function () { return key[0] } },
    { Image: images[6], word: words[6], identify: function () { return key[0] } },
    { Image: images[7], word: words[7], identify: function () { return key[0] } },
    //
    { Image: images[4], word: words[5], identify: function () { return key[1] } },
    { Image: images[5], word: words[6], identify: function () { return key[1] } },
    { Image: images[6], word: words[7], identify: function () { return key[1] } },
    { Image: images[7], word: words[4], identify: function () { return key[1] } },

    { Image: images[4], word: words[6], identify: function () { return key[1] } },
    { Image: images[5], word: words[7], identify: function () { return key[1] } },
    { Image: images[6], word: words[4], identify: function () { return key[1] } },
    { Image: images[7], word: words[5], identify: function () { return key[1] } },

    { Image: images[4], word: words[7], identify: function () { return key[1] } },
    { Image: images[5], word: words[4], identify: function () { return key[1] } },
    { Image: images[6], word: words[5], identify: function () { return key[1] } },
    { Image: images[7], word: words[6], identify: function () { return key[1] } },
    //
    { Image: images[4], word: words[4], identify: function () { return key[0] } },
    { Image: images[5], word: words[5], identify: function () { return key[0] } },
    { Image: images[6], word: words[6], identify: function () { return key[0] } },
    { Image: images[7], word: words[7], identify: function () { return key[0] } },

    { Image: images[4], word: words[4], identify: function () { return key[0] } },
    { Image: images[5], word: words[5], identify: function () { return key[0] } },
    { Image: images[6], word: words[6], identify: function () { return key[0] } },
    { Image: images[7], word: words[7], identify: function () { return key[0] } },
  ],
  sample: {
    type: "custom",
    fn: (x) => {
      return jsPsych.randomization.shuffle(x).splice(0, alt1_sample)
    }
  },
  //randomize_order:true,
  repetitions: alt1_n,
  on_finish: function () {
    // $("body").css("cursor", "default"); //鼠标出现
  }
}
//timeline.push(prac_s2);

var feedback_p2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    let trials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    ).last(alt1_sample * alt1_n); // 运行逻辑：先挑出data里的所有的correct：true/false的数据行，成为新的数组，然后对倒数的某几组进行计算,48
    //这里填入timeline_variables里面的trial数量
    let correct_trials = trials.filter({
      correct: true
    });
    let accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    let rt = Math.round(correct_trials.select('rt').mean());
    return "<style>.context{color:white; font-size: 35px; line-height:40px}</style>\
                          <div><p class='context'>您正确回答了" + accuracy + "% 的试次。</p>" +
      "<p class='context'>您的平均反应时为" + rt + "毫秒。</p>" + "<p class='context'>恭喜您完成练习。按空格键继续。</p></div>";
  }
}


var feedback_continue_practice2 = { //在这里呈现文字recap，让被试再记一下
  type: jsPsychInstructions,
  pages: function () {
    let start = "<p class='header' style='font-size:25px; line-height:20px;'>请您努力记下如下匹配对应关系，再次进行练习。</p>",
      middle = "<p class='footer' style='font-size:25px; line-height:20px;'>如果对本实验还有不清楚之处，请立即向实验员咨询。</p>",
      end = "<p style='font-size:25px; line-height:20px;'>如果您明白了规则：</p><p style='font-size:22px; line-height:20px;'>请按 继续 进入练习。</p><div>";
    let tmpI2 = "";
    view_texts_images2.forEach(v => {
      tmpI2 += `<p class="content" style='font-size:22px'>${v}</p>`;
    });
    return ["<p class='header' style='font-size:22px; line-height:20px;'>您的正确率未达到进入下一阶段练习的要求。</p>",
    `<div style="display: flex;">
    <div class="box" style="flex: 1;">${start}${tmpI2}</div>` +
    `<div style="flex: 1; display: flex; justify-content: center; align-items: center;">
      <div style="text-align: left; padding: 0 20px;">
        <p >您的任务是：</p>判断几何图形与图形名称是否匹配，</p>
        <p class='footer' style='color: white; font-size: 22px;'>如果二者<span style="color: lightgreen; font-size: 22px;">匹配</span>，请按<span style="color: lightgreen; font-size: 22px;"> ${key[0]}键</span></p>
        <p class='footer' style='color: white; font-size: 22px;'>如果二者<span style="color: red; font-size: 22px;">不匹配</span>，请按<span style="color: red; font-size: 22px;"> ${key[1]}键</span></p>
        <p >请在实验过程中，</p>将您的<span style="color: lightgreen;">食指</span>放在电脑键盘的相应键位上准备按键。</p>
      </div>
    </div>
  </div>`,
      middle + end];
  },
  show_clickable_nav: true,
  button_label_previous: " <span class='add_' style='color:black; font-size: 20px;'> 返回</span>",
  button_label_next: " <span class='add_' style='color:black; font-size: 20px;'> 继续</span>",
  on_finish: function () {
    $("body").css("cursor", "none");
  },
  on_load: () => {
    $("body").css("cursor", "default");
  }
}


var if_node2 = { //if_node 用于判断是否呈现feedback，feedback_continue_practice
  timeline: [feedback_p2, feedback_continue_practice2],
  conditional_function: function (data) {
    var trials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    ).last(alt1_sample * alt1_n);//这里注意：只需要上一组的练习数据，而不是所有的数据！！ 如何实现：.last() 取data最后的几组数据（上一组练习数据）,48
    var correct_trials = trials.filter({
      correct: true
    });
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    if (accuracy >= acc) {
      return false;//达标就skip掉feedback_continue_practice这一段
    } else if (accuracy < acc) { //没达标反馈feedback,feedback_continue_practice
      return true;
    }
  }
}


var loop_node2 = {
  timeline: [prac_s2, if_node2],
  loop_function: function () {
    var trials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    ).last(alt1_sample * alt1_n);//记得改，取数据,48
    var correct_trials = trials.filter({
      correct: true
    });
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    if (accuracy >= acc) {
      return false;//end 进入正式实验前的反馈
    } else if (accuracy < acc) { // repeat
      return true;
    }
  }
}
//timeline.push(loop_node2);


var feedback_goformal2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    let trials2 = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    ).last(alt1_sample * alt1_n);//48
    let correct_trials2 = trials2.filter({
      correct: true
    });
    let accuracy2 = Math.round(correct_trials2.count() / trials2.count() * 100);
    let rt2 = Math.round(correct_trials2.select('rt').mean());
    return "<style>.context{color:white; font-size: 35px; line-height:40px}</style>\
                          <div><p class='context'>您正确回答了" + accuracy2 + "% 的试次。</p>" +
      "<p class='context'>您的平均反应时为" + rt2 + "毫秒。</p>" +
      "<p class='context'>恭喜您完成练习。按空格键进入正式实验。</p>" +
      "<p class='footer' style='font-size: 35px; line-height:40px;'>请在进入正式实验实验之前将您的<span style='color: lightgreen;'>食指</span>放在电脑键盘的相应键位上进行按键。</p>"
  },
  on_finish: function () {
    $("body").css("cursor", "none");
  }
}
//timeline.push(feedback_goformal2);

//-------------正式实验----------------

let same2 = {
  timeline: [
    {
      type: jsPsychPsychophysics,
      stimuli: [
        {
          obj_type: 'cross',
          startX: "center", // location of the cross's center in the canvas
          startY: "center",
          line_length: 40, // pixels 视角：0.8° x 0.8°
          line_width: 5,
          line_color: 'white', // You can use the HTML color name instead of the HEX color.
          show_start_time: 500,
          show_end_time: 1200// ms after the start of the trial
        },
        {
          obj_type: "image",
          file: function () { return jsPsych.timelineVariable("Image") },
          startX: "center", // location of the cross's center in the canvas
          startY: -175, //图形和文字距离 与加号等距
          width: 190,  // 调整图片大小 视角：3.8° x 3.8°
          heigth: 190, // 调整图片大小 视角：3.8° x 3.8°
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 1200,//出现50ms
          origin_center: true
        },//上一组end时间减去下一组show时间就是空屏的100ms
        {
          obj_type: 'text',
          file: function () { return jsPsych.timelineVariable("word") },
          startX: "center",
          startY: 175, //图形和文字距离 与加号等距2度
          content: function () {
            return jsPsych.timelineVariable("word", true);
          },
          font: `${80}px 'Arial'`, //字体和颜色设置 文字视角：3.6° x 1.6°
          text_color: 'white',
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 1200,//出现50ms
          origin_center: true
        }
      ],

      choices: ['f', 'j'],
      response_start_time: 1000,//开始作答时间，第二个刺激开始计算
      trial_duration: 2200,//结束时间，一共作答时间持续1200ms
      data: function () { return jsPsych.timelineVariable("identify") },
      on_finish: function (data) {
        data.correct_response = jsPsych.timelineVariable("identify", true)();
        data.correct = data.correct_response == data.key_press;//0错1对
        data.identity = data.correct_response == key[0] ? 'match' : 'nonmatch';
        data.responses = data.response === key[0] ? 'match' : (data.response === key[1] ? 'nonmatch' : null);
        data.Image = jsPsych.timelineVariable("Image");
        data.word = jsPsych.timelineVariable("word");
        var index_i = images.indexOf(data.Image);
        data.condition = words[index_i];
        data.task_id = "ALT1";
        data.screen_id = "formal_ALT1_2";
      }
    },
    {
      data: {
        screen_id: "feedback_test"//这里为反馈
      },
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function () {
        let keypress = jsPsych.data.get().last(1).values()[0].key_press; // 被试按键
        //let trial_keypress = jsPsych.data.get().last(1).values()[0].correct; //该trial正确的按键
        let time = jsPsych.data.get().last(1).values()[0].rt;
        let trial_correct_response = jsPsych.data.get().last(1).values()[0].correct_response;//该trial正确的按键
        if (time > 1200 || time === null) { //大于1200或为null为过慢
          return "<span class='add_' style='color:yellow; font-size: 70px;'> 太慢! </span>"
        } else if (time < 200) { //小于两百为过快反应
          return "<span style='color:yellow; font-size: 70px;'>过快! </span>"
        } else {
          if (keypress == trial_correct_response) { //如果按键 == 正确按键
            return "<span style='color:GreenYellow; font-size: 70px;'>正确! </span>"
          }
          else {
            return "<span style='color:red; font-size: 70px;'>错误! </span>"
          }
        }
      },

      choices: "NO_KEYS",
      trial_duration: 500,//500ms反馈
    }
  ],

  //一半匹配0，一半不匹配1，不匹配有12，匹配4*3；24 trials
  timeline_variables: [
    { Image: images[4], word: words[4], identify: function () { return key[0] } },
    { Image: images[5], word: words[5], identify: function () { return key[0] } },
    { Image: images[6], word: words[6], identify: function () { return key[0] } },
    { Image: images[7], word: words[7], identify: function () { return key[0] } },
    //
    { Image: images[4], word: words[5], identify: function () { return key[1] } },
    { Image: images[5], word: words[6], identify: function () { return key[1] } },
    { Image: images[6], word: words[7], identify: function () { return key[1] } },
    { Image: images[7], word: words[4], identify: function () { return key[1] } },

    { Image: images[4], word: words[6], identify: function () { return key[1] } },
    { Image: images[5], word: words[7], identify: function () { return key[1] } },
    { Image: images[6], word: words[4], identify: function () { return key[1] } },
    { Image: images[7], word: words[5], identify: function () { return key[1] } },

    { Image: images[4], word: words[7], identify: function () { return key[1] } },
    { Image: images[5], word: words[4], identify: function () { return key[1] } },
    { Image: images[6], word: words[5], identify: function () { return key[1] } },
    { Image: images[7], word: words[6], identify: function () { return key[1] } },
    //
    { Image: images[4], word: words[4], identify: function () { return key[0] } },
    { Image: images[5], word: words[5], identify: function () { return key[0] } },
    { Image: images[6], word: words[6], identify: function () { return key[0] } },
    { Image: images[7], word: words[7], identify: function () { return key[0] } },

    { Image: images[4], word: words[4], identify: function () { return key[0] } },
    { Image: images[5], word: words[5], identify: function () { return key[0] } },
    { Image: images[6], word: words[6], identify: function () { return key[0] } },
    { Image: images[7], word: words[7], identify: function () { return key[0] } },
  ],
  sample: {
    type: "custom",
    fn: (x) => {
      return jsPsych.randomization.shuffle(x).splice(0, alt1_sample)
    }
  },
  //randomize_order:true,
  repetitions: alt1_n,
  on_finish: function () {
    // $("body").css("cursor", "default"); //鼠标出现
  }
};

let feedback_block2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    // aaaaa = 1;  筛选，必须要！！！！！！！！！！！
    let trials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    ).last(alt1_sample * alt1_n);// last()填入一个block里的trial总数,48
    let correct_trials = trials.filter({
      correct: true
    });
    let accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    let rt = Math.round(correct_trials.select('rt').mean());
    return "<style>.context{color:white; font-size: 35px; line-height:40px}</style>\
                          <div><p class='context'>您正确回答了" + accuracy + "% 的试次。</p>" +
      "<p class='context'>您的平均反应时为" + rt + "毫秒。</p>" +
      "<p class='context'>请按空格键进入休息。</p></div>";
  },
  on_finish: function () {
    // $("body").css("cursor", "default"); //鼠标出现
  }
};


let blockTotalNum_2 = blockTotalNum_same;// 此处填入总block数量-1，比如总数量是3，那么值就需要是2
let rest_same2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function () {
    let totaltrials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    );
    return `
   
       <p>您当前还剩余${blockTotalNum_2}组实验</p>
       <p >现在是休息时间，当您结束休息后，</p>
       <p>您可以点击 结束休息 按钮 继续。</p>
       <p >建议休息时间还剩余<span id="iii">60</span>秒。</p> `
  },
  choices: ["结束休息"],
  on_load: function () {
    $("body").css("cursor", "default");
    let tmpTime = setInterval(function () {
      $("#iii").text(parseInt($("#iii").text()) - 1);
      if (parseInt($("#iii").text()) < 1) {
        $("#iii").parent().text("当前限定休息时间已到达，如果还未到达状态，请继续休息。");
        clearInterval(parseInt(sessionStorage.getItem("tmpInter")));
      }
    }, 1000);
    sessionStorage.setItem("tmpInter", tmpTime);
  },
  on_finish: function () {
    $("body").css("cursor", "none"); //鼠标消失
    blockTotalNum_2 -= 1;
    $(document.body).unbind();
    clearInterval(parseInt(sessionStorage.getItem("tmpInter")));
  }
}


let cong_same2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <p style='color: white; font-size: 22px'>恭喜您，当前子任务已经完成。</p>
  <p> <div style = "color: green"><按空格键继续></div></p>
  `,
  choices: "ALL_KEYS",
};

let p_gotosame2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <p style='color: white; font-size: 22px'>请您将手指放在按键上，准备进入正式的匹配任务。</p>
  <p> <div style = "color: green"><按空格键进入下一阶段的匹配任务></div></p>
  `,
  choices: "ALL_KEYS",
};

var repeatblock2 = [
  Instructions2,
  loop_node2,
  feedback_goformal2,

  p_gotosame2,
  {
    timeline: [same2, feedback_block2, rest_same2],
    repetitions: blockTotalNum_same+1,//之前是blockTotalNum_same + 1
  },
  cong_same2
];
//----------------------------------------------------------
//----------------------------------------------------------



//----------结束-------------------------------------------

//timeline.push({timeline:[Instructions0,{timeline:repeatblock3}]})
//timeline.push({
var ALT_1 = {
  timeline: [
    // Instructions0,
    {
      timeline: repeatblock3,
      conditional_function: () => {
        return jsPsych.timelineVariable("a", true) == 3
      }
    }, {
      timeline:
        repeatblock2,
      conditional_function: () => {
        return jsPsych.timelineVariable("a", true) == 2
      }
    },],

  timeline_variables: jsPsych.randomization.factorial({
    a: jsPsych.randomization.shuffleNoRepeats(
      jsPsych.randomization.repeat([2, 3], 1)
    )
  })
}
//});


var finish = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>感谢您参加我们的实验，请<span style="color: yellow;">按空格键开始上传数据</span>，并通知研究者。</p>
    <p>感谢您的配合！</p>`,
  choices: "ALL_KEYS",
  trial_duration: 5000,
  response_ends_trial: true,
  extensions: [
    { type: Naodao }
  ]

};
  //timeline.push(finish);

//jsPsych.run(timeline);

