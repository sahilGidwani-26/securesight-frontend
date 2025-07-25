'use client';
import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/incidents')
      .then((res) => res.json())
      .then((data) => setIncidents(data))
      .catch((err) => console.error("Error fetching incidents:", err));
  }, []);

  const handleResolve = async (id) => {
    await fetch(`http://localhost:4000/api/incidents/${id}/resolve`, { method: 'PATCH' });
    setIncidents((prev) => prev.filter((i) => i.id !== id));
  };

  const threatColors = {
    "Unauthorized Access": "bg-red-500",
    "Gun Threat": "bg-orange-500",
    "Face Recognised": "bg-green-500",
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      <div className="bg-white shadow-md p-4 rounded-xl mb-4 text-2xl font-bold">
        SecureSight Dashboard
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-screen-xl mx-auto">
        {/* Incident Player */}
        <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-xl shadow-md">
          <div className="text-xl font-semibold mb-2">Incident Player</div>
          <div className="aspect-video bg-black rounded-md">
            <img src="/placeholder.png" alt="Incident video" className="w-full h-full object-cover rounded-md" />
          </div>
          <div className="flex gap-2 mt-4">
            <img src="/cam1.png" alt="thumb1" className="w-20 h-16 object-cover rounded-md" />
            <img src="/cam2.png" alt="thumb2" className="w-20 h-16 object-cover rounded-md" />
          </div>
        </div>

        {/* Incident List */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="text-xl font-semibold mb-4">Active Incidents</div>
          {incidents.length === 0 ? (
            <div className="text-gray-500">No unresolved incidents.</div>
          ) : (
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="flex items-start justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition">
                  <div className="flex gap-3">
                    <img src="/public/thumbnail.png" alt="thumbnail" className="w-20 h-16 object-cover rounded" />
                    <div>
                      <div className="font-bold">{incident.type}</div>
                      <div className="text-sm text-gray-500">{incident.cameraLocation}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(incident.tsStart).toLocaleTimeString()} - {new Date(incident.tsEnd).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className={`text-white px-2 py-1 rounded text-xs mb-2 ${threatColors[incident.type] || 'bg-gray-400'}`}>
                      {incident.type}
                    </div>
                    <button
                      onClick={() => handleResolve(incident.id)}
                      className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
