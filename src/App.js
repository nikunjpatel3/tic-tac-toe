import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './Components/NavBar';

import TicTacToe from "./Pages/Tic-Tac-Toe";
import Todo from "./Pages/Todo";
import NoMatch from "./Pages/NoMatch";

export default function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<TicTacToe />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
    </>
  );
}