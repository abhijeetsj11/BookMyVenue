import { useState } from 'react';
import { Search, Plus, ChevronDown } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import VenueCard from '../components/VenueCard';

const Venues = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample venue data
  const venues = [
    { id: 1, name: 'Room 101', capacity: 30, status: 'Available', type: 'classroom' },
    { id: 2, name: 'Room 102', capacity: 40, status: 'Occupied', type: 'classroom' },
    { id: 3, name: 'Room 203', capacity: 30, status: 'Available', type: 'classroom' },
    { id: 4, name: 'Auditorium', capacity: 200, status: 'Available', type: 'auditorium' },
    { id: 5, name: 'Computer Lab 1', capacity: 40, status: 'Available', type: 'lab' },
    { id: 6, name: 'Computer Lab 2', capacity: 30, status: 'Occupied', type: 'lab' },
    { id: 7, name: 'Lecture Theater A', capacity: 100, status: 'Available', type: 'lecture-theater' },
    { id: 8, name: 'Lecture Theater B', capacity: 120, status: 'Occupied', type: 'lecture-theater' },
    { id: 9, name: 'Tutorial Room 1', capacity: 15, status: 'Available', type: 'tutorial-room' },
    { id: 10, name: 'Tutorial Room 2', capacity: 20, status: 'Available', type: 'tutorial-room' },
    { id: 11, name: 'Science Lab', capacity: 35, status: 'Occupied', type: 'lab' },
    { id: 12, name: 'Tutorial Room 3', capacity: 18, status: 'Available', type: 'tutorial-room' },
  ];

  const filterCategories = ['All', 'Classroom', 'Lab', 'Auditorium', 'Lecture Theater', 'Tutorial Room'];

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || 
      (activeFilter === 'Classroom' && venue.type === 'classroom') ||
      (activeFilter === 'Lab' && venue.type === 'lab') ||
      (activeFilter === 'Auditorium' && venue.type === 'auditorium') ||
      (activeFilter === 'Lecture Theater' && venue.type === 'lecture-theater') ||
      (activeFilter === 'Tutorial Room' && venue.type === 'tutorial-room');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="venues" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-5xl font-bold text-purple-700">Venues</h1>
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

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-8">
            <div className="flex gap-3">
              {filterCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 rounded-full transition duration-200 font-medium ${
                    activeFilter === category
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Venue Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map(venue => (
              <VenueCard
                key={venue.id}
                name={venue.name}
                capacity={venue.capacity}
                status={venue.status}
                type={venue.type}
              />
            ))}
          </div>

          {/* No results message */}
          {filteredVenues.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No venues found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Venues;
