/**
 * Author:
 * original demo is from (https://psychbruce.github.io)
 */


/* Setting HTML Styles */

// CSS styles (in HTML <style> tag)
document.head.innerHTML +=
    `<style>
    body { user-select: none; -ms-user-select: none; -moz-user-select: none; -webkit-user-select: none; }
    .jspsych-btn { font-size: 16pt; font-family: 微软雅黑; font-weight: normal; margin: 1em 0em; }
    .tag-left { font-size: 24pt; position: absolute; top: 15%; left: 25%; }
    .tag-right { font-size: 24pt; position: absolute; top: 15%; right: 25%; }
    .tag-bottom { font-size: 20pt; position: absolute; bottom: 5%; left: 0; right: 0;  line-height:1px;}
    </style>`

// HTML DOM styles (by using JS function alone or in jsPsych 'on_start', 'on_load', 'on_finish' parameters)
function set_html_style() {
    document.body.style.backgroundColor = 'rgb(128, 128, 128)' // background color
    document.body.style.color = 'white' // font color
    document.body.style.fontSize = '20pt'
    document.body.style.fontFamily = '微软雅黑'
    document.body.style.fontWeight = 'normal' // 'normal', 'bold'
    document.body.style.lineHeight = '1.6em' // line ""   
    document.body.style.cursor = 'default' // 'default', 'none', 'wait', ...
    document.body.onselectstart = function () { return false } // 禁止选中文字
    document.body.oncontextmenu = function () { return false } // 禁用鼠标右键
    document.onkeydown = function () {
        // 屏蔽键盘按键 (https://www.bejson.com/othertools/keycodes/)
        if ((event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) ||
            (event.ctrlKey && event.keyCode in { 85: 'U' })
        ) { return false }
    }
}
//IAT实验总体设置

function set_html_style_iat() {
    document.body.style.backgroundColor = 'rgb(128, 128, 128)'
    document.body.style.color = 'white'
    document.body.style.fontSize = '32pt'
    document.body.style.fontFamily = '微软雅黑'
    document.body.style.fontWeight = 'normal'
    document.body.style.lineHeight = '1.2em'
    document.body.style.cursor = 'none'
}




function timer() {
    var second = document.getElementById('timer')
    var button = document.getElementsByClassName('jspsych-btn')[0]
    if (second != null) {
        if (second.innerHTML > 1) {
            second.innerHTML = second.innerHTML - 1
        } else {
            button.innerHTML = '继续'
            button.disabled = false
        }
    }
}

//---------




/* Global Variables */

const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`


/* Launch jsPsych 

var jsPsych = initJsPsych({
    timeline: main_IAT,
    override_safe_mode: true,
    on_finish: function() {
       // jsPsych.data.get().localSave('csv', `data_iat_demo_${subID}.csv`) // download from browser
       // document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
       // setTimeout(window.close, 10 * 1000) // not effective in Edge
        
    }
})*/

/* Custom JS Functions */

/*function keyCode(character) {
    return jsPsych.pluginAPI.convertKeyCharacterToKeyCode(character)
}*/

function keyCode(character) {
    var validKeys = [character]; // 使用传入的字符作为有效键
    var validKeyObject = jsPsych.pluginAPI.getValidKey(validKeys);
    return validKeyObject[0]; // 返回有效键的键码
}

//generates a random alphanumeric string of length 8.This variable is used to store a unique identifier for each participant in the study
const subID = jsPsych.randomization.randomID(8)


/* Blocks: Basics */

var open_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    on_start: set_html_style,
    data: {
        // must add the following <script> in 'index.html', which will return a JSON object 'returnCitySN':
        //     <script src="https://pv.sohu.com/cityjson"></script>
        /*id: subID,
        ip: returnCitySN['cip'],
        ip_city: returnCitySN['cname'],
        ip_city_id: returnCitySN['cid'],*/
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
    （6）务必认真作答，仔细阅读实验的指导语<br/>
    （7）实验的作答认真程度以及正确率，将影响后续报酬的发放<br/><br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

var close_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: false,
    delay_after: 0
}


/* Blocks: IAT */

// Template (the ONLY thing you need to modify)
//-----------------IAT刺激的准备-----------------//

var key_L = 'E'
var key_R = 'I'
var iat_temp = {
    // Pairs A & Pairs B should be compatible
    attribA: { label: '积极', items: ["能干", "全能", "全才", "高效", "精干", "天才"] },
    attribB: { label: '消极', items: ["无能", "低能", "废物", "拙笨", "愚钝", "蠢笨"] },
    targetA: { label: '自我', items: ["我", "我的", "自己", "自己的", "本人", "本人的"] },
    targetB: { label: '他人', items: ["他", "他的", "别人", "别人的", "他人", "他人的"] },
}
var iat_words1=[
    { label: 'positive',items:"能干"},{label:'positive',items:"全能"},{label:'positive',items:"全才"},  
    { label: 'positive',items:"高效"}, {label:'positive',items:"精干"}, {label:'positive',items:"天才"},  
    {label: 'negative',items:"无能"}, {label:'negative', items:"低能"}, {label:'negative', items:"废物"}, 
    {label: 'negative',items:"拙笨"}, {label:'negative',items:"愚钝"},{label:'negative',items:"蠢笨"}, 
    { label: 'self', items:"我"},{label:'self',items:"我的"},{label:'self',items:"自己"}, 
    { label: 'self', items:"自己的"},  {label:'self',items:"本人"},{label:'self',items:"本人的"},
    { label: 'other', items:"他"},{label:'other', items:"他的"},{label:'other',items:"别人"},
    { label: 'other', items:"别人的"},{label:'other', items:"他人"},{label:'other',items:"他人的"}]

var attrib_color = 'white'
var target_color = 'rgb(150, 250, 100)'

// Randomize stimuli pairs (left vs. right; compatible-blocks first vs. incompatible-blocks first)
// one of four, e.g., { attrib: 2, target: 1 }

var version = jsPsych.randomization.factorial({ attrib: [1, 2], target: [1, 2] })[0]
var compatible_first = (version.attrib == version.target) ? true : false

var iat = JSON.parse(JSON.stringify(iat_temp)) // 深复制（iat_temp仅为指针，浅复制会同步修改两者）
if (version.attrib == 2) {
    iat.attribA.label = iat_temp.attribB.label
    iat.attribA.items = iat_temp.attribB.items
    iat.attribB.label = iat_temp.attribA.label
    iat.attribB.items = iat_temp.attribA.items
}
if (version.target == 2) {
    iat.targetA.label = iat_temp.targetB.label
    iat.targetA.items = iat_temp.targetB.items
    iat.targetB.label = iat_temp.targetA.label
    iat.targetB.items = iat_temp.targetA.items
}

// Top-left and top-right tags，生成一个包含类别标签和对应按键信息的HTML标签

var tag_IAT_prac_attrib = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                           <span style="color:${attrib_color}">${iat.attribA.label}</span></div>
                           <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                           <span style="color:${attrib_color}">${iat.attribB.label}</span></div>`

