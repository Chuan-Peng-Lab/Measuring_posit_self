/* STIMULI FOR TASK 1
- list_A
- list_B
*/

var A_neg = [
    { valence: 'Negative', adjective: 'Apathetic' },
    { valence: 'Negative', adjective: 'Cold' },
    { valence: 'Negative', adjective: 'Cowardly' },
    { valence: 'Negative', adjective: 'Dishonest' },
    { valence: 'Negative', adjective: 'Impolite' },
    { valence: 'Negative', adjective: 'Uncharismatic' },
    { valence: 'Negative', adjective: 'Stingy' },
    { valence: 'Negative', adjective: 'Ugly' },
    { valence: 'Negative', adjective: 'Undecided' },
    { valence: 'Negative', adjective: 'Unskilled' }
]

var B_neg = [
    { valence: 'Negative', adjective: 'Antisocial' },
    { valence: 'Negative', adjective: 'Corrupt' },
    { valence: 'Negative', adjective: 'Dependent' },
    { valence: 'Negative', adjective: 'Hostile' },
    { valence: 'Negative', adjective: 'Lazy' },
    { valence: 'Negative', adjective: 'Sick' },
    { valence: 'Negative', adjective: 'Stupid' },
    { valence: 'Negative', adjective: 'Unattractive' },
    { valence: 'Negative', adjective: 'Unimaginative' },
    { valence: 'Negative', adjective: 'Non-empathetic' }
]

var A_neu = [
    { valence: 'Neutral', adjective: 'Old' },
    { valence: 'Neutral', adjective: 'Political' },
    { valence: 'Neutral', adjective: 'Spiritual' },
    { valence: 'Neutral', adjective: 'Busy' },
    { valence: 'Neutral', adjective: 'Competitive' },
    { valence: 'Neutral', adjective: 'Extraverted' },
    { valence: 'Neutral', adjective: 'Intense' },
    { valence: 'Neutral', adjective: 'Predictable' },
    { valence: 'Neutral', adjective: 'Sensual' },
    { valence: 'Neutral', adjective: 'Traditional' }
]

var B_neu = [
    { valence: 'Neutral', adjective: 'Mystical' },
    { valence: 'Neutral', adjective: 'Moderate' },
    { valence: 'Neutral', adjective: 'Young' },
    { valence: 'Neutral', adjective: 'Changing' },
    { valence: 'Neutral', adjective: 'Dreamy' },
    { valence: 'Neutral', adjective: 'Formal' },
    { valence: 'Neutral', adjective: 'Introverted' },
    { valence: 'Neutral', adjective: 'Private' },
    { valence: 'Neutral', adjective: 'Shy' },
    { valence: 'Neutral', adjective: 'Trendy' }
]

var A_pos = [
    { valence: 'Positive', adjective: 'Calm' },
    { valence: 'Positive', adjective: 'Stable' },
    { valence: 'Positive', adjective: 'Decisive' },
    { valence: 'Positive', adjective: 'Creative' },
    { valence: 'Positive', adjective: 'Empathetic' },
    { valence: 'Positive', adjective: 'Generous' },
    { valence: 'Positive', adjective: 'Healthy' },
    { valence: 'Positive', adjective: 'Honorable' },
    { valence: 'Positive', adjective: 'Intelligent' },
    { valence: 'Positive', adjective: 'Sympathetic' }
]

var B_pos = [
    { valence: 'Positive', adjective: 'Cooperative' },
    { valence: 'Positive', adjective: 'Attractive' },
    { valence: 'Positive', adjective: 'Courageus' },
    { valence: 'Positive', adjective: 'Charismatic' },
    { valence: 'Positive', adjective: 'Friendly' },
    { valence: 'Positive', adjective: 'Hardworking' },
    { valence: 'Positive', adjective: 'Honest' },
    { valence: 'Positive', adjective: 'Independent' },
    { valence: 'Positive', adjective: 'Skillful' },
    { valence: 'Positive', adjective: 'Warm' }
]

var person10 = [  
    { person: 'You' },
    { person: 'You' },
    { person: 'You' },
    { person: 'You' },
    { person: 'You' },
    { person: 'Friend' },
    { person: 'Friend' },
    { person: 'Friend' },
    { person: 'Friend' },
    { person: 'Friend' }
]

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}
// randomize and concatenate
var personRand = shuffle(person10);
var A_neg = A_neg.map((obj, index) => Object.assign({}, obj, personRand[index]));

var personRand = shuffle(person10);
var B_neg = B_neg.map((obj, index) => Object.assign({}, obj, personRand[index]));

var personRand = shuffle(person10);
var A_neu = A_neu.map((obj, index) => Object.assign({}, obj, personRand[index]));

var personRand = shuffle(person10);
var B_neu = B_neu.map((obj, index) => Object.assign({}, obj, personRand[index]));

var personRand = shuffle(person10);
var A_pos = A_pos.map((obj, index) => Object.assign({}, obj, personRand[index]));

var personRand = shuffle(person10);
var B_pos = B_pos.map((obj, index) => Object.assign({}, obj, personRand[index]));


/* FINAL LISTS */
var list_A = A_neg.concat(A_neu, A_pos)
var list_B = B_neg.concat(B_neu, B_pos)

