import { useState } from 'react';
import { Search, Plus, Edit, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const ManageVenue = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    capacity: '',
    location: ''
  });
  const itemsPerPage = 6;

  // Venue data with state
  const [venues, setVenues] = useState([
    { id: 1, name: 'Room 305', type: 'Classroom', capacity: 30, location: '1st Floor, Building A', icon: '📚' },
    { id: 2, name: 'Auditorium', type: 'Auditorium', capacity: 150, location: 'Main Building', icon: '🎭' },
    { id: 3, name: 'Chemistry Lab', type: 'Lab', capacity: 25, location: '2nd Floor, Science Center', icon: '🔬' },
    { id: 4, name: 'Seminar Hall', type: 'Lecture Hall', capacity: 80, location: '2nd Floor, Building B', icon: '🎓' },
    { id: 5, name: 'Computer Lab', type: 'Lab', capacity: 40, location: '1st Floor, Building C', icon: '💻' },
    { id: 6, name: 'Library', type: 'Library', capacity: 100, location: 'Main Building', icon: '📖' },
    { id: 7, name: 'Room 101', type: 'Classroom', capacity: 30, location: '1st Floor, Building A', icon: '📚' },
    { id: 8, name: 'Room 102', type: 'Classroom', capacity: 40, location: '1st Floor, Building A', icon: '📚' },
    { id: 9, name: 'Room 203', type: 'Classroom', capacity: 30, location: '2nd Floor, Building A', icon: '📚' },
    { id: 10, name: 'Computer Lab 2', type: 'Lab', capacity: 35, location: '2nd Floor, Building C', icon: '💻' },
  ]);

  // Filter venues based on search query
  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venue.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVenues = filteredVenues.slice(startIndex, endIndex);

  const handleEdit = (id) => {
    console.log('Edit venue:', id);
    // Handle edit logic
  };

  const handleDelete = (id) => {
    console.log('Delete venue:', id);
    // Handle delete logic
  };

  const handleAddVenue = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({ name: '', type: '', capacity: '', location: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitVenue = (e) => {
    e.preventDefault();
    
    // Get icon based on type
    const getIcon = (type) => {
      switch(type) {
        case 'Classroom': return '📚';
        case 'Lab': return '🔬';
        case 'Auditorium': return '🎭';
        case 'Lecture Hall': return '🎓';
        case 'Library': return '📖';
        case 'Seminar Hall': return '🎤';
        default: return '🏢';
      }
    };

    // Create new venue object
    const newVenue = {
      id: venues.length > 0 ? Math.max(...venues.map(v => v.id)) + 1 : 1,
      name: formData.name,
      type: formData.type,
      capacity: parseInt(formData.capacity),
      location: formData.location,
      icon: getIcon(formData.type)
    };

    // Add venue to the list
    setVenues([...venues, newVenue]);
    
    // Close modal and reset form
    handleCloseModal();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="manage-venues" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header Section */}
          <div className="mb-2">
            <div>
              <h1 className="text-4xl font-bold text-purple-700 mb-2">Manage Venues</h1>
              <p className="text-gray-600">Add, edit, or remove venues from your campus venue management system.</p>
            </div>
          </div>

          {/* Search and Add Button */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button 
              onClick={handleAddVenue}
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition duration-200 font-medium shadow-md"
            >
              <Plus size={20} />
              <span>Add Venue</span>
            </button>
          </div>

          {/* Venues Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600 uppercase tracking-wider">
              <div className="col-span-4">Venue</div>
              <div className="col-span-2">Capacity</div>
              <div className="col-span-3">Location</div>
              <div className="col-span-3 text-right">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {currentVenues.map((venue) => (
                <div 
                  key={venue.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-purple-50 transition duration-150 items-center"
                >
                  {/* Venue Name & Type */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                      {venue.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{venue.name}</div>
                      <div className="text-sm text-gray-500">{venue.type}</div>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="col-span-2 text-gray-700 font-medium">
                    {venue.capacity}
                  </div>

                  {/* Location */}
                  <div className="col-span-3 text-gray-600">
                    {venue.location}
                  </div>

                  {/* Actions */}
                  <div className="col-span-3 flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleEdit(venue.id)}
                      className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-200 text-sm font-medium"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(venue.id)}
                      className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition duration-200 text-sm font-medium"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredVenues.length)} of {filteredVenues.length} Venues
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-lg font-medium transition duration-200 ${
                    currentPage === index + 1
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-purple-100'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* No results message */}
          {filteredVenues.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm mt-8">
              <p className="text-gray-500 text-lg">No venues found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Venue Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-700">Add New Venue</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitVenue} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Number/Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Room 305"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="Classroom">Classroom</option>
                  <option value="Lab">Lab</option>
                  <option value="Auditorium">Auditorium</option>
                  <option value="Lecture Hall">Lecture Hall</option>
                  <option value="Library">Library</option>
                  <option value="Seminar Hall">Seminar Hall</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="e.g., 30"
                  min="1"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., 1st Floor, Building A"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition font-medium shadow-md"
                >
                  Add Venue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVenue;
