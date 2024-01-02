const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const testScore = document.getElementById('testScore');
finalScore.innerText = `${mostRecentScore}/7`;

var testScore1 = (Number(mostRecentScore));
console.log(testScore1);

if(testScore1 > 5) {
    testScore.innerText = "You're a genius";
} if (testScore1 < 5){
    testScore.innerText = "You suck!";
} if(testScore1 === 5){
    testScore.innerText = "You're alright";
};

saveHighScore = (e) => {
    e.preventDefault();
};
