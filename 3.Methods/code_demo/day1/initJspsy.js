
const jsPsych = initJsPsych({
 extensions: [
    {type: Naodao}
  ],
     override_safe_mode: true,
     on_data_update: function (data) {
             data = jsPsych.data.get(); //updates the data file with the most recent trial 
         },
            });



    let debug = false;
    let alt1_sample =24;//ALT1中12match+12mismatch
    let  blockTotalNum_same=7;//ALT1正式实验重复组次数-1
    let  alt1_n=2;//ALT1的24trials重复次数
    let  iat_sample1= 12;
       if (jsPsych.data.getURLVariable("debug")) {
          version = "t3"
          debug = true;
          // 调试参数
          alt1_sample =6;//ALT1中12match+12mismatch
          blockTotalNum_same=1;//ALT1正式实验重复组次数-1
          alt1_n = 1;//ALT1的24trials重复次数 
         iat_sample1=1;
          if (jsPsych.data.getURLVariable("auto")) {
              auto(); // 自动运行，方便调试
          }
      } // 这玩意，只是为了方便调


