const Match = require('../models/match');
const User = require('../models/user');

const createLittleMatch = async (matches) => {
    let filteredMatches = [];
    matches.forEach(match => {
        let team1 = 0;
        let team2 = 0;
        match.goals.forEach(goal => {
            if (match.team1.includes(goal)) {
                team1++;
            } if (match.team2.includes(goal)) {
                team2++;
            }
        });
        filteredMatches.push({ _id: match._id, date: match.date, goals: `${team1} - ${team2}`, team1: match.team1.length, team2: match.team2.length });
    });
    return filteredMatches;
}
const getMatchesList = async (req, res) => {
    let page = 0;
    let per_page = 100;
    let findQuery = {};
    if (req.query.per_page > 0) { per_page = req.query.per_page; }
    if (req.query.page > 0) { page = req.query.page - 1; }
    if (req.query.date) {
        let date = new Date(req.query.date);
        let matchDate = new Date(req.query.date);
        matchDate.setDate(date.getDate() + 1);
        findQuery.date = { $gte: date, $lt: matchDate };
    }
    try {
        const matches = await Match.find(findQuery, null, { skip: page * per_page, limit: per_page });
        matchtoSend = await createLittleMatch(matches);
        res.status(200).json(matchtoSend);
    }
    catch (err) { console.log(err); }
}

const getMatchById = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        res.status(200).json(match);
    }
    catch (err) {
        console.log(err);
        res.status(400).json("Match id not valid");
    }
}

const getUserListByMatchId = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        const playersList = match.team1.concat(match.team2);
        const playerToSend = await User.find({ _id: { $in: playersList } });
        let players = [];
        playerToSend.forEach(player => players.push({ _id: player._id, username: player.username }));
        res.status(200).json(players);
    }
    catch (err) {
        console.log(err);
        res.status(400).json("Match id not valid");
    }
}

const createMatch = async (req, res) => {
    const newMatch = new Match(req.body);
    try {
        const savedMatch = await newMatch.save();
        res.status(200).json(savedMatch);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

const getRefereeList = async (req, res) => {
    let page = 0;
    let per_page = 100;
    if (req.query.per_page > 0) { per_page = req.query.per_page; }
    if (req.query.page > 0) { page = req.query.page - 1; }
    let findQueryRef = { referee: { $in: [req.params.id] } };
    let findQueryCrea = { referee: { $nin: [req.params.id] }, createdBy: { $in: [req.params.id] } };
    if (req.query.date) {
        let date = new Date(req.query.date);
        let matchDate = new Date(req.query.date);
        matchDate.setDate(date.getDate() + 1);
        findQueryCrea.date = { $gte: date, $lt: matchDate };
        findQueryRef.date = { $gte: date, $lt: matchDate };
    }
    try {
        const matchesRef = await Match.find(findQueryRef, null, { skip: page * per_page, limit: per_page });
        const matchesCrea = await Match.find(findQueryCrea, null, { skip: page * per_page, limit: per_page });
        const matches = [...new Set([...matchesCrea, ...matchesRef])];
        const matchtoSend = await createLittleMatch(matches);
        res.status(200).json(matchtoSend);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

const updateMatch = async (req, res) => {
    try {
        const updatedMatch = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedMatch);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports = {
    getMatchesList,
    getMatchById,
    getUserListByMatchId,
    createMatch,
    getRefereeList,
    updateMatch
}