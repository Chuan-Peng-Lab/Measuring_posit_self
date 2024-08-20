/*const jsPsych = initJsPsych({
     auto_update_progress_bar: true,
     extensions: {
       type: naodao,
     },
     on_finish: function() {
      jsPsych.data.get().localSave('csv', 'ALT2' + info["subj_idx"] + '.csv'); 
      document.exitFullscreen(); // 退出全屏
      let bodyNode = document.getElementsByTagName("body"); // 获取Body窗体
            }
     });*/


//-----------------刺激材料设置------------------------------------------------------------------

//var timeline = [] //设置一个时间线
 // 获取指定数量的随机元素
 function getRandomElements(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
//将图片分为两组
const im1 = ['img/circle.png', 'img/diamond.png', 'img/square.png', 'img/triangle.png']//设置刺激
const im2 = ['img/ellipse.png', 'img/hexagon.png', 'img/pentagon.png', 'img/trapezoid.png',]
const images = im1.concat(im2)
var picture =['img/circle.png', 'img/diamond.png', 'img/square.png', 'img/triangle.png', 'img/ellipse.png', 'img/hexagon.png', 'img/pentagon.png', 'img/trapezoid.png',]
var images1 = [];
var images2 = [];

do {
  images1 = getRandomElements(picture, 4);
  images2 = picture.filter(element => !images1.includes(element));
} while ((images1.includes('img/circle.png') && images1.includes('img/ellipse.png')) || (images2.includes('img/circle.png') && images2.includes('img/ellipse.png'))||(images1.includes('img/hexagon.png') && images1.includes('img/pentagon.png')) ||(images2.includes('img/hexagon.png') && images2.includes('img/pentagon.png')) );



const preload = {
  type: jsPsychPreload,
  images: images,
}
//timeline.push(preload);//preload图片



var self_moral = ["好我", "坏我",]
var male_moral = ["好他", "坏他",]
var moral_m = self_moral.concat(male_moral)

var female_moral = ["好她", "坏她",]
var moral_f = self_moral.concat(female_moral)

var self_ability = ["强我", "弱我",]
var male_ability = ["强他", "弱他",]
var ability_m = self_ability.concat(male_ability)

var female_ability = ["强她", "弱她",]
var ability_f = self_ability.concat(female_ability)

var key = ['f', 'j']//按键
//var key =[['f','j'],['j','f']]
//正确率60%
let acc = 60;
let view_texts_images = [];
let view_texts_images2 = [];
var texts = [];
var texts2 = [];

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
   <p><div style='color:white; font-size: 25px'>您好，欢迎参加本次实验。</div></p>
   <p><div style='color:white; font-size: 25px'>为充分保障您的权利，请确保您已经知晓并同意《参与实验同意书》以及《数据公开知情同意书》。</div></p>
   <p><div style='color:white; font-size: 25px'>如果您未见过上述内容，请咨询实验员。</div></p>
   <p style='color:white; font-size: 25px'>如果您选择继续实验，则表示您已经清楚两份知情同意书的内容并同意。</p>
   <p><div style = "color: pink;font-size:30px;">请确保您记得day0的实验编号，您将在本次实验输入该编号，若您忘记，请咨询实验员后作答。</div></p>
   <p><div style = "color:lightblue;font-size:25px;">请您尽可能认真地作答，我们将依据您在各问卷和按键任务中的作答质量发放报酬。</div></p>
   <p> <div style = "color: green"><按空格键至下页></div> </p>
   `,
  choices: [' '],
};
//timeline.push(welcome);//设置欢迎语

var info = []

/* basic data collection jsPsychInstructions trial 被试基本信息收集 */
var information = {
  timeline: [{
    type: jsPsychCallFunction, //探测被试显示器数据
    func: function () {
      if ($(window).outerHeight() < 500) {
        alert("您设备不支持实验，请进入全屏模式。若已进入全屏，请换一台高分辨率的设备，谢谢。");
        window.location = "";
      }
    }
  },
  {
    type: jsPsychSurveyHtmlForm,
    preamble: "<p style='color: white;font-size:25px;'>请回忆某一个亲密的朋友，你们至少2年前就认识了，并且最近2年经常见面。</p><p style='color: white;font-size:25px;'>后续实验中出现的 “朋友” 均指代这个朋友。</p><p style='color: white;font-size:25px;'>该好友与先前实验中回忆起的为同一个人。</p>",
    html: `
      <p><div style='color: white;font-size:25px;'>1.该朋友的性别</div></p> 
      <input type="radio" name="Sex" value="0">男<br> 
      <input type="radio" name="Sex" value="1">女<br> 
      <p><div style =' color : white;font-size:20px;'>2.该朋友的姓氏</div></p> 
      <input type="text" placeholder= '例如: 陈', name="friend_name" required><br>    
      <p><div style =' color : white;font-size:20px;'>3.您的实验编号是</div></p> 
    <input type="text" name="ParticipantID" required/><br> 
    `,//收集被试编号以及朋友的性别<p><div style =' color : white;font-size:20px;'>3.您的实验编号是</div></p> 
    //<input type="text" name="subj_idx" required/><br> 

    button_label: '继续',
    dataAsArray: true,
    on_finish: function (data) {
      var response = data.response;
  var subj_idx=$.ajax("https://www.naodao.com/api/register-server/user/getInfo", {async: false}).responseJSON.data.userId;
      var sex = "";
      var friend_name = "";
      var ParticipantID = "";
      response.forEach(function (item) {
        if (item.name === "Sex") {
          sex = item.value;
        }else if (item.name === "friend_name") {
          friend_name = item.value;
        }else if (item.name === "ParticipantID") {
          ParticipantID = item.value;
        }
      });
     info["subj_idx"] = subj_idx;
      info["friend_name"] = friend_name;
      info["ParticipantID"] = ParticipantID;
      info["Sex"] = sex == 0 ? "Male" : "Female";//将性别转为female，male

      //将response[{"name":"Sex","value":"1"},{"name":"subj_idx","value":"34"}]内value提取，并储存至info
      key = permutation(key, 2)[parseInt(info["ParticipantID"]) % 2]; //平衡按键f,j

      view_texts_images = [];
      view_texts_images2 = [];
      texts = [];
      texts2 = [];

      if (info["Sex"] === "Female") {//根据被试性别，选择不同的文字标签（e.g.好她)
        texts = moral_f;
        word = permutation(texts, 4);
        texts = word[parseInt(info["ParticipantID"]) % 24];//从24种排列组合中选择一种标签顺序，与image1对应，构成规则
        jsPsych.randomization.shuffle(images1).forEach(function (v, i) {//随机该规则中4种刺激的呈现顺序
          view_texts_images.push(`<img src="${v}" width=120 style="vertical-align:middle">---<span style="color:white">${texts[images1.indexOf(v)]}</span>`);
        });
      } else if (info["Sex"] === "Male") {
        texts = moral_m;
        word = permutation(texts, 4);
        texts = word[parseInt(info["ParticipantID"]) % 24];
        jsPsych.randomization.shuffle(images1).forEach(function (v, i) {
          view_texts_images.push(`<img src="${v}" width=120 style="vertical-align:middle">---<span style="color:white">${texts[images1.indexOf(v)]}</span>`);
        });
      }


      if (info["Sex"] === "Female") {
        texts2 = ability_f;
        word2 = permutation(texts2, 4);
        texts2 = word2[parseInt(info["ParticipantID"]) % 24];
        jsPsych.randomization.shuffle(images2).forEach(function (v, i) {
          view_texts_images2.push(`<img src="${v}" width=120 style="vertical-align:middle">---<span style="color:white">${texts2[images2.indexOf(v)]}</span>`);
        });
      } else if (info["Sex"] === "Male") {
        texts2 = ability_m;
        word2 = permutation(texts2, 4);
        texts2 = word2[parseInt(info["ParticipantID"]) % 24];
        jsPsych.randomization.shuffle(images2).forEach(function (v, i) {
          view_texts_images2.push(`<img src="${v}" width=120 style="vertical-align:middle">---<span style="color:white">${texts2[images2.indexOf(v)]}</span>`);
        });
      }
      console.log(`match : ${key[0]}; \nmismatch : ${key[1]};`);
      info["Word"] = texts;
      info["Word2"] = texts2;


      console.log(images1);
      console.log(texts);
      console.log(images2);
      console.log(texts2);
      console.log(view_texts_images);console.log(view_texts_images2);

    }
  }

  ]

}

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
  data: {
    user_agent: navigator.userAgentData,
  },
  message: `
    <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    <b>
    测验将在一个「全屏页面」开始，为确保最佳效果，请你：<br/>
    （1）在电脑上进行测验，并使用主流浏览器打开本网页<br/>
    &emsp;&emsp;（Chrome、Edge、Firefox、Safari等，不要用IE）<br/>
    （2）开始前，请将输入法切换为英文状态<br/>
    （3）关掉电脑上其他正在运行的程序或将其最小化<br/>
    （4）将手机调至静音，并尽可能减少环境噪音干扰<br/>
    （5）在测验过程中不要退出全屏，若意外退出，请按F11重新进入全屏<br/>
    （6）务必认真作答，仔细实验的阅读指导语<br/>
    （7）实验的作答认真程度以及正确率，将影响后续报酬的发放<br/>
    <br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
  button_label: '点击这里全屏开始',
  delay_after: 100
}