var tag_IAT_prac_target_1 = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                             <span style="color:${target_color}">${iat.targetA.label}</span></div>
                             <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                             <span style="color:${target_color}">${iat.targetB.label}</span></div>`

var tag_IAT_prac_target_2 = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                             <span style="color:${target_color}">${iat.targetB.label}</span></div>
                             <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                             <span style="color:${target_color}">${iat.targetA.label}</span></div>`

var tag_IAT_test_1 = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                      <span style="color:${attrib_color}">${iat.attribA.label}</span><br/>或<br/>
                      <span style="color:${target_color}">${iat.targetA.label}</span></div>
                      <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                      <span style="color:${attrib_color}">${iat.attribB.label}</span><br/>或<br/>
                      <span style="color:${target_color}">${iat.targetB.label}</span></div>`

var tag_IAT_test_2 = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                      <span style="color:${attrib_color}">${iat.attribA.label}</span><br/>或<br/>
                      <span style="color:${target_color}">${iat.targetB.label}</span></div>
                      <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                      <span style="color:${attrib_color}">${iat.attribB.label}</span><br/>或<br/>
                      <span style="color:${target_color}">${iat.targetA.label}</span></div>`

// IAT每个block的Instructions

var IAT_instr0 = {
    type: jsPsychHtmlButtonResponse,
    data: { version_attrib: version.attrib, version_target: version.target },
    stimulus: `
    <h3>词语分类任务</h3>
    <p>在接下来的任务中，你需要对一系列词语进行分类。</p>
    <p>请先熟悉这些词语，这有利于你完成接下来的任务。</p>
    <table align="center" border=1 cellpadding=3 cellspacing=0>
    <tr> <th>类别</th> <th>词语</th> </tr>
    <tr> <td>&emsp;${iat_temp.attribA.label}&emsp;</td> <td>&emsp;${iat_temp.attribA.items.join('、')}&emsp;</td> </tr>
    <tr> <td>&emsp;${iat_temp.attribB.label}&emsp;</td> <td>&emsp;${iat_temp.attribB.items.join('、')}&emsp;</td> </tr>
    <tr> <td>&emsp;${iat_temp.targetA.label}&emsp;</td> <td>&emsp;${iat_temp.targetA.items.join('、')}&emsp;</td> </tr>
    <tr> <td>&emsp;${iat_temp.targetB.label}&emsp;</td> <td>&emsp;${iat_temp.targetB.items.join('、')}&emsp;</td> </tr>
    </table><br/>`,
    choices: ['<span id="timer">10</span>秒后继续'],
    button_html: btn_html_timer,
    on_load: () => {
        $("body").css("cursor", "default");
      },
    on_finish: function () {
        set_html_style_iat;
        $("body").css("cursor", "none");
    }
}


var IAT_instr1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom">
    <p> —— 任务1：对“${iat.targetA.label}”词和“${iat.targetB.label}”词分类 ——<p/>
    不同词语会出现在屏幕中央，类别标签将始终显示在屏幕上方<p/>   
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_prac_target_1
}
var IAT_instr2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务2：对“${iat.attribA.label}”词和“${iat.attribB.label}”词分类 ——<p/>   
    <span style="color:#78DCE8"><b>注意上方，类别标签和需要分类的词语都已经改变</b></span><p/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_prac_attrib,

};



var IAT_instr3 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务3：对“${iat.targetA.label}/${iat.attribA.label}”词和“${iat.targetB.label}/${iat.attribB.label}”词分类 ——<p/>
    <span style="color:#78DCE8"><b>注意上方，之前的四类词语将混合在一起交替呈现</b></span><p/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_test_1
}

var IAT_instr4 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务4：对“${iat.targetA.label}/${iat.attribA.label}”词和“${iat.targetB.label}/${iat.attribB.label}”词分类 ——<p/>
    <span style="color:#78DCE8"><b>与刚才的任务完全相同，请再次对这四类词语分类</b></span><p/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_test_1
}

var IAT_instr5 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务5：对“${iat.targetB.label}”词和“${iat.targetA.label}”词分类 ——<p/>
    <span style="color:#FF6188"><b>注意上方，仍然是两个类别标签，但互换了位置！</b></span><p/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_prac_target_2
}

var IAT_instr6 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务6：对“${iat.targetA.label}/${iat.attribB.label}”词和“${iat.targetB.label}/${iat.attribA.label}”词分类 ——<p/>
    <span style="color:#FF6188"><b>注意上方，四类词语将以新的组合方式交替呈现！</b></span><p/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_test_2
}

var IAT_instr7 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务7：对“${iat.targetA.label}/${iat.attribB.label}”词和“${iat.targetB.label}/${iat.attribA.label}”词分类 ——<p/>
    <span style="color:#FF6188"><b>与刚才的任务完全相同，请再次对这四类词语分类</b></span><p/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_test_2
}

//--------------------生成一个IAT的block的template所需要的function---------------------------//

/* Generate IAT stimuli and blocks,对生成的试次序列进行乱序排列，以确保邻近的试次不会相同;n_trials（试次数量）、
   arr（包含 试次的数组）和 neighbor_different（邻近试次是否不同，默认为 true）。
   arr是使用的刺激，repeats是根据trials算arr重复的次数，array1是arr重复次数，array2是arr剩下的未生成的试次，array是array1和array2的合并。
*/

function generateRandomTrials(n_trials, arr, neighbor_different = true) {
    var repeats = Math.floor(n_trials / arr.length)//定义重复次数
    if (repeats >= 1) {
        var array1 = jsPsych.randomization.repeat(arr, repeats)//重复后得到的数组
        var array2 = jsPsych.randomization.sampleWithoutReplacement(arr, n_trials - array1.length)
        //n_trials - array1.length:总试次多于arr的长度。剩下的试次从arr中随机抽取
        var array = array1.concat(array2)//将array1和array2合并
    } else {
        var array = jsPsych.randomization.sampleWithoutReplacement(arr, n_trials)//不需要重复，随机排列arr
    }
    if (neighbor_different) {
        array = jsPsych.randomization.shuffleNoRepeats(array)//确保邻近的试次不会是相同的元素
    }
    return array
}


