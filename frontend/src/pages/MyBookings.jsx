import { useState } from 'react';
import { Building2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const MyBookings = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Sample bookings data
  const bookings = [
    {
      id: 1,
      venue: 'Room 101',
      subtitle: 'Classroom',
      date: 'Apr 22, 2024',
      time: '10:00 AM - 11:00 AM',
      purpose: 'Extra Class',
      status: 'Pending',
      purposeColor: 'orange'
    },
    {
      id: 2,
      venue: 'Computer Lab 1',
      subtitle: 'Lab Session',
      date: 'Apr 20, 2024',
      time: '3:00 PM - 5:00 PM',
      purpose: 'Group Study',
      status: 'Approved',
      purposeColor: 'green'
    },
    {
      id: 3,
      venue: 'Auditorium',
      subtitle: 'Guest Lecture',
      date: 'Apr 18, 2024',
      time: '2:00 PM - 4:00 PM',
      purpose: 'Guest Lecture',
      status: 'Rejected',
      purposeColor: 'green'
    },
    {
      id: 4,
      venue: 'Lecture Theater A',
      subtitle: 'Workshop',
      date: 'Apr 17, 2024',
      time: '9:00 AM - 11:00 AM',
      purpose: 'Workshop',
      status: 'Approved',
      purposeColor: 'orange'
    },
    {
      id: 5,
      venue: 'Science Lab',
      subtitle: 'Lab Practical',
      date: 'Apr 15, 2024',
      time: '11:00 AM - 12:00 PM',
      purpose: 'Extra Class',
      status: 'Rejected',
      purposeColor: 'orange'
    },
    {
      id: 6,
      venue: 'Tutorial Room 1',
      subtitle: 'Study Session',
      date: 'Apr 14, 2024',
      time: '2:00 PM - 3:30 PM',
      purpose: 'Group Study',
      status: 'Approved',
      purposeColor: 'green'
    },
    {
      id: 7,
      venue: 'Room 203',
      subtitle: 'Classroom',
      date: 'Apr 12, 2024',
      time: '1:00 PM - 2:00 PM',
      purpose: 'Extra Class',
      status: 'Pending',
      purposeColor: 'orange'
    },
  ];

  const filterCategories = ['All', 'Pending', 'Approved', 'Rejected'];

  const filteredBookings = bookings.filter(booking => {
    if (activeFilter === 'All') return true;
    return booking.status === activeFilter;
  });

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-600';
      case 'Approved':
        return 'bg-green-100 text-green-600';
      case 'Rejected':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPurposeColor = (color) => {
    return color === 'orange' ? 'bg-orange-400' : 'bg-green-400';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="my-bookings" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold text-purple-400 mb-2">My Bookings</h1>
              <p className="text-gray-500 text-sm">Track your extra class and event booking requests.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full overflow-hidden">
                <img 
                  src="https://via.placeholder.com/48" 
                  alt="User" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3 mb-8 mt-6">
            {filterCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full transition duration-200 font-medium ${
                  activeFilter === category
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-white text-gray-500 hover:bg-purple-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="text-sm font-semibold text-gray-500">Venue</div>
              <div className="text-sm font-semibold text-gray-500">Date & Time</div>
              <div className="text-sm font-semibold text-gray-500">Purpose</div>
              <div className="text-sm font-semibold text-gray-500">Status</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {filteredBookings.map(booking => (
                <div key={booking.id} className="grid grid-cols-4 gap-4 px-6 py-4 hover:bg-gray-50 transition duration-150">
                  {/* Venue */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="text-purple-500" size={24} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{booking.venue}</div>
                      <div className="text-sm text-gray-500">{booking.subtitle}</div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex flex-col justify-center">
                    <div className="text-gray-800 font-medium">{booking.date}</div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </div>

                  {/* Purpose */}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getPurposeColor(booking.purposeColor)}`}></div>
                    <span className="text-gray-700">{booking.purpose}</span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* No results message */}
          {filteredBookings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl">
              <p className="text-gray-500 text-lg">No bookings found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