//timeline.push(fullscreen_trial);//将全屏设置放入到时间线里

var ALT2_Instructions0 = {
  type: jsPsychInstructions,
  pages: function () {
    let start = "<p class='header' style = 'color:white;font-size: 35px'>实验说明:</p>";
    return [start + ` <p style='color:white; font-size: 25px;line-height: 20px;'>您好，欢迎参加本实验。</p>
    <p style='color: lightgreen;font-size: 30px; line-height: 20px;'>在本实验中将用“他（她）”指代您刚才回忆起的朋友，</p>
    <p style='color: lightgreen;font-size: 30px; line-height: 20px;'>并且不同的图形将分别代表自我或朋友身上的不同特性。</p>
    <p style='color:white; font-size: 25px;'>在本实验中，您需要完成一个简单的知觉匹配任务。</p>
    <p style='color:white; font-size: 25px;'>您将学习几种几何图形与不同标签的对应关系。</p>
   <p class='footer' style='color:yellow;font-size: 25px; line-height: 20px;'>您的任务是判断几何图形与文字标签是否匹配，</p><p style='color:white; font-size: 25px; line-height: 20px;'>您将完成2个相似的知觉匹配的子任务</p><p style='color:white; font-size: 25px; line-height: 20px;'>整个知觉匹配任务将持续大约50分钟。</p><p style='color:red; font-size: 25px; line-height: 20px;'>实验的正确率将影响实验报酬的发放，</p>请尽可能保证对每个图形的判断具有60%以上的正确率，同时尽可能快地进行按键反应。</p><p style = 'font-size: 25px; line-height: 20px;'>请点击 继续 进入实验<span style='color: yellow;'>开始任务一</span>的练习</span></p><div>`];
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
    let start = "<p class='header' style = 'font-size: 22px'>请您记住如下对应关系:</p>";
    let tmpI = "";
    view_texts_images.forEach(v => {//view_texts_images先前在information里抽好的规则
      tmpI += `<p class="content">${v}</p>`;
    });
    return [`<p class='header' style = 'font-size: 25px'>实验中将出现一些文字标签，标签的意义如下:</p>
      <p class='footer' style='color: white;font-size: 25px; line-height: 25px;'>“好我”代表自己身上道德的方面，您可以想象自己在此刻做了道德的事件。</p>
      <p class='footer' style='color: white;font-size: 25px; line-height: 25px;'>“坏我”代表自己身上不道德的方面，您可以想象自己在此刻做了不道德的事件。</p>
      <p class='footer' style='color: white;font-size: 25px; line-height: 25px;'>“好他（她）”代表朋友身上道德的方面，您可以想象朋友在此刻做了道德的事件。</p>
      <p class='footer' style='color: white;font-size: 25px; line-height: 25px;'>“坏他（她）”代表朋友身上不道德的方面，您可以想象朋友在此刻做了不道德的事件。</p>`,
      `<div style="display: flex;">
    <div class="box" style="flex: 1;">${start}${tmpI}</div>` +
    `<div style="flex: 1; display: flex; justify-content: center; align-items: center;">
    <div style="text-align: left; padding: 0 20px;"><p class='footer' style='color: lightgreen;font-size: 22px; line-height: 20px;'>您的任务是：</p>判断几何图形与文字标签是否匹配，</p>       
        <p class='footer' style='color:white; font-size: 22px;'>如果二者<span style="color: lightgreen; font-size:22px">匹配</span>，请按<span style="color: lightgreen; font-size:22px"> ${key[0]} 键</span></p><p class='footer' style='color:white; font-size: 25px;'>如果二者<span style="color: red; font-size:22px">不匹配</span>，请按<span style="color: red; font-size:22px"> ${key[1]} 键</span></p><p class='footer' style='color:white; font-size: 20px;'>请在实验过程中，</p>将您的<span style="color: lightgreen;">食指</span>放在电脑键盘的相应键位上准备按键。</p></span></div>
        </div>
      </div>`,
      `<p style='color:white; font-size: 25px; line-height: 20px;'>您将首先完成1组练习，以确保您理解了任务要求。<span style="color: yellow; "></p><p>之后您将完成8组正式任务,</span></p><p>每组包括48次按键的匹配任务。</p><p style='color:white; font-size: 25px; line-height:20px;'>每组完成后会有休息时间。</p><p style='color:white; font-size: 25px; line-height:20px;'>完成一组任务大约需要2分钟，整个子任务将持续大约25分钟。</p>`,//实验时间待修改
      "<p class='footer'  style = 'font-size: 25px'>如果对本实验还有不清楚之处，请立即向实验员咨询。</p><p style = 'font-size: 22px; line-height:20px;'>如果您明白了规则：请点击 继续 进入练习</p>"];
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
        { //  图片100ms
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
          content: function () { return jsPsych.timelineVariable("word", true)() },
          startX: "center",
          startY: 175, //图形和文字距离 与加号等距2度
          /*content: function () {
            return jsPsych.timelineVariable('word', true)();
          },*/
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
        data.correct = data.correct_response == data.key_press;
        data.identity = data.correct_response == key[0] ? 'match' : 'nonmatch';
        data.responses = data.response === key[0] ? 'match' : (data.response === key[1] ? 'nonmatch' : null);
        data.Image = jsPsych.timelineVariable("Image");
        data.word = jsPsych.timelineVariable("word", true)();
        var index_i = images1.indexOf(data.Image);
        data.condition = texts[index_i] ;
        data.task_id = "prac_ALT2_moral";
        data.screen_id = "practice_moral";
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
    { Image: images1[0], word: function () { return texts[0] }, identify: function () { return key[0] } },
    { Image: images1[1], word: function () { return texts[1] }, identify: function () { return key[0] } },
    { Image: images1[2], word: function () { return texts[2] }, identify: function () { return key[0] } },
    { Image: images1[3], word: function () { return texts[3] }, identify: function () { return key[0] } },
    //
    { Image: images1[0], word: function () { return texts[1] }, identify: function () { return key[1] } },
    { Image: images1[1], word: function () { return texts[2] }, identify: function () { return key[1] } },
    { Image: images1[2], word: function () { return texts[3] }, identify: function () { return key[1] } },
    { Image: images1[3], word: function () { return texts[0] }, identify: function () { return key[1] } },

    { Image: images1[0], word: function () { return texts[2] }, identify: function () { return key[1] } },
    { Image: images1[1], word: function () { return texts[3] }, identify: function () { return key[1] } },
    { Image: images1[2], word: function () { return texts[0] }, identify: function () { return key[1] } },
    { Image: images1[3], word: function () { return texts[1] }, identify: function () { return key[1] } },

    { Image: images1[0], word: function () { return texts[3] }, identify: function () { return key[1] } },
    { Image: images1[1], word: function () { return texts[0] }, identify: function () { return key[1] } },
    { Image: images1[2], word: function () { return texts[1] }, identify: function () { return key[1] } },
    { Image: images1[3], word: function () { return texts[2] }, identify: function () { return key[1] } },
    //

    { Image: images1[0], word: function () { return texts[0] }, identify: function () { return key[0] } },
    { Image: images1[1], word: function () { return texts[1] }, identify: function () { return key[0] } },
    { Image: images1[2], word: function () { return texts[2] }, identify: function () { return key[0] } },
    { Image: images1[3], word: function () { return texts[3] }, identify: function () { return key[0] } },

    { Image: images1[0], word: function () { return texts[0] }, identify: function () { return key[0] } },
    { Image: images1[1], word: function () { return texts[1] }, identify: function () { return key[0] } },
    { Image: images1[2], word: function () { return texts[2] }, identify: function () { return key[0] } },
    { Image: images1[3], word: function () { return texts[3] }, identify: function () { return key[0] } },
  ],
  //randomize_order:true,
  sample: {
    type: "custom",
    fn: (x) => {
      return jsPsych.randomization.shuffle(x).splice(0, alt2_sample)

    }
  },
  repetitions: alt2_n,
  on_finish: function () {
    $("body").css("cursor", "none"); //鼠标消失
  }
}


var feedback_p = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    let trials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    ).last(alt2_sample * alt2_n); // 运行逻辑：先挑出data里的所有的correct：true/false的数据行，成为新的数组，然后对倒数的某几组进行计算
    //这里填入timeline_variables里面的trial数量，48
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
    let start = "<p class='header' style='color: lightgreen;font-size:25px; line-height:20px;'>请您努力记下如下匹配对应关系，</p><p class='header' style='color: lightgreen;font-size:25px; line-height:20px;'>再次进行练习。</p>",
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
    <div style="text-align: left; padding: 0 20px;"><p class='footer' style='color: lightgreen;font-size:22px; line-height:20px;'>您的任务是：</p>判断几何图形与文字标签是否匹配，</p> <p class='footer' style='font-size:22px; line-height:20px;'>如果二者<span style="color: lightgreen; font-size:20px">匹配</span>，请按 <span style="color: lightgreen;"> ${key[0]} 键</span></p><p class='footer' style='font-size:22px'>如果二者<span style="color: red; font-size:22px">不匹配</span>，请按<span style="color: red;"> ${key[1]} 键</span></p><p class='footer' style='font-size:22px; line-height:20px;'>请在实验过程中，</p>将您的<span style="color: lightgreen;">食指</span>放在电脑键盘的相应键位上进行按键。</p></span></div>
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
    ).last(alt2_sample * alt2_n);//这里注意：只需要上一组的练习数据，而不是所有的数据！！ 如何实现：.last() 取data最后的几组数据（上一组练习数据）,48
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
    ).last(alt2_sample * alt2_n);//记得改，取数据,48
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
    ).last(alt2_sample * alt2_n);//48
    let correct_trials = trials.filter({
      correct: true
    });
    let accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    let rt = Math.round(correct_trials.select('rt').mean());
    return "<style>.context{color:white; font-size: 35px; line-height:40px}</style>\
                            <div><p class='context'>您正确回答了" + accuracy + "% 的试次。</p>" +
      "<p class='context'>您的平均反应时为" + rt + "毫秒。</p>" +
      "<p class='context'>恭喜您完成练习。按空格键进入正式实验。</p>" +
      "<p class='footer' style='font-size: 35px; line-height:40px;'>请在进入正式实验实验之前将您的<span style='color: lightgreen;'>食指</span>放在电脑键盘的相应键位上进行按键。</p>"
  },
  on_finish: function () {
    $("body").css("cursor", "none");
  }
}
//timeline.push(feedback_goformal);

