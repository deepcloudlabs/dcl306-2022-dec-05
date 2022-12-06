import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import Mastermind from './Mastermind';
import {Route, Routes} from "react-router";
import PlayerWins from "./wins/player-wins";
import PlayerLoses from "./loses/player-loses";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
let routing = <Routes>
    <Route path="/" exact element={<Mastermind/>}></Route>
    <Route path="/wins" element={<PlayerWins/>}></Route>
    <Route path="/loses" element={<PlayerLoses/>}></Route>
</Routes>;
root.render(
  <React.StrictMode>
      <BrowserRouter>
          {routing}
      </BrowserRouter>
  </React.StrictMode>
);