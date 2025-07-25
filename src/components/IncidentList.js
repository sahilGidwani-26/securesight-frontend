'use client';
import { useEffect, useState } from 'react';

export default function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch('http://localhost:4000/api/incidents')
    .then((res) => res.json())
    .then((data) => {
      console.log('Fetched incidents:', data);
      setIncidents(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching incidents:', err);
      setLoading(false);
    });
}, []);


  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-white mb-4">Active Incidents</h2>

      {loading ? (
        <p className="text-white">Loading active incidents...</p>
      ) : incidents.length === 0 ? (
        <p className="text-gray-500">No unresolved incidents.</p>
      ) : (
        <ul className="space-y-2">
          {incidents.map((incident) => (
            <li
              key={incident.id}
              className="bg-gray-800 text-white p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
              onClick={() => onSelectIncident(incident)}
            >
              <p className="text-sm text-gray-400">
                {new Date(incident.timestamp).toLocaleString()}
              </p>
              <p className="text-lg font-bold">{incident.type}</p>
              <p className="text-sm">Camera: {incident.camera}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