/*   交叉替换刺激的位置，用以确保target和attribute的交替呈现
     example:var arr1 = [1, 2, 3];
             var arr2 = [4, 5, 6];
             var arr = crossArrays(arr1, arr2);
             console.log(arr); // output: [1, 4, 2, 5, 3, 6]
*/

function crossArrays(arr1, arr2) {
    var arr = []
    for (var i in arr1) { arr.push(arr1[i], arr2[i]) }
    return arr
}



/*  takes an array as an argument and returns an array of objects,if you pass an array ['a', 'b', 'c'] to 
    the   function, it will return an array of objects [{s: 'a'}, {s: 'b'}, {s: 'c'}]*/

function toStimuli(array) {
   for (var i in array) { array[i] = { s: array[i] } }
    return array
    
}

function addLabelToStimuli(stimuli, iat_words) {
    // 遍历stimuli数组中的每个元素
    for (var i = 0; i < stimuli.length; i++) {
      var s = stimuli[i].s;
      // 在iat_words数组中查找与当前元素的s属性匹配的项
      for (var j = 0; j <iat_words.length; j++) {
        if (iat_words[j].items === s) {
          // 将匹配项的标签添加到当前元素的label属性中
          stimuli[i].label = iat_words[j].label;
          break;
        }
      }
    }
    return stimuli;
  }
/* block3.4,6,7需要使用到这个功能

   Requirements from  Standard IAT procedure (adapted from Greenwald et.al, 2022, Behavior Research Methods):

   B3.目标和属性类别试验在标准 IAT 的联合任务块程序中始终严格交替进行。[√，function crossArrays已实现]

 * B8.在组合任务块中连续出现超过四个相同按键正确反应的情况是不可取的。[需要实现的功能]
    

 * 为了避免在组合任务中出现较长的相同按键正确连续试次，可以在每个连续的四个试次的子集内独立随机化试次。
 *  其中，1-4个试次将随机呈现一个目标概念的刺激（在第1个试次）和另一个目标概念的刺激（在第3个试次）
 *  ，以及一个属性概念的刺激（在第2个试次）和另一个属性概念的刺激（在第4个试次）。
 *  对于5-8、9-12等试次，同样进行独立的随机化，以确保在每组四个试次中的偶数试次和奇数试次都进行独立的随机化。
 * 这种策略将最长的相同按键正确连续试次限制为四个试次。
 * 当设计一个组合任务块，包括四个试次时，可以采用如下的随机化方法：

 * 假设我们有两个目标类别，T1和T2，以及两个属性类别，A1和A2。
 *  对于第一个任务块（Trial 1-4），我们需要随机安排刺激的呈现顺序。
 * Trial 1：随机选择T1或T2的一个刺激呈现。T1
 * Trial 2：随机选择A1或A2的一个刺激呈现。A1
 *  Trial 3：选择与Trial 1中未选择的目标类别相对应的刺激呈现。T2
 * Trial 4：选择与Trial 2中未选择的属性类别相对应的刺激呈现。A2
 * 对于第二个任务块（Trial 5-8），再次进行随机安排。
 * Trial 5：随机选择T1或T2的一个刺激呈现，与Trial 1不同。T2
 * Trial 6：随机选择A1或A2的一个刺激呈现，与Trial 2不同。A2
 * Trial 7：选择与Trial 5中未选择的目标类别相对应的刺激呈现。T1
 * Trial 8：选择与Trial 6中未选择的属性类别相对应的刺激呈现。A1
 * 对于后续的任务块（Trial 9-12、13-16等等），以此类推，每个任务块都进行类似的随机安排。

*/
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function zip(arrays) {
    // Shuffle each array
    let output = []
    for (let i = 0; i < arrays.length; i++) {
        arrays[i] = shuffle(arrays[i])
    }
    for (let i = 0; i < arrays[0].length; i++) {
        let index_ = shuffle([0, 1, 2, 3]);
        let odd = index_.filter(x => x % 2 === 1);
        let even = index_.filter(x => x % 2 === 0);

        let index = [];
        for (let j = 0; j < index_.length; j++) {
            if (j % 2 === 0) {
                index.push(even.pop());
            } else {
                index.push(odd.pop());
            }
        }
        let Items = arrays.map(array => array[i]);
        let shuffled_array = index.map(i => Items[i]);
        output.push(...shuffled_array)
    }
    return output
}

//--------------------生成一个IAT的block的template---------------------------//
// ITI设置trial间间隔，刺激自动呈现，'categorize-html'plugin设置按键后的反馈


function blockTemplateIAT(task_id,screen_id,block_id, tag, stimuli,iat_words,stim_func, key_answer_func,iat_sample, iti = 250) {
    var IAT = {
        timeline_variables: addLabelToStimuli(toStimuli(stimuli),iat_words),
        sample: {
            type: "custom",
            fn: (x) => {
                return x.splice(0, iat_sample)//
            }
        },
        timeline: [{
            type: jsPsychHtmlKeyboardResponse,
            stimulus: '',
            choices: 'NO_KEYS',
            prompt: tag,
            trial_duration: iti, // inter-trial interval
            response_ends_trial: false
        }, {
            type: jsPsychCategorizeHtml,
            data: { IAT: block_id,
               
            },
            stimulus: stim_func,
            choices: [key_L, key_R],
            key_answer: key_answer_func,
            prompt: tag,
            correct_text: tag,
            incorrect_text: tag + feedback_wrong,
            feedback_duration: 0,
            show_stim_with_feedback: true,
            force_correct_button_press: true,
            on_load: () => {
                $("body").css("cursor", "none");
              },
            
            on_finish: function (data) { 
                data.screen_id = screen_id;
                data.task_id = task_id;
                data.RT = data.rt ;
            data.condition=jsPsych.timelineVariable("label");
        data.word=jsPsych.timelineVariable("s")} // for computing IAT D-score in feedback
        }],
    }
    return IAT
}

