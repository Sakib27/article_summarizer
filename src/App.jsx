//Author: Sadman Sakib

import React from 'react'; // Import React Library
import Hero from './components/Hero'; // Import Hero Component
import Demo from './components/Demo'; // Import Demo Component

import './App.css'; // Import CSS Styling Sheet

const App = () => {
  return (
    <main>
      <div className = "main">
        <div className = "gradient" />
      </div>
<Hero/>
      <div className = "app">
        
        <Demo/>
      </div>
    </main>
  )
}

export default App