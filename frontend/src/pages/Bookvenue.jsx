import { useState } from 'react';
import { Calendar, Clock, MapPin, FileText, Send } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Bookvenue = () => {
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('11:00');
  const [purpose, setPurpose] = useState('Extra Class');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Request submitted', { venue, date, startTime, endTime, purpose, notes });
    // TODO: wire to API
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden">
      <Sidebar activePage="book-venue" />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-6">
            <div>
              <h1 className="text-3xl font-bold text-purple-600">Book a Venue</h1>
              <p className="text-sm text-gray-600 mt-1">Fill out the form below to request a venue for your extra class or event.</p>
            </div>
          </header>

          <section className="bg-white shadow-lg rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Venue */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Venue</label>
                <div className="flex items-center gap-2">
                  <MapPin className="text-purple-500" />
                  <select
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="flex-1 py-3 px-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <option value="">Select Venue</option>
                    <option value="Auditorium">Auditorium</option>
                    <option value="Seminar Hall">Seminar Hall</option>
                    <option value="Room 203">Room 203</option>
                    <option value="Library">Library</option>
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-purple-500" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="flex-1 py-3 px-3 border border-gray-200 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start</label>
                  <div className="flex items-center gap-2">
                    <Clock className="text-purple-500" />
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="flex-1 py-3 px-3 border border-gray-200 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End</label>
                  <div className="flex items-center gap-2">
                    <Clock className="text-purple-500" />
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="flex-1 py-3 px-3 border border-gray-200 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
                <div className="flex items-center gap-2">
                  <FileText className="text-purple-500" />
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="flex-1 py-3 px-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <option>Extra Class</option>
                    <option>Guest Lecture</option>
                    <option>Workshop</option>
                    <option>Meeting</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes <span className="text-xs text-gray-400">(optional)</span></label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg bg-gray-50"
                  placeholder="Any special requirements or notes"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition"
                >
                  <Send size={16} />
                  Submit Request
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Bookvenue;