//-------------正式实验一----------------

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
          content: function () {
            return jsPsych.timelineVariable("word", true)()
          },
          startX: "center",
          startY: 175, //图形和文字距离 与加号等距2度

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
        data.correct = data.correct_response == data.key_press;
        data.identity = data.correct_response == key[0] ? 'match' : 'nonmatch';
        data.responses = data.response === key[0] ? 'match' : (data.response === key[1] ? 'nonmatch' : null);
        data.Image = jsPsych.timelineVariable("Image");
        data.word = jsPsych.timelineVariable("word", true)();
        var index_i = images1.indexOf(data.Image);
        data.condition = texts[index_i] ;
        data.task_id = "ALT2";
        data.screen_id = "moral";
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
    { Image: images1[0], word: function () { return texts[0] }, identify: function () { return key[0] } },
    { Image: images1[1], word: function () { return texts[1] }, identify: function () { return key[0] } },
    { Image: images1[2], word: function () { return texts[2] }, identify: function () { return key[0] } },
    { Image: images1[3], word: function () { return texts[3] }, identify: function () { return key[0] } },
    //
    { Image: images1[0], word: function () { return texts[1] }, identify: function () { return key[1] } },
    { Image: images1[1], word: function () { return texts[2] }, identify: function () { return key[1] } },
    { Image: images1[2], word: function () { return texts[3] }, identify: function () { return key[1] } },
    { Image: images1[3], word: function () { return texts[0] }, identify: function () { return key[1] } },

    { Image: images1[0], word: function () { return texts[2] }, identify: function () { return key[1] } },
    { Image: images1[1], word: function () { return texts[3] }, identify: function () { return key[1] } },
    { Image: images1[2], word: function () { return texts[0] }, identify: function () { return key[1] } },
    { Image: images1[3], word: function () { return texts[1] }, identify: function () { return key[1] } },

    { Image: images1[0], word: function () { return texts[3] }, identify: function () { return key[1] } },
    { Image: images1[1], word: function () { return texts[0] }, identify: function () { return key[1] } },
    { Image: images1[2], word: function () { return texts[1] }, identify: function () { return key[1] } },
    { Image: images1[3], word: function () { return texts[2] }, identify: function () { return key[1] } },
    //

    { Image: images1[0], word: function () { return texts[0] }, identify: function () { return key[0] } },
    { Image: images1[1], word: function () { return texts[1] }, identify: function () { return key[0] } },
    { Image: images1[2], word: function () { return texts[2] }, identify: function () { return key[0] } },
    { Image: images1[3], word: function () { return texts[3] }, identify: function () { return key[0] } },

    { Image: images1[0], word: function () { return texts[0] }, identify: function () { return key[0] } },
    { Image: images1[1], word: function () { return texts[1] }, identify: function () { return key[0] } },
    { Image: images1[2], word: function () { return texts[2] }, identify: function () { return key[0] } },
    { Image: images1[3], word: function () { return texts[3] }, identify: function () { return key[0] } },
  ],
  //randomize_order:true,
  sample: {
    type: "custom",
    fn: (x) => {
      return jsPsych.randomization.shuffle(x).splice(0, alt2_sample)
    }
  },
  repetitions: alt2_n,//正是实验时改为6
  on_finish: function () {
    $("body").css("cursor", "none"); //鼠标消失
  }
}

