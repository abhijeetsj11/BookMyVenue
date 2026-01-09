import { Calendar, Building2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/bookmyvenuelogo.png';

const Sidebar = ({ activePage = 'dashboard' }) => {
  return (
    <div className="w-64 bg-gradient-to-b from-purple-600 to-purple-700 text-white p-4 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <img src={logo} alt="BookMyVenue Logo" className="h-12 w-auto" />
      </div>

      <nav className="flex-1 space-y-2">
        <Link 
          to="/dashboard" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activePage === 'dashboard' ? 'bg-purple-500' : 'hover:bg-purple-500'
          }`}
        >
          <Calendar size={20} />
          <span>Dashboard</span>
        </Link>
        <Link 
          to="/venues" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activePage === 'venues' ? 'bg-purple-500' : 'hover:bg-purple-500'
          }`}
        >
          <Building2 size={20} />
          <span>Venues</span>
        </Link>
        <Link 
          to="/book-venue" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activePage === 'book-venue' ? 'bg-purple-500' : 'hover:bg-purple-500'
          }`}
        >
          <Calendar size={20} />
          <span>Book Venue</span>
        </Link>
        <Link 
          to="/my-bookings" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activePage === 'my-bookings' ? 'bg-purple-500' : 'hover:bg-purple-500'
          }`}
        >
          <CheckCircle size={20} />
          <span>My Bookings</span>
        </Link>

        <div className="pt-6">
          <p className="text-purple-300 text-sm uppercase tracking-wider px-4 mb-2">Admin</p>
          <Link 
            to="/users" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activePage === 'users' ? 'bg-purple-500' : 'hover:bg-purple-500'
            }`}
          >
            <Calendar size={20} />
            <span>Users</span>
          </Link>
          <Link 
            to="/manage-venues" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activePage === 'manage-venues' ? 'bg-purple-500' : 'hover:bg-purple-500'
            }`}
          >
            <Building2 size={20} />
            <span>Manage Venues</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
