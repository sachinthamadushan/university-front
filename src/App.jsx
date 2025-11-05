import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { StudentPage } from './pages/StudentPage'
import { CoursePage } from './pages/CoursePage'
import { EntrollmentPage } from './pages/EntrollmentPage'

function App() {

  return (
    <div className="bg-sky-100 min-h-screen">
      <header>
        <Navbar/>
      </header>
      <main className='container mx-auto p-8'>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/students' element={<StudentPage/>} />
          <Route path='/courses' element={<CoursePage/>} />
          <Route path='/enroll' element={<EntrollmentPage/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
