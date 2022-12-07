import {useEffect, useState} from "react";
import {Line} from 'react-chartjs-2';
import io from 'socket.io-client';

const initialChartData = {
    labels: [],
    datasets: [{
        label: 'BTC-USDT Price',
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderDashOffset: 0.0,
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
    }]
};

const socket = io("ws://localhost:5555");

function App() {
    const [trades, setTrades] = useState([]);
    const [chartData, setChartData] = useState(initialChartData);
    const [windowSize, setWindowSize] = useState(25);

    function handleChange(e) {
        setWindowSize(Number(e.target.value));
    }

    useEffect(() => {
        console.log("Adding listener to the websocket...")
        socket.on('ticker', (trade) => {
            setTrades(trades => {
                let newTrades = [...trades, trade];
                if (newTrades.length > windowSize) {
                    let index = newTrades.length - windowSize + 1;
                    newTrades = newTrades.slice(index);
                }
                return newTrades;
            });
            setChartData(chartData => {
                let newChartData = {...chartData};
                newChartData.datasets = [...chartData.datasets];
                newChartData.labels = [...chartData.labels, trade.timestamp];
                if (newChartData.labels.length > windowSize) {
                    let index = newChartData.labels.length - windowSize + 1;
                    newChartData.labels = newChartData.labels.slice(index);
                }
                newChartData.datasets[0].data = [...chartData.datasets[0].data, Number(trade.price)];
                if (newChartData.datasets[0].data.length > windowSize) {
                    let index = newChartData.datasets[0].data.length - windowSize + 1;
                    newChartData.datasets[0].data = newChartData.datasets[0].data.slice(index);
                }
                return newChartData;
            });
        });
        return () => {
            console.log("Removing listener from the websocket...")
            socket.off('ticker');
        }
    }, [windowSize]);
    return (
        <div className="container">
            <p></p>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Market Console</h4>
                </div>
                <div className="card-body">
                    <div className="input-group">
                        <label className="input-group-text" htmlFor="windowsize">Window Size</label>
                        <select id="windowsize"
                                type="text"
                                name="windowSize"
                                value={windowSize}
                                onChange={handleChange}
                                className="form-control">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                    </div>
                </div>
            </div>
            <p></p>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Chart Data</h4>
                </div>
                <div className="card-body">
                    <Line redraw
                          data={chartData}
                          options={{animation: false, maintainAspectRatio: false}}
                          width={640}
                          height={480}></Line>
                </div>
            </div>
            <p></p>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Market Data</h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped table-hover table-responsive">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Timestamp</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            trades.map((trade, index) =>
                                <tr key={trade.timestamp + index.toString()}>
                                    <td>{index + 1}</td>
                                    <td>{trade.symbol}</td>
                                    <td>{trade.price}</td>
                                    <td>{trade.quantity}</td>
                                    <td>{new Date(trade.timestamp).toString()}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default App;
