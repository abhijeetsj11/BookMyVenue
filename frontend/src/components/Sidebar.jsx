import { Calendar, Building2, CheckCircle } from 'lucide-react';

const Sidebar = ({ activePage = 'dashboard' }) => {
  return (
    <div className="w-64 bg-gradient-to-b from-purple-600 to-purple-700 text-white p-4 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <Building2 className="text-purple-600" size={24} />
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <a 
          href="#" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activePage === 'dashboard' ? 'bg-purple-500' : 'hover:bg-purple-500'
          }`}
        >
          <Calendar size={20} />
          <span>Dashboard</span>
        </a>
        <a 
          href="#" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activePage === 'venues' ? 'bg-purple-500' : 'hover:bg-purple-500'
          }`}
        >
          <Building2 size={20} />
          <span>Venues</span>
        </a>
        <a 
          href="#" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activePage === 'book-venue' ? 'bg-purple-500' : 'hover:bg-purple-500'
          }`}
        >
          <Calendar size={20} />
          <span>Book Venue</span>
        </a>
        <a 
          href="#" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activePage === 'my-bookings' ? 'bg-purple-500' : 'hover:bg-purple-500'
          }`}
        >
          <CheckCircle size={20} />
          <span>My Bookings</span>
        </a>

        <div className="pt-6">
          <p className="text-purple-300 text-sm uppercase tracking-wider px-4 mb-2">Admin</p>
          <a 
            href="#" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activePage === 'users' ? 'bg-purple-500' : 'hover:bg-purple-500'
            }`}
          >
            <Calendar size={20} />
            <span>Users</span>
          </a>
          <a 
            href="#" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activePage === 'manage-venues' ? 'bg-purple-500' : 'hover:bg-purple-500'
            }`}
          >
            <Building2 size={20} />
            <span>Manage Venues</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
