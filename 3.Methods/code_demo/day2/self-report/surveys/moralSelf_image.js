/*
day2_Q2

moral self-image scale(Liu 2020) (9)
原版：
Jordan, J., Leliveld, M. C., & Tenbrunsel, A. (2015). The Moral Self-Image Scale: Measuring and Understanding the Malleability of the Moral Self. Frontiers in Psychology, 6. doi:10.3389/fpsyg.2015.01878
中文：刘青兰，2020的datapaper

这只是翻译，未经过回译以及校对，未经过修改，请谨慎使用；不过可以用fad+的数据跑一下看看结果？

*/
var moralSeImag1_scale = ["1<br>远没有达到我想达到的关爱程度", "2", "3", "4", "5<br>完全与我想要达到的关爱程度相同", "6", "7", "8", "9<br>远高于我想要达到的关爱程度"];
var moralSeImag2_scale = ["1<br>远没有达到我想达到的有同情心程度", "2", "3", "4", "5<br>完全与我想要达到的有同情心的程度相同", "6", "7", "8", "9<br>远高于我想要达到的有同情心的程度"];
var moralSeImag3_scale = ["1<br>远没有达到我想达到的公平程度", "2", "3", "4", "5<br>完全与我想要达到的公平程度相同", "6", "7", "8", "9<br>远高于我想要达到的公平程度"];
var moralSeImag4_scale = ["1<br>远没有达到我想达到的友好程度", "2", "3", "4", "5<br>完全与我想要达到的友好程度相同", "6", "7", "8", "9<br>远高于我想要达到的友好程度"];
var moralSeImag5_scale = ["1<br>远没有达到我想达到的慷慨程度", "2", "3", "4", "5<br>完全与我想要达到的慷慨程度相同", "6", "7", "8", "9<br>远高于我想要达到的慷慨程度"];
var moralSeImag6_scale = ["1<br>远没有达到我想达到的努力工作的程度", "2", "3", "4", "5<br>完全与我想要达到的努力工作的程度相同", "6", "7", "8", "9<br>远高于我想要达到的努力工作的程度"];
var moralSeImag7_scale = ["1<br>远没有达到我想达到的乐于助人的程度", "2", "3", "4", "5<br>完全与我想要达到的乐于助人的程度相同", "6", "7", "8", "9<br>远高于我想要达到的乐于助人的程度"];
var moralSeImag8_scale = ["1<br>远没有达到我想达到的诚实程度", "2", "3", "4", "5<br>完全与我想要达到的诚实程度相同", "6", "7", "8", "9<br>远高于我想要达到的诚实程度"];
var moralSeImag9_scale = ["1<br>远没有达到我想达到的善良程度", "2", "3", "4", "5<br>完全与我想要达到的善良程度相同", "6", "7", "8", "9<br>远高于我想要达到的善良程度"];
//问卷设问
var moralSeImag_block1 = {
    type: jsPsychSurveyLikert,
    preamble: "<p><div style='color:white; font-size: 25px;line-height: 20px;'>请对下列关于你的陈述进行判断。</div></p>",
    questions: [
        { prompt: " 1. 与我想成为的一个关爱他人的人相比，我现在", labels: moralSeImag1_scale, required: true },
        { prompt: " 2. 与我想成为的一个有同情心的人相比，我现在", labels: moralSeImag2_scale, required: true },
        { prompt: " 3. 与我想成为的一个公平的人相比，我现在", labels: moralSeImag3_scale, required: true },      

    ],

    button_label: "继续",
    on_load: () => {
        $("body").css("cursor", "default");
      },
    on_finish: function (data) {
        var responses = data.response;
        $("body").css("cursor", "default");
        jsPsych.data.addProperties({
            moralSeImag_1: responses.Q0+1, moralSeImag_2: responses.Q1+1, moralSeImag_3: responses.Q2+1,
        })
    }
}
var moralSeImag_block2 = {
    type: jsPsychSurveyLikert,
    preamble: "<p><div style='color:white; font-size: 25px;line-height: 20px;'>请对下列关于你的陈述进行判断。</div></p>",
    questions: [

        { prompt: " 4. 与我想成为的一个友好的人相比，我现在", labels: moralSeImag4_scale, required: true },
        { prompt: " 5. 与我想成为的一个慷慨的人相比，我现在", labels: moralSeImag5_scale, required: true },
        { prompt: " 6. 与我想成为的一个努力工作的人相比，我现在", labels: moralSeImag6_scale, required: true },
    ],

    button_label: "继续",

    on_finish: function (data) {
        var responses = data.response;
        $("body").css("cursor", "default");
        jsPsych.data.addProperties({
            moralSeImag_4: responses.Q0+1, moralSeImag_5: responses.Q1+1, moralSeImag_6: responses.Q2+1,
        })
    }
}
var moralSeImag_block3 = {
    type: jsPsychSurveyLikert,
    preamble: "<p><div style='color:white; font-size: 25px;line-height: 20px;'>请对下列关于你的陈述进行判断。</div></p>",
    questions: [

        { prompt: " 7. 与我想成为的一个乐于助人的人相比，我现在", labels: moralSeImag7_scale, required: true },
        { prompt: " 8. 与我想成为的一个诚实的人相比，我现在", labels: moralSeImag8_scale, required: true },
        { prompt: " 9. 与我想成为的一个善良的人相比，我现在", labels: moralSeImag9_scale, required: true }

    ],
    button_label: "继续",


    show_clickable_nav: true,
    on_finish: function (data) {
        var responses = data.response;

        jsPsych.data.addProperties({
            moralSeImag_7: responses.Q0+1, moralSeImag_8: responses.Q1+1,moralSeImag_9: responses.Q2+1
        });
        $("body").css("cursor", "default");
        $('html,body').scrollTop(0);
        // jsPsych.data.get().localSave('csv', stamp() + '_moralSeImag.csv');
    }

};

var moralSeImag = { timeline: [moralSeImag_block1, moralSeImag_block2,moralSeImag_block3] };