/**
 * Standard IAT procedure (adapted from Greenwald et.al, 2022, Behavior Research Methods):

 * | block | category            | trials | practice/test | “E”       | “I"      |
| ----- | ----------------------- | ----- | ------------- | --------  | -------- |
| 1     | target，each出现1次     | 12    | practice      | 自我       | 他人     |
| 2     | attribute，each出现1次  | 12    | practice      |德/能   _积 | 德/能_消  |
| 3     | combine1，each出现1次   | 24    | practice      | 我 or 积   | 他 or 消 |
| 4     | combine1，each出现2次   | 48    | test          | 我 or 积   | 他 or 消 |
| 5     | target(re)，each出现2次 | 24    | practice      | 他人       | 自我     |
| 6     | combine2(re)，出现1次   | 24    | practice      | 他 or 积   | 我 or 消 |
| 7     | combine2(re)，出现2次   | 48    | test          | 他 or 积   | 我 or 消 |
 */

//--------------------设置每一个IAT的刺激及按键反应--------------------------//


// Practice blocks1:target 出现1次，共12个；6个iat.targetA.items, 6个iat.targetB.items
var IAT1 = blockTemplateIAT(
    task_id="ability",
    screen_id = 1,
    block_id = 1,
    tag = tag_IAT_prac_target_1,
    stimuli = generateRandomTrials(12, [].concat(iat.targetA.items, iat.targetB.items)),
    iat_words =iat_words1, 
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        return `<p style="color:${target_color}; font-size: 35px;">${stim}</p>`
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if (iat.targetA.items.includes(stim)) { return keyCode(key_L) }
        if (iat.targetB.items.includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1,
)

// Practice blocks2:attribute 出现1次，共12个；6个iat.attribA.items, 6个iat.attribB.items
var IAT2 = blockTemplateIAT(
    task_id="ability",
    screen_id = 2,
    block_id = 2,
    tag = tag_IAT_prac_attrib,
    //iat_sample= 12,  
    stimuli = generateRandomTrials(12, [].concat(iat.attribA.items, iat.attribB.items)),
    iat_words =iat_words1,
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        return `<p style="color:${attrib_color}; font-size: 35px;">${stim}</p>`
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if (iat.attribA.items.includes(stim)) { return keyCode(key_L) }
        if (iat.attribB.items.includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1,
)

// Practice blocks3:combine1 出现1次，共24个；12个target, 12个attrib
var IAT3 = blockTemplateIAT(
    task_id="ability",
    screen_id = 3,
    block_id = 3,
    tag = tag_IAT_test_1,
    stimuli = zip([iat.targetA.items, iat.attribA.items, iat.targetB.items, iat.attribB.items]),
    iat_words =iat_words1, 
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.targetA.items, iat.targetB.items).includes(stim)) {
            return `<p style="color:${target_color}; font-size: 35px;">${stim}</p>`
        }
        if ([].concat(iat.attribA.items, iat.attribB.items).includes(stim)) {
            return `<p style="color:${attrib_color}; font-size: 35px;">${stim}</p>`
        }
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.targetA.items, iat.attribA.items).includes(stim)) { return keyCode(key_L) }
        if ([].concat(iat.targetB.items, iat.attribB.items).includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1 * 2,
)

// Test blocks4:combine1 出现2次，共48个；24个target, 24个attrib
var IAT4 = blockTemplateIAT(
    task_id="ability",
    screen_id = 4,
    block_id = 4,
    tag = tag_IAT_test_1,
    stimuli = zip([generateRandomTrials(12, iat.targetA.items), generateRandomTrials(12, iat.attribA.items), generateRandomTrials(12, iat.targetB.items), generateRandomTrials(12, iat.attribB.items)]),
    iat_words =iat_words1, 
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.targetA.items, iat.targetB.items).includes(stim)) {
            return `<p style="color:${target_color}; font-size: 35px;">${stim}</p>`
        }
        if ([].concat(iat.attribA.items, iat.attribB.items).includes(stim)) {
            return `<p style="color:${attrib_color}; font-size: 35px;">${stim}</p>`
        }
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.targetA.items, iat.attribA.items).includes(stim)) { return keyCode(key_L) }
        if ([].concat(iat.targetB.items, iat.attribB.items).includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1 * 4,
)

// Practice blocks5:target（re,反向按键） 出现2次，共24个；12个iat.targetA.items, 12个iat.targetB.items
var IAT5 = blockTemplateIAT(
    task_id="ability",
    screen_id = 5,
    block_id = 5,
    tag = tag_IAT_prac_target_2,
    stimuli = generateRandomTrials(24, [].concat(iat.targetB.items, iat.targetA.items)),
    iat_words =iat_words1, 
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        return `<p style="color:${target_color}; font-size: 35px;">${stim}</p>`
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if (iat.targetB.items.includes(stim)) { return keyCode(key_L) }
        if (iat.targetA.items.includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1 * 2,
)

// Test blocks6:combine2 出现1次，共24个；12个target(re), 12个attrib
var IAT6 = blockTemplateIAT(
    task_id="ability",
    screen_id = 6,
    block_id = 6,
    tag = tag_IAT_test_2,
    // iat_sample= 24,
    /*stimuli = crossArrays(
         generateRandomTrials(12, [].concat(iat.attribA.items, iat.attribB.items)),
         generateRandomTrials(12, [].concat(iat.targetB.items, iat.targetA.items)),
     ),*/
    stimuli = zip([iat.attribA.items, iat.targetB.items, iat.attribB.items, iat.targetA.items]),
    iat_words =iat_words1, 
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.attribA.items, iat.attribB.items).includes(stim)) {
            return `<p style="color:${attrib_color}; font-size: 35px;">${stim}</p>`
        }
        if ([].concat(iat.targetB.items, iat.targetA.items).includes(stim)) {
            return `<p style="color:${target_color}; font-size: 35px;">${stim}</p>`
        }
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.attribA.items, iat.targetB.items).includes(stim)) { return keyCode(key_L) }
        if ([].concat(iat.attribB.items, iat.targetA.items).includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1 * 2,
)

// Test blocks7:combine2 出现2次，共48个；24个target(re), 24个attrib
var IAT7 = blockTemplateIAT(
    task_id="ability",
    screen_id = 7,
    block_id = 7,
    tag = tag_IAT_test_2,
    // iat_sample = 48,
    /*stimuli = crossArrays(
        generateRandomTrials(24, [].concat(iat.attribA.items, iat.attribB.items)),
        generateRandomTrials(24, [].concat(iat.targetB.items, iat.targetA.items)),
    ),*/
    stimuli = zip([generateRandomTrials(12, iat.attribA.items), generateRandomTrials(12, iat.targetB.items), generateRandomTrials(12, iat.attribB.items), generateRandomTrials(12, iat.targetA.items)]),
    iat_words =iat_words1, 
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.attribA.items, iat.attribB.items).includes(stim)) {
            return `<p style="color:${attrib_color}; font-size: 35px;">${stim}</p>`
        }
        if ([].concat(iat.targetB.items, iat.targetA.items).includes(stim)) {
            return `<p style="color:${target_color}; font-size: 35px;">${stim}</p>`
        }
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.attribA.items, iat.targetB.items).includes(stim)) { return keyCode(key_L) }
        if ([].concat(iat.attribB.items, iat.targetA.items).includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1 * 4,
)


