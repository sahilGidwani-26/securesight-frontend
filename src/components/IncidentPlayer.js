// components/IncidentPlayer.js
'use client';
import { useState, useEffect } from 'react';

export default function IncidentPlayer({ incident }) {
  if (!incident) {
    return (
      <div className="p-4 text-gray-500">
        <p>Select an incident to view details.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border-r border-gray-300 min-w-[300px] bg-gray-50 h-full">
      <h2 className="text-xl font-semibold mb-4">Incident Player</h2>
      <div className="bg-black text-white text-center mb-3 h-40 flex items-center justify-center">
        {/* Fake Video/Image */}
        <span>📹 CCTV Footage</span>
      </div>
      <h3 className="text-lg font-semibold">{incident.threat_type}</h3>
      <p className="text-sm text-gray-600">🕒 {new Date(incident.timestamp).toLocaleString()}</p>
      <p className="text-sm text-gray-600 mt-1">📷 Camera ID: {incident.camera_id}</p>
      <p className="text-sm mt-2 text-green-600">{incident.resolved ? "Resolved" : "Unresolved"}</p>
    </div>
  );
}
