
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { SurveyResponse } from '../types';
import { exportToCsv, exportToExcel } from '../utils/exportHelper';

interface ResponsesPageProps {
  responses: SurveyResponse[];
  deleteResponse: (participantId: string) => void;
}

const ResponsesPage: React.FC<ResponsesPageProps> = ({ responses, deleteResponse }) => {
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const handleDelete = (participantId: string) => {
    deleteResponse(participantId);
    setShowConfirm(null);
  };
  
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Collected Responses</h1>
            <p className="text-lg text-gray-600 mt-2">{responses.length} response(s) found.</p>
          </div>
          <div className="flex space-x-2 mt-4 sm:mt-0">
             <Link to="/" className="px-5 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg text-base hover:bg-gray-100 transition-colors">
              Back to Home
            </Link>
            <button 
              onClick={() => exportToCsv(responses)} 
              disabled={responses.length === 0}
              className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg text-base disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              Export All as CSV
            </button>
             <button 
              onClick={() => exportToExcel(responses)} 
              disabled={responses.length === 0}
              className="px-5 py-3 bg-green-600 text-white font-bold rounded-lg text-base disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-opacity"
            >
              Export All as Excel
            </button>
          </div>
        </header>

        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full mx-4">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this response? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button onClick={() => setShowConfirm(null)} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Cancel</button>
                <button onClick={() => handleDelete(showConfirm)} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">Delete</button>
              </div>
            </div>
          </div>
        )}

        <main className="space-y-4">
          {responses.length > 0 ? (
            [...responses].reverse().map(response => (
              <div key={response.participantId} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-grow">
                  <p className="font-bold text-lg text-blue-700">{response.participantId}</p>
                  <p className="text-sm text-gray-500">
                    Collected on: {new Date(response.timestamp).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Location (Tehsil): {response.notes.tehsil}
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <Link to={`/responses/${response.participantId}`} className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-lg text-sm hover:bg-blue-200 transition-colors">
                    View Details
                  </Link>
                  <button onClick={() => setShowConfirm(response.participantId)} className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">No responses yet</h3>
              <p className="mt-1 text-gray-500">Start a new survey to collect data.</p>
              <Link to="/survey" className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                Start New Survey
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ResponsesPage;