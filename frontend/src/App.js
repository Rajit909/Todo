import React from 'react';
import './App.css';
import { Routes, Route} from 'react-router-dom';

import AddTodo from './Components/AddTodo';
import TodoHero from './Components/TodoHero';
import Navbar from './Components/Navbar';


const App = () => {
  return(
      <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<AddTodo/>} />
        <Route path='/mytodo' element={<TodoHero/>} />
      </Routes>
      </>
  )
}
export default App;