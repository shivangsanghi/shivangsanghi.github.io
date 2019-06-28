const controller = (() => {
    let bets = null;
    let teams = null;
    let prediction = null;

    // bets format should "rate amount l/k fav"
    function saveBets(data) {
        if (!teams) {
            alert("Please enter teams first");
            throw new Error("Please enter teams first");
        }
        localStorage.setItem("bets", data);
        var betsArr = data.split("\n").filter(bet => !!bet);

        bets = betsArr.map(bet => {
            return bet.split(" ").filter(item => !!item);
        }).filter(item => item.length === 4);

        calculateWinningPrediction();
    }

    function saveTeams(data) {
        localStorage.setItem("teams", data);
        teams = data.split(" ").filter(team => !!team).map(item => item.trim());
        if (teams.length !== 2) {
            teams = null;
            alert("Please enter both teams with space only");
            throw new Error("Please enter both teams with space only");
        }
    }

    function getTeams() {
        return teams;
    }

    function calculateWinningPrediction() {
        if (!bets || !teams) {
            return;
        }
        // winning prediction of 1st team
        prediction = teams.map(team => {
            const team1 = team;
            const team2 = teams.find(item => item !== team1);
            // get team1 lagaye
            let lBets = bets.filter(bet => {
                return bet[3] == team1 && bet[2] === "l";
            });
            const lTeam1BetsTotal = lBets.reduce((prev, curr)=>{ return prev + +curr[1]*+curr[0]/100}, 0);
            // get team1 khaye
            let kBets = bets.filter(bet => {
                return bet[3] == team1 && bet[2] === "k";
            });
            const KTeam1BetsTotal = kBets.reduce((prev, curr)=>{ return prev + +curr[1]*+curr[0]/100}, 0);
            // get team2 lagaye
            lBets = bets.filter(bet => {
                return bet[3] == team2 && bet[2] === "l";
            });
            const lTeam2BetsTotal = lBets.reduce((prev, curr)=>{ return prev + +curr[1]}, 0);
            // get team2 khaye
            kBets = bets.filter(bet => {
                return bet[3] == team2 && bet[2] === "k";
            });
            const KTeam2BetsTotal = kBets.reduce((prev, curr)=>{ return prev + +curr[1]}, 0);

            return lTeam1BetsTotal + KTeam2BetsTotal - KTeam1BetsTotal - lTeam2BetsTotal;
        });
    }

    function getPrediction(){
        return prediction;
    }

    return {
        saveBets,
        saveTeams,
        getTeams,
        getPrediction
    };

})();
