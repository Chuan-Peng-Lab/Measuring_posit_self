/*人口统计学变量*/
//  day0_Q1
var gender_scale = ["A.男", "B.女"];
var month_scale = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11","12"];
var ethnicity_scale = ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族",
"瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族","僳僳族","佤族","畲族","高山族","拉祜族","水族","东乡族","纳西族","景颇族","柯尔克孜族",
"土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族","毛南族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族","乌孜别克族","俄罗斯族","鄂温克族","德昂族","保安族",
"裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族"];
var edu_scale = ["A.小学（含小学未毕业）", "B.初中（含初中未毕业）", "C.高中（含高中未毕业）",
    "D.大专（含大专毕业或未毕业）", "E.本科（含本科在读）",
    "F.硕士（含硕士在读）", "G.博士及以上（含博士在读)",];
var edu2_scale = ["A.没有上过学", "B.小学", "C.初中", "D.高中或中专", "E.大学（专科或本科）", "F.研究生",];
var occupation_scale = ["A.临时工、失业、待业人员、非技术及农业劳动者阶层,如农民",
    "B.体力劳动工人和个体经营人员、技术工及同级工作者,如建筑工人及相关人员",
    "C.一般管理人员与一般专业技术人员、事务性工作人员,包括商业服务业员工阶层、办事人员阶层,如售货员、司机等",
    `D.中层管理人员与中层专业技术人员、助理专业人员,包括在各种经济成分的机构(包括国家机关、党群组织、全民企事业单位、集体企事业单位和各类非公有制经济企业)中专门从事各种专业性工作和科学技术工作的人员,如教师、医生、技师等`,
    "E.职业高级管理人员与高级专业技术人员、专业主管人员,包括在党政、事业和社会团体机关单位中行使实际的行政管理职权的领导干部、大中型企业中非业主身份的高中层管理人员和私营企业主阶层,如公务员、公司经理、工头等"];
var income_scale = ["A.无收入", "B.2000 元以下", "C.2000—5000 元", "D.5000—10000 元", "E.10000—30000 元", "F.30000—50000 元", "G.50000—100000 元",
    "H.100000—150000 元", "I.150000—200000元", "J.200000 元以上"];

    const preload = {
        type: jsPsychPreload,
        images: 'img/ses.png',
      }
