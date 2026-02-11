import { Calendar, Building2, CheckCircle, LogOut, LayoutDashboard, ClipboardList, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/bookmyvenuelogo.png';

const Sidebar = ({ activePage = 'dashboard' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Check if user should see specific menu items
  const canBookVenue = user?.role === 'staff' || user?.role === 'admin';
  const isAdmin = user?.role === 'admin';

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2">
          <img src={logo} alt="BookMyVenue Logo" className="h-8 w-auto" />
          <span className="text-lg font-bold">BookMyVenue</span>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-purple-500 rounded-lg transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full
        w-64 bg-gradient-to-b from-purple-600 to-purple-700 text-white p-4 flex flex-col
        transform transition-transform duration-300 ease-in-out z-50
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center gap-3 mb-6 mt-16 lg:mt-0">
          <img src={logo} alt="BookMyVenue Logo" className="h-12 w-auto" />
          <span className="text-xl font-bold text-white">BookMyVenue</span>
        </div>

      <nav className="flex-1 space-y-2">
        <Link 
          to="/dashboard"
          onClick={handleLinkClick}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activePage === 'dashboard' ? 'bg-purple-500' : 'hover:bg-purple-500'
          }`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link 
          to="/venues"
          onClick={handleLinkClick}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activePage === 'venues' ? 'bg-purple-500' : 'hover:bg-purple-500'
          }`}
        >
          <Building2 size={20} />
          <span>Venues</span>
        </Link>
        
        {canBookVenue && (
          <>
            <Link 
              to="/book-venue"
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activePage === 'book-venue' ? 'bg-purple-500' : 'hover:bg-purple-500'
              }`}
            >
              <Calendar size={20} />
              <span>Book Venue</span>
            </Link>
            <Link 
              to="/my-bookings"
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activePage === 'my-bookings' ? 'bg-purple-500' : 'hover:bg-purple-500'
              }`}
            >
              <CheckCircle size={20} />
              <span>My Bookings</span>
            </Link>
          </>
        )}

        {isAdmin && (
          <div className="pt-6">
            <p className="text-purple-300 text-sm uppercase tracking-wider px-4 mb-2">Admin</p>
            <Link 
              to="/manage-venues"
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activePage === 'manage-venues' ? 'bg-purple-500' : 'hover:bg-purple-500'
              }`}
            >
              <Building2 size={20} />
              <span>Manage Venues</span>
            </Link>
            <Link 
              to="/manage-bookings"
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activePage === 'manage-bookings' ? 'bg-purple-500' : 'hover:bg-purple-500'
              }`}
            >
              <ClipboardList size={20} />
              <span>Booking Requests</span>
            </Link>
          </div>
        )}
      </nav>

      {/* User Info & Logout Button */}
      <div className="mt-auto pt-4 border-t border-purple-500">
        {user && (
          <div className="px-4 py-2 mb-2">
            <p className="text-sm text-purple-200">Logged in as</p>
            <p className="text-white font-medium truncate">{user.email}</p>
            <p className="text-xs text-purple-300 capitalize">{user.role}</p>
          </div>
        )}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-purple-500 text-white w-full"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
