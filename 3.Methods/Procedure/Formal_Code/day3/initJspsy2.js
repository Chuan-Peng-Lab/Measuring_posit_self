const jsPsych = initJsPsych({
  extensions: [
    {type: Naodao}
  ],
     override_safe_mode: true,

     on_data_update: function (data) {
             data = jsPsych.data.get(); //updates the data file with the most recent trial 
         },          
     });
    


    