//问卷内容
var demographics_1 = {

    type: jsPsychSurvey,
    pages:[
     /*[
        { type:"drop-down",prompt: "1.民族", options: ethnicity_scale, name: 'ethnicity', required: true },
        { type:"drop-down",prompt: "2.性别", options: gender_scale,  name: 'gender', required: true },
        { type:"text",prompt: "3.您的出生年", placeholder: '例如: 1999',  name: 'birthyear', required: true },
        { type:"drop-down",prompt: "4.您的出生月", options: month_scale,  name: 'birthmonth', required: true },        
        { type:"drop-down", prompt: "5.您的最高受教育程度", options: edu_scale,  name: 'selfEdu', required: true },],*/
        [
        { type:"drop-down",prompt: "1.性别", options: gender_scale,  name: 'gender', required: true },
        { type:"drop-down",prompt: "2.父亲受教育程度", options: edu2_scale,  name: 'fatherEdu', required: true },
        { type:"drop-down",prompt: "3.母亲受教育程度", options: edu2_scale,  name: 'motherEdu', required: true },],
        [{ type:"multi-choice",prompt: "4.父亲职业", options: occupation_scale,   name: 'FatherOccupation', required: true },],
       [ { type:"multi-choice",prompt: "5.母亲职业", options: occupation_scale,  name: 'MotherOccupation', required: true },],
        [{ type:"text",prompt: "6.家庭月收入（人民币/元）", placeholder: '例如: 3000',  name: 'income', required: true }
    
    ],
           
],
     
  button_label_next: "继续",

/** Label of the button to move backward through survey pages. */
       button_label_back: "上一页",
       button_label_finish: "提交",
       show_clickable_nav: true,
      

    on_finish: function (data) {
      var subj_idx=$.ajax("https://www.naodao.com/api/register-server/user/getInfo", {async: false}).responseJSON.data.userId;
        var subj_name=$.ajax("https://www.naodao.com/api/register-server/user/getInfo", {async: false}).responseJSON.data.realName;
        var age = $.ajax("https://www.naodao.com/api/register-server/user/getInfo", {async: false}).responseJSON.data.age;
        var education =$.ajax("https://www.naodao.com/api/register-server/user/getInfo", {async: false}).responseJSON.data.education;
        var  national =$.ajax("https://www.naodao.com/api/register-server/user/getInfo", {async: false}).responseJSON.data.national;
        var birthday=$.ajax("https://www.naodao.com/api/register-server/user/getInfo", {async: false}).responseJSON.data.birthday;
        info["subj_idx"] = subj_idx;  
        var responses = data.response;
       /* d1 = ethnicity_scale.indexOf(responses.ethnicity);       
       
        d3 = responses.birthyear;
        d4 = month_scale.indexOf(responses.birthmonth);
        d5 = edu_scale.indexOf(responses.selfEdu);
        */ d2 = gender_scale.indexOf(responses.gender);
        d6 = edu2_scale.indexOf(responses.fatherEdu);
        d7 = edu2_scale.indexOf(responses.motherEdu);
        d8 = occupation_scale.indexOf(responses.FatherOccupation);
        d9 = occupation_scale.indexOf(responses.MotherOccupation);
        //d9 = income_scale.indexOf(responses.income);
        d10 = responses.income;
        jsPsych.data.addProperties({
          //  subj_idx:subj_idx,subj_name:subj_name,age:age,education:education,
           // national:national,birthday:birthday,sex:d2,
            fatherEdu: d6, motherEdu: d7,
            FatherOccupation: d8, MotherOccupation: d9,
            income: d10
        })
    }
}
/*var demographics_2 = {

    type: jsPsychSurveyMultiChoice,
    questions: [
        { type:"drop-down",prompt: "5.父亲受教育程度", options: edu2_scale, horizontal: true, name: 'fatherEdu', required: true },
        { type:"drop-down",prompt: "6.母亲受教育程度", options: edu2_scale, horizontal: true, name: 'motherEdu', required: true },
        { type:"drop-down",prompt: "7.父亲职业", options: occupation_scale, horizontal: true, name: 'FatherOccupation', required: true },
        { type:"drop-down",prompt: "8.母亲职业", options: occupation_scale, horizontal: true, name: 'MotherOccupation', required: true },
        { type:"drop-down",prompt: "9.家庭年收入（人民币）", options: income_scale, horizontal: true, name: 'income', required: true }
    ],


    button_label: "Next",


    on_finish: function (data) {
        var responses = data.response;

        d5 = edu2_scale.indexOf(responses.fatherEdu);
        d6 = edu2_scale.indexOf(responses.motherEdu);
        d7 = occupation_scale.indexOf(responses.FatherOccupation);
        d8 = occupation_scale.indexOf(responses.MotherOccupation);
        d9 = income_scale.indexOf(responses.income);
        jsPsych.data.addProperties({
            //民族: d1, 性别: d2, 年龄: d3, 本人受教育程度: d4,
            父亲受教育程度: d5, 母亲受教育程度: d6,
            父亲职业: d7, 母亲职业: d8,
            家庭年收入: d9
        });
        // $('html,body').scrollTop(0);
        //jsPsych.data.get().localSave('csv', stamp() + '_demg.csv');
    }

};*/
//社会经济地位
var ses_scale = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var ses_block = {
    type: jsPsychSurveyLikert,
    questions: [
       {
            prompt: `<div style='display: flex; justify-content: center; align-items: center;'><div style='text-align: center;'><img src='img/ses.png' style='display: block; margin: 0 auto;width: 350px; height: 350px;'></img><p style="color: white; font-size:20px">如上图所示，您所在家庭的社会经济地位假如有十个等级，<span style="color: red; font-size:20px"><b>根据家庭客观条件</b>来判断目前家庭<b>在整个社会上</b>处于什么水平？</span><p style="color: white; font-size:20px">最顶端 = 社会经济地位最高的家庭，最低端 = 社会经济地位水平最低的家庭。</p><br>`,
            labels: ses_scale, required: true
        },
        {
            prompt: ` <div style='display: flex; justify-content: center; align-items: center;'><div style='text-align: center;'><img src='img/ses.png' style='display: block; margin: 0 auto;width: 350px; height: 350px;'></img><p style="color: white; font-size:20px">如图所示，<span style="color: red; font-size:20px">如果您估计您的家庭社会经济地位<b>相比周围的同学、朋友等而言，</b>与哪个阶层水平更高就选哪个数字等级，</p><p style="color: white; font-size:20px">例如：比大约 50% 人群高，那么选第 5 级，若感觉处于最底层，就选第 1 级，类似的选出自己最合适的一级台阶。</p><br>`,
            labels: ses_scale, required: true
        }
    ],
    button_label: "继续",
  
    on_finish: function (data) {
        var responses = data.response;
        jsPsych.data.addProperties({
            obj_ses1: responses.Q0+1, fri_ses2: responses.Q1+1
        });
        $('html,body').scrollTop(0);
       // jsPsych.data.get().localSave('csv', stamp() + '_demg.csv');
    }

};
var demog = {timeline:[demographics_1, ses_block]};
