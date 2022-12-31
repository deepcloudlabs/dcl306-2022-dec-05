import {saveGameStatisticsToLocalStorage} from "../utility/mastermind-util";

export default function statisticsReducer(statistics, action) {
    switch (action.type) {
        case 'PLAYER_LOSES': {
            let loses = statistics.loses + 1;
            let newStatistics = {...statistics, loses};
            saveGameStatisticsToLocalStorage(newStatistics)
            return newStatistics;
        }
        case 'PLAYER_WINS': {
            let wins = statistics.wins + 1;
            let newStatistics = {...statistics, wins};
            saveGameStatisticsToLocalStorage(newStatistics)
            return newStatistics;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
