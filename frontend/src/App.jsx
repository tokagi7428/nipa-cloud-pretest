import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import TicketForm from './pages/TicketForm/TicketForm';
import TicketFormEdit from './pages/TicketFormEdit/TicketFormEdit';

function App() {

  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/ticketForm/:id' element={<TicketForm />} />
        <Route path='/ticketForm/edit/:id' element={<TicketFormEdit />} />
      </Routes>
    </div>
  )
}

export default App
