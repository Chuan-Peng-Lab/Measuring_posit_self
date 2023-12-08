var selected_items = [
    { selection: "请跳过本题，无需按键。", correct_answer: "null" },
    { selection: "为了验证浏览器是否正常工作，请您选择量表中的数字2。", correct_answer: "2" },
    {selection: "为了验证浏览器是否正常工作，请您在以下量表中选择“不符合”对应的数字。", correct_answer: "1" },
    {selection: "为了验证浏览器是否正常工作，请您在以下量表中选择“有点符合”对应的数字。", correct_answer: "4" },
    { selection: "为了验证浏览器是否正常工作，请您选择量表中的第3个数字。", correct_answer: "3" },
    { selection: "为了验证浏览器是否正常工作，请您选择量表中的第5个数字。", correct_answer: "5" },
    { selection: "为了验证浏览器是否正常工作，请您在量表中选择数字1。", correct_answer: "1" },]

    var selected_items_copy = selected_items.slice();//复制一份
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

var selected_items_sample = shuffle(selected_items).slice(0, 1);
