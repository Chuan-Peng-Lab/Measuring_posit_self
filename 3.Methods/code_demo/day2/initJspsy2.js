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
     let SRET_sample =88;
     let  RJ_sample =160;
     let alt2_sample =24;//ALT2中12match+12mismatch
     let  blockTotalNum_same=7;//ALT2正式实验重复组次数-1
     let  alt2_n=2;//ALT2的24trials重复次数
     let  math_time_limit =180000;//3 min
     if (jsPsych.data.getURLVariable("debug")) {
      version = "t3"
      debug = true;
      // 调试参数
       SRET_sample =5;
      RJ_sample =5;
      alt2_sample =6;//ALT1中12match+12mismatch
      blockTotalNum_same=1;//ALT1正式实验重复组次数-1
      alt2_n=1;//ALT1的24trials重复次数
      math_time_limit =3000;
      if (jsPsych.data.getURLVariable("auto")) {
          auto(); // 自动运行，方便调试
      }
  } // 这玩意，只是为了方便调

    