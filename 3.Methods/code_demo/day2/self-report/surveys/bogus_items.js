

var bogus_items = [
    { bogus: "我今年不到3岁。", },
    { bogus: "我在12岁从高中毕业。", },
    { bogus: "我曾经去过月球。", },
    { bogus: "我从来没有用过电脑。", },
    { bogus: "我今天没有填过任何问卷。", },
    { bogus: "我已经环游世界23次了。", },
    
]
var bogus_items_copy = bogus_items.slice();//复制一份
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

var bogus_items_sample = shuffle(bogus_items).slice(0, 1);