let feedback_block = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    // aaaaa = 1;  筛选，必须要！！！！！！！！！！！
    let trials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    ).last(alt2_sample * alt2_n);// last()填入一个block里的trial总数,48
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
    $("body").css("cursor", "none"); //鼠标消失
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
        <p >您可以点击 结束休息 按钮 继续。</p>
        <p >建议休息时间还剩余<span id="iii">60</span>秒。</p>`
                   
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
    repetitions: blockTotalNum_same + 1,//8个
  },//
  cong_same//完成一个的结束语
];

//-------------第二个session--------------------------------
//---------------------------------------------------------


var Instructions2 = {
  type: jsPsychInstructions,
  pages: function () {
    let start = "<p class='header' style = 'font-size: 22px'>请您记住如下对应关系:</p>";
    let tmpI = "";
    view_texts_images2.forEach(v => {
      tmpI += `<p class="content">${v}</p>`;
    });
    return [`<p class='header' style = 'font-size: 25px'>实验中将出现一些文字标签，标签的意义如下:</p>
    <p class='footer' style='color: lightgreen;font-size: 25px; line-height: 20px;'>“强我”代表自己身上能力优越的方面，您可以想象自己在此刻做了彰显能力的事件。</p>
    <p class='footer' style='color: lightgreen;font-size: 25px; line-height: 20px;'>“弱我”代表自己身上能力不足的方面，您可以想象自己在此刻做了显示能力不足的事件。</p>
    <p class='footer' style='color: lightgreen;font-size: 25px; line-height: 20px;'>“强他（她）”代表朋友身上能力优越的方面，您可以想象朋友在此刻做了彰显能力的事件。</p>
    <p class='footer' style='color: lightgreen;font-size: 25px; line-height: 20px;'>“弱他（她）”代表朋友身上能力不足的方面，您可以想象朋友在此刻做了显示能力不足的事件。</p>`,
    `<div style="display: flex;">
    <div class="box" style="flex: 1;">${start}${tmpI}</div>` +
      `<div style="flex: 1; display: flex; justify-content: center; align-items: center;">
      <div style="text-align: left; padding: 0 20px;"><p class='footer' style='color: lightgreen;font-size:22px; line-height:20px;'>您的任务是：</p>判断几何图形与文字标签是否匹配，</p> 
        <p class='footer' style='color:white; font-size: 22px;'>如果<span style="color: lightgreen; font-size:22px">匹配</span>，请按<span style="color: lightgreen; font-size:22px"> ${key[0]} 键</span></p>
        <p class='footer' style='color:white; font-size: 22px;'>如果二者<span style="color: red; font-size:22px">不匹配</span>，请按<span style="color: red; font-size:22px"> ${key[1]} 键</span></p><p class='footer' style='color:white; font-size: 20px;'>请在实验过程中，</p>将您的<span style="color: lightgreen;">食指</span>放在电脑键盘的相应键位上准备按键。</p></span></div>
        </div>
      </div>`,
      `<p style='color:white; font-size: 25px; line-height:20px;'>您将首先完成1组练习，以确保您理解了任务要求。<span style="color: yellow; "></p><p>之后您将完成8组正式任务,</span></p><p>每组包括48次按键的匹配任务。</p><p style='color:white; font-size: 25px; line-height:20px;'>每组完成后会有休息时间。</p><p style='color:white; font-size: 22px; line-height: 20px;'>完成一组任务大约需要2分钟，整个子任务将持续大约25分钟。</p>`,//实验时间待修改
      "<p class='footer'  style = 'font-size: 25px'>如果对本实验还有不清楚之处，请立即向实验员咨询。</p><p style = 'font-size: 25px; line-height:20px;'>如果您明白了规则：请点击 继续 进入练习</p>"];
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

//----------------------------第二个练习--------------------

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
          content: function () {
            return jsPsych.timelineVariable("word", true)()
          },
          startX: "center",
          startY: 175, //图形和文字距离 与加号等距2度

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
        data.word = jsPsych.timelineVariable("word", true)();
        var index_i = images2.indexOf(data.Image);
        data.condition = texts2[index_i];//以图形为条件基准
        data.task_id = "prac_ALT2_ability";
        data.screen_id = "practice_ability";
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
    { Image: images2[0], word: function () { return texts2[0] }, identify: function () { return key[0] } },
    { Image: images2[1], word: function () { return texts2[1] }, identify: function () { return key[0] } },
    { Image: images2[2], word: function () { return texts2[2] }, identify: function () { return key[0] } },
    { Image: images2[3], word: function () { return texts2[3] }, identify: function () { return key[0] } },
    //
    { Image: images2[0], word: function () { return texts2[1] }, identify: function () { return key[1] } },
    { Image: images2[1], word: function () { return texts2[2] }, identify: function () { return key[1] } },
    { Image: images2[2], word: function () { return texts2[3] }, identify: function () { return key[1] } },
    { Image: images2[3], word: function () { return texts2[0] }, identify: function () { return key[1] } },

    { Image: images2[0], word: function () { return texts2[2] }, identify: function () { return key[1] } },
    { Image: images2[1], word: function () { return texts2[3] }, identify: function () { return key[1] } },
    { Image: images2[2], word: function () { return texts2[0] }, identify: function () { return key[1] } },
    { Image: images2[3], word: function () { return texts2[1] }, identify: function () { return key[1] } },

    { Image: images2[0], word: function () { return texts2[3] }, identify: function () { return key[1] } },
    { Image: images2[1], word: function () { return texts2[0] }, identify: function () { return key[1] } },
    { Image: images2[2], word: function () { return texts2[1] }, identify: function () { return key[1] } },
    { Image: images2[3], word: function () { return texts2[2] }, identify: function () { return key[1] } },
    //

    { Image: images2[0], word: function () { return texts2[0] }, identify: function () { return key[0] } },
    { Image: images2[1], word: function () { return texts2[1] }, identify: function () { return key[0] } },
    { Image: images2[2], word: function () { return texts2[2] }, identify: function () { return key[0] } },
    { Image: images2[3], word: function () { return texts2[3] }, identify: function () { return key[0] } },

    { Image: images2[0], word: function () { return texts2[0] }, identify: function () { return key[0] } },
    { Image: images2[1], word: function () { return texts2[1] }, identify: function () { return key[0] } },
    { Image: images2[2], word: function () { return texts2[2] }, identify: function () { return key[0] } },
    { Image: images2[3], word: function () { return texts2[3] }, identify: function () { return key[0] } },
  ],
  //randomize_order:true,
  sample: {
    type: "custom",
    fn: (x) => {
      return jsPsych.randomization.shuffle(x).splice(0, alt2_sample)
    }
  },
  repetitions: alt2_n,
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
    ).last(alt2_sample * alt2_n); // 运行逻辑：先挑出data里的所有的correct：true/false的数据行，成为新的数组，然后对倒数的某几组进行计算,48
    //这里填入timeline_variables里面的trial数量
    let correct_trials = trials.filter({
      correct: true
    });
    let accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    let rt = Math.round(correct_trials.select('rt').mean());
    return "<style>.context{color:white; font-size: 35px; line-height:40px}</style>\
                          <div><p class='context'>您正确回答了" + accuracy + "% 的试次。</p>" +
      "<p class='context'>您的平均反应时为" + rt + "毫秒。</p>" + "<p class='context'>恭喜您完成练习。按空格键继续。</p></div>";;
  }
}


var feedback_continue_practice2 = { //在这里呈现文字recap，让被试再记一下
  type: jsPsychInstructions,
  pages: function () {
    let start = "<p class='header' style='font-size:25px; line-height:20px;'>请您努力记下如下匹配对应关系，</p><p class='header' style='font-size:25px; line-height:20px;'>再次进行练习。</p>",
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
    <div style="text-align: left; padding: 0 20px;"><p class='footer' style='color: lightgreen;font-size:25px; line-height:20px;'>您的任务是：</p>判断几何图形与文字标签是否匹配，</p>
      <p class='footer' style='font-size:25px; line-height:20px;'>如果<span style="color: lightgreen; font-size:25px">匹配</span>，请按 <span style="color: lightgreen;"> ${key[0]} 键</span></p><p class='footer' style='font-size:25px'>如果二者<span style="color:red; font-size:25px">不匹配</span>，请按<span style="color: red;"> ${key[1]} 键</span></p><p class='footer' style='color:white;font-size:22px; line-height:20px;'>请在实验过程中，</p>将您的<span style="color: lightgreen;">食指</span>放在电脑键盘的相应键位上进行按键。</p></span></div>
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
    ).last(alt2_sample * alt2_n);//这里注意：只需要上一组的练习数据，而不是所有的数据！！ 如何实现：.last() 取data最后的几组数据（上一组练习数据）
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
    ).last(alt2_sample * alt2_n);//记得改，取数据,48
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
    ).last(alt2_sample * alt2_n);//48
    let correct_trials2 = trials2.filter({
      correct: true
    });
    let accuracy2 = Math.round(correct_trials2.count() / trials2.count() * 100);
    let rt2 = Math.round(correct_trials2.select('rt').mean());
    return "<style>.context{color:white; font-size: 35px; line-height:40px}</style>\
                          <div><p class='context'>您正确回答了" + accuracy2 + "% 的试次。</p>" +
      "<p class='context'>您的平均反应时为" + rt2 + "毫秒。</p>" +
      "<p class='context'>恭喜您完成练习。按空格键进入正式实验。</p>" +
      "<p class='footer' style='color:white;font-size: 35px; line-height:40px;'>请在进入正式实验实验之前将您的<span style='color: lightgreen;'>食指</span>放在电脑键盘的相应键位上进行按键。</p>"
  },
  on_finish: function () {
    $("body").css("cursor", "none");
  }
}
//timeline.push(feedback_goformal2);

//-------------第二个正式实验----------------

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
          content: function () {
            return jsPsych.timelineVariable("word", true)()
          },
          startX: "center",
          startY: 175, //图形和文字距离 与加号等距2度
          font: `${80}px '微软雅黑'`, //字体和颜色设置 文字视角：3.6° x 1.6°
          text_color: 'white',
          show_start_time: 1000, // ms after the start of the trial
          show_end_time: 1200,//出现50ms
          origin_center: true
        }
      ],

      choices: ['f', 'j'],
      response_start_time: 1000,//开始作答时间，第二个刺激开始计算
      trial_duration: 2200,//结束时间，一共作答时间持续1500ms
      data: function () { return jsPsych.timelineVariable("identify") },
      on_finish: function (data) {
        data.correct_response = jsPsych.timelineVariable("identify", true)();
        data.correct = data.correct_response == data.key_press;//0错1对
        data.identity = data.correct_response == key[0] ? 'match' : 'nonmatch';
        data.responses = data.response === key[0] ? 'match' : (data.response === key[1] ? 'nonmatch' : null);
        data.Image = jsPsych.timelineVariable("Image");
        data.word = jsPsych.timelineVariable("word", true)();
        var index_i = images2.indexOf(data.Image);
        data.condition = texts2[index_i];
        data.task_id = "ALT2";
        data.screen_id = "ability";
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
    { Image: images2[0], word: function () { return texts2[0] }, identify: function () { return key[0] } },
    { Image: images2[1], word: function () { return texts2[1] }, identify: function () { return key[0] } },
    { Image: images2[2], word: function () { return texts2[2] }, identify: function () { return key[0] } },
    { Image: images2[3], word: function () { return texts2[3] }, identify: function () { return key[0] } },
    //
    { Image: images2[0], word: function () { return texts2[1] }, identify: function () { return key[1] } },
    { Image: images2[1], word: function () { return texts2[2] }, identify: function () { return key[1] } },
    { Image: images2[2], word: function () { return texts2[3] }, identify: function () { return key[1] } },
    { Image: images2[3], word: function () { return texts2[0] }, identify: function () { return key[1] } },

    { Image: images2[0], word: function () { return texts2[2] }, identify: function () { return key[1] } },
    { Image: images2[1], word: function () { return texts2[3] }, identify: function () { return key[1] } },
    { Image: images2[2], word: function () { return texts2[0] }, identify: function () { return key[1] } },
    { Image: images2[3], word: function () { return texts2[1] }, identify: function () { return key[1] } },

    { Image: images2[0], word: function () { return texts2[3] }, identify: function () { return key[1] } },
    { Image: images2[1], word: function () { return texts2[0] }, identify: function () { return key[1] } },
    { Image: images2[2], word: function () { return texts2[1] }, identify: function () { return key[1] } },
    { Image: images2[3], word: function () { return texts2[2] }, identify: function () { return key[1] } },
    //

    { Image: images2[0], word: function () { return texts2[0] }, identify: function () { return key[0] } },
    { Image: images2[1], word: function () { return texts2[1] }, identify: function () { return key[0] } },
    { Image: images2[2], word: function () { return texts2[2] }, identify: function () { return key[0] } },
    { Image: images2[3], word: function () { return texts2[3] }, identify: function () { return key[0] } },

    { Image: images2[0], word: function () { return texts2[0] }, identify: function () { return key[0] } },
    { Image: images2[1], word: function () { return texts2[1] }, identify: function () { return key[0] } },
    { Image: images2[2], word: function () { return texts2[2] }, identify: function () { return key[0] } },
    { Image: images2[3], word: function () { return texts2[3] }, identify: function () { return key[0] } },
  ],
  //randomize_order:true,
  sample: {
    type: "custom",
    fn: (x) => {
      return jsPsych.randomization.shuffle(x).splice(0, alt2_sample)
    }
  },
  repetitions: alt2_n,//正是实验时改为6
  on_finish: function () {
    // $("body").css("cursor", "default"); //鼠标出现
  }
}

let feedback_block2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    // aaaaa = 1;  筛选，必须要！！！！！！！！！！！
    let trials = jsPsych.data.get().filter(
      [{ correct: true }, { correct: false }]
    ).last(alt2_sample * alt2_n);// last()填入一个block里的trial总数,48
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
        <p >您当前还剩余${blockTotalNum_2}组实验</p>
        <p >现在是休息时间，当您结束休息后，</p>
        <p >您可以点击 结束休息 按钮 继续。</p>
        <p >建议休息时间还剩余<span id="iii">60</span>秒。</p>`
                  
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
    repetitions: blockTotalNum_same + 1,
  },
  cong_same2
];
//----------------------------------------------------------
//----------------------------------------------------------



//----------结束-------------------------------------------

//timeline.push({timeline:[Instructions0,{timeline:repeatblock3}]})
//timeline.push(
var ALT_2 = {
  timeline: [
    //ALT2_Instructions0,
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
};

var finish = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>感谢您参加我们的实验，请<span style="color: white;">按空格键开始上传数据</span>，并通知研究者。</p>
    <p>感谢您的配合！</p>`,
  choices: "ALL_KEYS",
  trial_duration: 5000,
  response_ends_trial: true,
  extensions: [{ type: Naodao }]
};
 // timeline.push(finish);

//jsPsych.run(timeline);

