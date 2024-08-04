
const jsPsych = initJsPsych({
 extensions: [{ type: Naodao }],
  override_safe_mode: true,
  on_data_update: function (data) {
    data = jsPsych.data.get(); //updates the data file with the most recent trial 
  },
  //}
});

      // 生成700个不同的被试编号，一半为奇数，一半为偶数
      var participantIDs = [];
      var numParticipants = 700;
      
      for (var i = 1; i <= numParticipants / 2; i++) {
        // 生成奇数
        var oddParticipantID = i * 2 - 1;
        participantIDs.push(oddParticipantID);
      
        // 生成偶数
        var evenParticipantID = i * 2;
        participantIDs.push(evenParticipantID);
      }
      
      // 随机打乱被试编号数组
      participantIDs = jsPsych.randomization.shuffle(participantIDs);
      
      // 在试验中使用被试编号
      var currentParticipantIndex = 0;
          
        var ParticipantID = participantIDs[currentParticipantIndex];
        jsPsych.data.addProperties({
         ParticipantID: ParticipantID
       });
 


