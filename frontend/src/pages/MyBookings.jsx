import { useEffect, useMemo, useState } from 'react';
import { Building2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { bookingsApi } from '../lib/api';

const MyBookings = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await bookingsApi.myBookings();
        setBookings(res?.data || []);
      } catch (e) {
        setError(e?.message || 'Failed to load bookings');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filterCategories = ['All', 'Pending', 'Approved', 'Rejected'];

  const formatStatus = (status) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatType = (type) => {
    if (!type) return '';
    return type
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  const formatPurpose = (purpose) => {
    if (!purpose) return '';
    return purpose.charAt(0).toUpperCase() + purpose.slice(1);
  };

  const filteredBookings = useMemo(() => {
    return bookings
      .map((b) => {
        const start = b?.startTime ? new Date(b.startTime) : null;
        const end = b?.endTime ? new Date(b.endTime) : null;

        const date = start ? start.toLocaleDateString() : '';
        const time =
          start && end
            ? `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
            : '';

        const statusLabel = formatStatus(b?.status);

        return {
          id: b?._id,
          venue: b?.venue?.name || 'Unknown Venue',
          subtitle: formatType(b?.venue?.type),
          date,
          time,
          purpose: formatPurpose(b?.purpose),
          status: statusLabel,
          purposeColor: b?.status === 'approved' ? 'green' : 'orange',
        };
      })
      .filter((booking) => {
        if (activeFilter === 'All') return true;
        return booking.status === activeFilter;
      });
  }, [bookings, activeFilter]);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-600';
      case 'Approved':
        return 'bg-green-100 text-green-600';
      case 'Rejected':
        return 'bg-red-100 text-red-600';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-600';
      case 'Completed':
        return 'bg-blue-100 text-blue-600';
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
      
      <div className="flex-1 overflow-auto pt-20 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400 mb-2">My Bookings</h1>
              <p className="text-gray-500 text-sm">Track your extra class and event booking requests.</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {filterCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 sm:px-6 py-2 rounded-full transition duration-200 font-medium whitespace-nowrap text-sm sm:text-base ${
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
          {error ? (
            <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
              {error}
            </div>
          ) : null}

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Table Header - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="text-sm font-semibold text-gray-500">Venue</div>
              <div className="text-sm font-semibold text-gray-500">Date & Time</div>
              <div className="text-sm font-semibold text-gray-500">Purpose</div>
              <div className="text-sm font-semibold text-gray-500">Status</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {loading ? (
                <div className="px-6 py-8 text-center text-gray-500">Loading bookings…</div>
              ) : (
                filteredBookings.map(booking => (
                  <div key={booking.id}>
                    {/* Desktop View */}
                    <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4 hover:bg-gray-50 transition duration-150">
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

                  {/* Mobile View - Card Format */}
                  <div className="md:hidden p-4 hover:bg-gray-50 transition">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="text-purple-500" size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 mb-1">{booking.venue}</div>
                        <div className="text-sm text-gray-500">{booking.subtitle}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="space-y-2 ml-15">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Date:</span>
                        <span className="text-gray-800 font-medium">{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Time:</span>
                        <span className="text-gray-600">{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${getPurposeColor(booking.purposeColor)}`}></div>
                        <span className="text-gray-700">{booking.purpose}</span>
                      </div>
                    </div>
                  </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* No results message */}
          {!loading && filteredBookings.length === 0 && (
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
