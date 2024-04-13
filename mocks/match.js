const fs = require('fs');
const usersJson = require('./users.json');

numberOfMatches = 10;
playersPerTeam = [7, 8, 9, 10];
numberOfGoals = [7, 8, 9, 10, 11, 12];
matches = [];
for (let i = 0; i < numberOfMatches; i++) {
    let team1 = [];
    let team2 = [];
    let goals = [];
    let filteredPlayer = usersJson;
    for (let j = 0; j < playersPerTeam[Math.floor(Math.random() * playersPerTeam.length)]; j++) {
        let player = filteredPlayer[Math.floor(Math.random() * filteredPlayer.length)]._id;
        team1.push(player);
        filteredPlayer = filteredPlayer.filter(user => user._id != player);
        player = filteredPlayer[Math.floor(Math.random() * filteredPlayer.length)]._id;
        team2.push(player);
        filteredPlayer = filteredPlayer.filter(user => user._id != player);
    }
    for (let j = 0; j < numberOfGoals[Math.floor(Math.random() * numberOfGoals.length)]; j++) {
        let team = Math.floor(Math.random() * 2);
        if (team == 0) {
            goals.push(team1[Math.floor(Math.random() * team1.length)]);
        }else{
            goals.push(team2[Math.floor(Math.random() * team2.length)]);
        }
    }
    matches.push({
        team1: team1,
        team2: team2,
        goals: goals,
        checked: false,
        date: new Date(),
        note: ""
    });
}
fs.writeFileSync('./matches.json', JSON.stringify(matches), function (err) {
    if (err) console.log(err);
});
console.log("File './matches.json' created");
