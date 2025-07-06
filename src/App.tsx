import React from 'react';
import './App.css';
import Header from './components/Header';
import MainLayout from './components/MainLayout';
import KanbanBoard from './components/KanbanBoard';

function App() {
  return (
    <>
    <Header/>
    <MainLayout>
      <KanbanBoard />
    </MainLayout>
    </>
  );
}

export default App;