/* Blocks: Feedbacks */
//错误试次直接mean加600ms

function replaceWrongRT(df) {
    // Replace each wrong-trial RT with block mean + 600 ms (Greewald et al., 2003, JPSP)
    var rt_mean = df.filter({ correct: true }).select('rt').mean()
    var wrong = df.filter({ correct: false }).values() // raw data array (modifiable)
    for (var i in wrong) {
        wrong[i]['RT'] = rt_mean + 600
    }
}

var IAT_results = { IAT_D: null, IAT_D_prac: null, IAT_D_test: null }

var debrief_IAT = {
    type: jsPsychHtmlKeyboardResponse,
    on_start: set_html_style,
    stimulus: function () {
        // See the scoring algorithm of IAT D-score in Greewald et al. (2003),匹配（在我-积极）与不匹配出现顺序不同，匹配可能先出现或后出现，筛掉>10000ms的数据,<300ms的占10%以上，无效
        if (compatible_first) {
            var block_ids = { compat: [{ IAT: 3 }, { IAT: 4 }], incomp: [{ IAT: 6 }, { IAT: 7 }] }
        } else {
            var block_ids = { compat: [{ IAT: 6 }, { IAT: 7 }], incomp: [{ IAT: 3 }, { IAT: 4 }] }
        }
        var df_iat_raw = jsPsych.data.get().filter([{ IAT: 3 }, { IAT: 4 }, { IAT: 6 }, { IAT: 7 }]) // data frame (jsPsych 'Data Collection' class)
        var df = df_iat_raw.filterCustom(function (trial) { return trial.rt < 10000 })

        var n_trials_less_than_300ms = df.filterCustom(function (trial) { return trial.rt < 300 }).count()
        var p_too_fast = n_trials_less_than_300ms / df.count()
        var validity = (p_too_fast < 0.1) ? `` :
            `<span style="color:red">抱歉，由于你的随意按键反应过多（${(100 * p_too_fast).toFixed(1)}%），你的结果无效！</span><br/>`

        var iat_compat_prac = df.filter(block_ids.compat[0])
        var iat_compat_test = df.filter(block_ids.compat[1])
        var iat_incomp_prac = df.filter(block_ids.incomp[0])
        var iat_incomp_test = df.filter(block_ids.incomp[1])

        replaceWrongRT(iat_compat_prac)
        replaceWrongRT(iat_compat_test)
        replaceWrongRT(iat_incomp_prac)
        replaceWrongRT(iat_incomp_test)

        var mean_diff_prac = iat_incomp_prac.select('RT').mean() - iat_compat_prac.select('RT').mean()
        var mean_diff_test = iat_incomp_test.select('RT').mean() - iat_compat_test.select('RT').mean()
        var sd_pooled_prac = iat_compat_prac.join(iat_incomp_prac).select('rt').sd()
        var sd_pooled_test = iat_compat_test.join(iat_incomp_test).select('rt').sd()
        var IAT_D_prac = mean_diff_prac / sd_pooled_prac
        var IAT_D_test = mean_diff_test / sd_pooled_test
        var IAT_D = (IAT_D_prac + IAT_D_test) / 2

        IAT_results.IAT_D = IAT_D
        IAT_results.IAT_D_prac = IAT_D_prac
        IAT_results.IAT_D_test = IAT_D_test

        return `
      <p><div style="text-align: left">
      ${validity}
        现在是休息时间，当您结束休息后，您可以点击 空格键 继续实验。</div><br/></p>
        <p> <div style = "color: green"><按空格键进入下一阶段的任务></div></p>
        `
    },
    on_finish: function (data) {
        data.varname = 'IAT_feedback'
        data.summary = JSON.stringify(IAT_results)
        // extract in R:  jsonlite::fromJSON(subset(data, varname=='IAT_feedback')$summary)
    }
}




/*<p style="text-align: left">
       <b>结果反馈：</b><br/>
       ${validity}
       你的内隐联系测验<em>D </em>分数 = <b>${IAT_D.toFixed(2)}</b><br/>
       ——练习任务<em>D </em>分数 = ${IAT_D_prac.toFixed(2)}<br/>
       &emsp;&emsp;（反应时之差 = ${mean_diff_prac.toFixed(0)}ms，合并标准差 = ${sd_pooled_prac.toFixed(0)}ms）<br/>
       ——正式任务<em>D </em>分数 = ${IAT_D_test.toFixed(2)}<br/>
       &emsp;&emsp;（反应时之差 = ${mean_diff_test.toFixed(0)}ms，合并标准差 = ${sd_pooled_test.toFixed(0)}ms）<br/>
       <br/><b><em>D </em>分数解释：</b><br/>
       大于0：对「${iat_temp.attribA.label} + ${iat_temp.targetA.label}」「${iat_temp.attribB.label} + ${iat_temp.targetB.label}」的内隐联系更紧密<br/>
       小于0：对「${iat_temp.attribA.label} + ${iat_temp.targetB.label}」「${iat_temp.attribB.label} + ${iat_temp.targetA.label}」的内隐联系更紧密<br/>
       绝对值：0.2 = 小效应，0.5 = 中等效应，0.8 = 大效应<br/>
       <br/>（按任意键继续）</p>*/

//两次IAT间的指导语------------------------------------------------------------------------

var another_IAT = {

    type: jsPsychHtmlButtonResponse,

    stimulus: `
    <h3>休息时间</h3>
    <p>在接下来的任务中，你需要进行另一组的词语进行分类。<br/>
    现在您有一分钟的休息时间。</p>
    `,
    choices: ['<span id="timer">60</span>秒后继续'],
    button_html: btn_html_timer,
    on_finish: set_html_style_iat
}

//------------------------------------------------------------------------------------------------
//道德领域的IAT

/* Blocks: IAT */


