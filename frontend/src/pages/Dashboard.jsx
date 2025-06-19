import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { fetchSessions, fetchBookings, bookSession, cancelBooking } from '../services/api';

function Dashboard() {
  const user = useAuth();
  const [sessions, setSessions] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;
    load();
  }, [user]);

  const load = async () => {
    const [s, b] = await Promise.all([fetchSessions(), fetchBookings()]);
    setSessions(s.data);
    setBookings(b.data);
  };

  if (!user) return <p className="text-center mt-8">Loading user info...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome {user.name}</h1>

      {user.role === 'trainer' && (
        <div className="bg-yellow-100 text-yellow-800 p-4 mb-4 rounded">
          🏀 You are logged in as a trainer.
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Available Sessions</h2>
      <div className="space-y-2">
        {sessions.map((s) => (
          <div key={s.id} className="border p-4 flex justify-between items-center rounded">
            <div>
              <p>{s.title}</p>
              <p className="text-sm text-gray-600">{s.date} at {s.time}</p>
            </div>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              disabled={bookings.find(b => b.session_id === s.id)}
              onClick={async () => {
                await bookSession(s.id);
                load();
              }}
            >
              {bookings.find(b => b.session_id === s.id) ? 'Booked' : 'Book'}
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">My Bookings</h2>
      <div className="space-y-2">
        {bookings.map(b => (
          <div key={b.id} className="border p-4 flex justify-between items-center rounded">
            <div>
              <p>{b.title}</p>
              <p className="text-sm text-gray-600">{b.date} at {b.time}</p>
            </div>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={async () => {
                await cancelBooking(b.id);
                load();
              }}
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