var iat_temp2 = {
    // Pairs A & Pairs B should be compatible
    attribC: { label: '积极', items: ["高尚", "诚信", "善良", "君子", "廉正", "正直"] },
    attribD: { label: '消极', items: ["缺德", "卑鄙", "不孝", "不仁", "小人", "黑心"] },
    targetA: { label: '自我', items: ["我", "我的", "自己", "自己的", "本人", "本人的"] },
    targetB: { label: '他人', items: ["他", "他的", "别人", "别人的", "他人", "他人的"] },
}
var iat_words2 = [
    { label:'self', items: "我" }, {label:'self', items: "我的" }, {label:'self', items: "自己" },
    { label:'self', items: "自己的" }, {label:'self', items: "本人"}, {label:'self', items:"本人的" },
    { label:'other', items: "他" }, {label:'other', items: "他的"}, { label:'other', items:"别人" },
    { label:'other', items: "别人的" }, {label:'other', items: "他人" }, {label:'other',items:"他人的" },
    { label:'positive',items:"高尚" }, {label:'positive',items:"诚信" }, {label:'positive',items:"善良"},
    { label:'positive',items:"君子" }, {label:'positive',items:"廉正" }, {label:'positive',items:"正直" },
    { label:'negative',items:"缺德" }, {label:'negative',items:"卑鄙"}, {label:'negative',items:"不孝"},
    { label:'negative',items:"不仁" }, {label: 'negative',items:"小人"}, {label: 'negative',items:"黑心"}
  ];
// Randomize stimuli pairs (left vs. right; compatible-blocks first vs. incompatible-blocks first)

var version2 = jsPsych.randomization.factorial({ attrib2: [1, 2], target2: [1, 2] })[0] // one of four, e.g., { attrib: 2, target: 1 }
var compatible_first2 = (version2.attrib2 == version2.target2) ? true : false

var iat2 = JSON.parse(JSON.stringify(iat_temp2)) // 深复制（iat_temp仅为指针，浅复制会同步修改两者）
if (version2.attrib2 == 2) {
    iat2.attribC.label = iat_temp2.attribD.label
    iat2.attribC.items = iat_temp2.attribD.items
    iat2.attribD.label = iat_temp2.attribC.label
    iat2.attribD.items = iat_temp2.attribC.items
}
if (version2.target2 == 2) {
    iat2.targetA.label = iat_temp2.targetB.label
    iat2.targetA.items = iat_temp2.targetB.items
    iat2.targetB.label = iat_temp2.targetA.label
    iat2.targetB.items = iat_temp2.targetA.items
}


//设置标签样式
var tag_IAT_prac_attrib2 = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                           <span style="color:${attrib_color}">${iat2.attribC.label}</span></div>
                           <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                           <span style="color:${attrib_color}">${iat2.attribD.label}</span></div>`

var tag_IAT_prac_target_01 = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                             <span style="color:${target_color}">${iat2.targetA.label}</span></div>
                             <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                             <span style="color:${target_color}">${iat2.targetB.label}</span></div>`

var tag_IAT_prac_target_02 = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                             <span style="color:${target_color}">${iat2.targetB.label}</span></div>
                             <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                             <span style="color:${target_color}">${iat2.targetA.label}</span></div>`

var tag_IAT_test_01 = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                      <span style="color:${attrib_color}">${iat2.attribC.label}</span><br/>或<br/>
                      <span style="color:${target_color}">${iat2.targetA.label}</span></div>
                      <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                      <span style="color:${attrib_color}">${iat2.attribD.label}</span><br/>或<br/>
                      <span style="color:${target_color}">${iat2.targetB.label}</span></div>`

var tag_IAT_test_02 = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                      <span style="color:${attrib_color}">${iat2.attribC.label}</span><br/>或<br/>
                      <span style="color:${target_color}">${iat2.targetB.label}</span></div>
                      <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                      <span style="color:${attrib_color}">${iat2.attribD.label}</span><br/>或<br/>
                      <span style="color:${target_color}">${iat2.targetA.label}</span></div>`


// Instructions

var IAT_instr00 = {
    type: jsPsychHtmlButtonResponse,
    data: { version_attrib2: version2.attrib2, version_target2: version2.target2 },
    stimulus: `
    <h3>词语分类任务</h3>
    <p>在接下来的任务中，你需要对一系列词语进行分类。<p/>
    请先熟悉这些词语，这有利于你完成接下来的任务。</p>
    <table align="center" border=1 cellpadding=3 cellspacing=0>
    <tr> <th>类别</th> <th>词语</th> </tr>
    <tr> <td>&emsp;${iat_temp2.attribC.label}&emsp;</td> <td>&emsp;${iat_temp2.attribC.items.join('、')}&emsp;</td> </tr>
    <tr> <td>&emsp;${iat_temp2.attribD.label}&emsp;</td> <td>&emsp;${iat_temp2.attribD.items.join('、')}&emsp;</td> </tr>
    <tr> <td>&emsp;${iat_temp2.targetA.label}&emsp;</td> <td>&emsp;${iat_temp2.targetA.items.join('、')}&emsp;</td> </tr>
    <tr> <td>&emsp;${iat_temp2.targetB.label}&emsp;</td> <td>&emsp;${iat_temp2.targetB.items.join('、')}&emsp;</td> </tr>
    </table><br/>`,
    choices: ['<span id="timer">10</span>秒后继续'],
    button_html: btn_html_timer,
    on_load: () => {
        $("body").css("cursor", "default");
      },
    on_finish: function () {
        set_html_style_iat;
        $("body").css("cursor", "none");
    }
}


var IAT_instr01 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务1：对“${iat2.targetA.label}”词和“${iat2.targetB.label}”词分类 ——<p/>
    不同词语会出现在屏幕中央，类别标签将始终显示在屏幕上方<p/>   
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_prac_target_01
}
var IAT_instr02 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务2：对“${iat2.attribC.label}”词和“${iat2.attribD.label}”词分类 ——<p/>   
    <span style="color:#78DCE8"><b>注意上方，类别标签和需要分类的词语都已经改变</b></span><p/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_prac_attrib2,

};



var IAT_instr03 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务3：对“${iat2.targetA.label}/${iat2.attribC.label}”词和“${iat2.targetB.label}/${iat2.attribD.label}”词分类 ——<p/>
    <span style="color:#78DCE8"><b>注意上方，之前的四类词语将混合在一起交替呈现</b></span><p/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_test_01
}

var IAT_instr04 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务4：对“${iat2.targetA.label}/${iat2.attribC.label}”词和“${iat2.targetB.label}/${iat2.attribD.label}”词分类 ——<p/>
    <span style="color:#78DCE8"><b>与刚才的任务完全相同，请再次对这四类词语分类</b></span><p/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_test_01
}

var IAT_instr05 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务5：对“${iat2.targetB.label}”词和“${iat2.targetA.label}”词分类 ——<p/>
    <span style="color:#FF6188"><b>注意上方，仍然是两个类别标签，但互换了位置！</b></span><p/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_prac_target_02
}

var IAT_instr06 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务6：对“${iat2.targetA.label}/${iat2.attribD.label}”词和“${iat2.targetB.label}/${iat2.attribC.label}”词分类 ——<p/>
    <span style="color:#FF6188"><b>注意上方，四类词语将以新的组合方式交替呈现！</b></span><p/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_test_02
}

var IAT_instr07 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务7：对“${iat2.targetA.label}/${iat2.attribD.label}”词和“${iat2.targetB.label}/${iat2.attribC.label}”词分类 ——<p/>
    <span style="color:#FF6188"><b>与刚才的任务完全相同，请再次对这四类词语分类</b></span><p/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><p/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><p/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<p/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_test_02
}



var IAT11 = blockTemplateIAT(
    task_id="moral",
    screen_id=1,
    block_id = 11,
    tag = tag_IAT_prac_target_01,
    stimuli = generateRandomTrials(12, [].concat(iat2.targetA.items, iat2.targetB.items)),
    iat_words =iat_words2, 
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        return `<p style="color:${target_color}; font-size: 35px;">${stim}</p>`
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if (iat2.targetA.items.includes(stim)) { return keyCode(key_L) }
        if (iat2.targetB.items.includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1,
)

var IAT12 = blockTemplateIAT(
    task_id="moral",
    screen_id=2,
    block_id = 12,
    tag = tag_IAT_prac_attrib2,
    stimuli = generateRandomTrials(12, [].concat(iat2.attribC.items, iat2.attribD.items)),
    iat_words =iat_words2, 
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        return `<p style="color:${attrib_color}; font-size: 35px;">${stim}</p>`
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if (iat2.attribC.items.includes(stim)) { return keyCode(key_L) }
        if (iat2.attribD.items.includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1,
)

var IAT13 = blockTemplateIAT(
    task_id="moral",
    screen_id=3,
    block_id = 13,
    tag = tag_IAT_test_01,
    /*stimuli = crossArrays(
        generateRandomTrials(12, [].concat(iat2.targetA.items, iat2.targetB.items)),
        generateRandomTrials(12, [].concat(iat2.attribC.items, iat2.attribD.items)),
    ),*/
    // iat_sample= 24,
    stimuli = zip([iat2.targetA.items, iat2.attribC.items, iat2.targetB.items, iat2.attribD.items]),
    iat_words =iat_words2, 
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat2.targetA.items, iat2.targetB.items).includes(stim)) {
            return `<p style="color:${target_color}; font-size: 35px;">${stim}</p>`
        }
        if ([].concat(iat2.attribC.items, iat2.attribD.items).includes(stim)) {
            return `<p style="color:${attrib_color}; font-size: 35px;">${stim}</p>`
        }
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat2.targetA.items, iat2.attribC.items).includes(stim)) { return keyCode(key_L) }
        if ([].concat(iat2.targetB.items, iat2.attribD.items).includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1 * 2,
)

var IAT14 = blockTemplateIAT(
    task_id="moral",
    screen_id=4,
    block_id = 14,
    tag = tag_IAT_test_01,
    /*stimuli = crossArrays(
        generateRandomTrials(24, [].concat(iat2.targetA.items, iat2.targetB.items)),
        generateRandomTrials(24, [].concat(iat2.attribC.items, iat2.attribD.items)),
    ),*/
    stimuli = zip([generateRandomTrials(12, iat2.targetA.items), generateRandomTrials(12, iat2.attribC.items), generateRandomTrials(12, iat2.targetB.items), generateRandomTrials(12, iat2.attribD.items)]),
    iat_words =iat_words2, 
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat2.targetA.items, iat2.targetB.items).includes(stim)) {
            return `<p style="color:${target_color}; font-size: 35px;">${stim}</p>`
        }
        if ([].concat(iat2.attribC.items, iat2.attribD.items).includes(stim)) {
            return `<p style="color:${attrib_color}; font-size: 35px;">${stim}</p>`
        }
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat2.targetA.items, iat2.attribC.items).includes(stim)) { return keyCode(key_L) }
        if ([].concat(iat2.targetB.items, iat2.attribD.items).includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1 * 4,
)

var IAT15 = blockTemplateIAT(
    task_id="moral",
    screen_id=5,
    block_id = 15,
    tag = tag_IAT_prac_target_02,
    stimuli = generateRandomTrials(24, [].concat(iat2.targetB.items, iat2.targetA.items)),
    iat_words =iat_words2, 
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        return `<p style="color:${target_color}; font-size: 35px;">${stim}</p>`
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if (iat2.targetB.items.includes(stim)) { return keyCode(key_L) }
        if (iat2.targetA.items.includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1 * 2,
)

var IAT16 = blockTemplateIAT(
    task_id="moral",
    screen_id=6,
    block_id = 16,
    tag = tag_IAT_test_02,
    /*stimuli = crossArrays(
        generateRandomTrials(12, [].concat(iat2.attribC.items, iat2.attribD.items)),
        generateRandomTrials(12, [].concat(iat2.targetB.items, iat2.targetA.items)),
    ),*/
    stimuli = zip([iat2.attribC.items, iat2.targetB.items, iat2.attribD.items, iat2.targetA.items]),
    iat_words =iat_words2, 
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat2.attribC.items, iat2.attribD.items).includes(stim)) {
            return `<p style="color:${attrib_color}; font-size: 35px;">${stim}</p>`
        }
        if ([].concat(iat2.targetB.items, iat2.targetA.items).includes(stim)) {
            return `<p style="color:${target_color}; font-size: 35px;">${stim}</p>`
        }
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat2.attribC.items, iat2.targetB.items).includes(stim)) { return keyCode(key_L) }
        if ([].concat(iat2.attribD.items, iat2.targetA.items).includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1 * 2,
)

var IAT17 = blockTemplateIAT(
    task_id="moral",
    screen_id=7,
    block_id = 17,
    tag = tag_IAT_test_02,
    /*stimuli = crossArrays(
        generateRandomTrials(24, [].concat(iat2.attribC.items, iat2.attribD.items)),
        generateRandomTrials(24, [].concat(iat2.targetB.items, iat2.targetA.items)),
    ),*/
    stimuli = zip([generateRandomTrials(12, iat2.attribC.items), generateRandomTrials(12, iat2.targetB.items), generateRandomTrials(12, iat2.attribD.items), generateRandomTrials(12, iat2.targetA.items)]),
    iat_words =iat_words2, 
    stim_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat2.attribC.items, iat2.attribD.items).includes(stim)) {
            return `<p style="color:${attrib_color}; font-size: 35px;">${stim}</p>`
        }
        if ([].concat(iat2.targetB.items, iat2.targetA.items).includes(stim)) {
            return `<p style="color:${target_color}; font-size: 35px;">${stim}</p>`
        }
    },
    key_answer_func = function () {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat2.attribC.items, iat2.targetB.items).includes(stim)) { return keyCode(key_L) }
        if ([].concat(iat2.attribD.items, iat2.targetA.items).includes(stim)) { return keyCode(key_R) }
    },
    iat_sample = iat_sample1 * 4,
)

/* Blocks: Feedbacks */



var IAT_results2 = { IAT_D2: null, IAT_D_prac2: null, IAT_D_test2: null }

var debrief_IAT2 = {
    type: jsPsychHtmlKeyboardResponse,
    on_start: set_html_style,
    stimulus: function () {
        // See the scoring algorithm of IAT D-score in Greewald et al. (2003)
        if (compatible_first2) {
            var block_ids2 = { compat: [{ IAT: 13 }, { IAT: 14 }], incomp: [{ IAT: 16 }, { IAT: 17 }] }
        } else {
            var block_ids2 = { compat: [{ IAT: 16 }, { IAT: 17 }], incomp: [{ IAT: 13 }, { IAT: 14 }] }
        }
        var df_iat_raw2 = jsPsych.data.get().filter([{ IAT: 13 }, { IAT: 14 }, { IAT: 16 }, { IAT: 17 }]) // data frame (jsPsych 'Data Collection' class)
        var df2 = df_iat_raw2.filterCustom(function (trial) { return trial.rt < 10000 })

        var n_trials_less_than_300ms2 = df2.filterCustom(function (trial) { return trial.rt < 300 }).count()
        var p_too_fast2 = n_trials_less_than_300ms2 / df2.count()
        var validity2 = (p_too_fast2 < 0.1) ? `` :
            `<span style="color:red">抱歉，由于你的随意按键反应过多（${(100 * p_too_fast2).toFixed(1)}%），你的结果无效！</span><br/>`

        var iat_compat_prac2 = df2.filter(block_ids2.compat[0])
        var iat_compat_test2 = df2.filter(block_ids2.compat[1])
        var iat_incomp_prac2 = df2.filter(block_ids2.incomp[0])
        var iat_incomp_test2 = df2.filter(block_ids2.incomp[1])

        replaceWrongRT(iat_compat_prac2)
        replaceWrongRT(iat_compat_test2)
        replaceWrongRT(iat_incomp_prac2)
        replaceWrongRT(iat_incomp_test2)

        var mean_diff_prac2 = iat_incomp_prac2.select('RT').mean() - iat_compat_prac2.select('RT').mean()
        var mean_diff_test2 = iat_incomp_test2.select('RT').mean() - iat_compat_test2.select('RT').mean()
        var sd_pooled_prac2 = iat_compat_prac2.join(iat_incomp_prac2).select('rt').sd()
        var sd_pooled_test2 = iat_compat_test2.join(iat_incomp_test2).select('rt').sd()
        var IAT_D_prac2 = mean_diff_prac2 / sd_pooled_prac2
        var IAT_D_test2 = mean_diff_test2 / sd_pooled_test2
        var IAT_D2 = (IAT_D_prac2 + IAT_D_test2) / 2

        IAT_results2.IAT_D2 = IAT_D2
        IAT_results2.IAT_D_prac2 = IAT_D_prac2
        IAT_results2.IAT_D_test2 = IAT_D_test2

        return ` <p><div style="text-align: left">
        ${validity2}
        现在是休息时间，当您结束休息后，您可以点击 空格键 继续实验。</div><br/></p>
        <p> <div style = "color: green"><按空格键进入下一阶段的任务></div></p>
       `
    },
    on_finish: function (data) {
        data.varname = 'IAT_feedback2'
        data.summary = JSON.stringify(IAT_results2)
        // extract in R:  jsonlite::fromJSON(subset(data, varname=='IAT_feedback')$summary)
    }
}

//var timeline = [] //设置一个时间线
/* Combine Timelines */

var IAT_competence = [
    IAT_instr0,
    IAT_instr1, IAT1,
    IAT_instr2, IAT2,
    IAT_instr3, IAT3,
    IAT_instr4, IAT4,
    IAT_instr5, IAT5,
    IAT_instr6, IAT6,
    IAT_instr7, IAT7,
    debrief_IAT
];

/* Combine Timelines */

var IAT_moral = [
    IAT_instr00,
    IAT_instr01, IAT11,
    IAT_instr02, IAT12,
    IAT_instr03, IAT13,
    IAT_instr04, IAT14,
    IAT_instr05, IAT15,
    IAT_instr06, IAT16,
    IAT_instr07, IAT17,
    debrief_IAT2
];

// 随机决定被试的顺序
/*var order = jsPsych.randomization.shuffle([true, false])[0];

var main_IAT;
if (order) {
  main_IAT = [
    open_fullscreen,
    IAT_competence,
    IAT_moral,
    close_fullscreen
  ];
} else {
  main_IAT = [
    open_fullscreen,
    IAT_moral,
    IAT_competence,
    close_fullscreen
  ];
}*/
var main_IAT = {
    timeline: [

        {
            timeline: IAT_competence,
            conditional_function: () => {
                return jsPsych.timelineVariable("a", true) == 0
            }
        },

        {
            timeline: IAT_moral,
            conditional_function: () => {
                return jsPsych.timelineVariable("a", true) == 1
            }
        },],
    timeline_variables: jsPsych.randomization.factorial({
        a: jsPsych.randomization.shuffleNoRepeats(
            jsPsych.randomization.repeat([0, 1], 1)
        )
    })

}
/* 设置一个时间线*/
/*timeline.push(open_fullscreen);
timeline.push(main_IAT);

jsPsych.run(timeline);*/

