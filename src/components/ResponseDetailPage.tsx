import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import type { SurveyResponse } from '../types';
import { SURVEY_STRUCTURE } from '../constants';
import { exportToJson, exportToTextSummary, exportToPdf } from '../utils/exportHelper';

interface ResponseDetailPageProps {
  responses: SurveyResponse[];
}

const ResponseDetailPage: React.FC<ResponseDetailPageProps> = ({ responses }) => {
  const { id } = useParams<{ id: string }>();
  const response = responses.find(r => r.participantId === id);

  if (!response) {
    return <Navigate to="/responses" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Response Details</h1>
          <p className="text-lg text-gray-600 mt-2">
            Participant ID: <span className="font-semibold text-blue-700">{response.participantId}</span>
          </p>
          <p className="text-md text-gray-500">
            Collected on: {new Date(response.timestamp).toLocaleString()}
          </p>
        </header>

        <div className="sticky top-0 bg-slate-50 py-4 z-10 -mx-4 px-4 border-b mb-6">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                <Link to="/responses" className="px-5 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg text-base hover:bg-gray-100 transition-colors">
                    &larr; Back to List
                </Link>
                <div className="flex items-center space-x-2">
                    <button onClick={() => exportToPdf(response)} className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">PDF</button>
                    <button onClick={() => exportToTextSummary(response)} className="px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">TXT</button>
                    <button onClick={() => exportToJson(response)} className="px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">JSON</button>
                </div>
            </div>
        </div>

        <main className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                </div>
                Survey Notes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                <div><strong className="text-gray-600 font-medium">Language:</strong> {response.notes.language}</div>
                <div><strong className="text-gray-600 font-medium">Tehsil:</strong> {response.notes.tehsil}</div>
                <div className="col-span-1 md:col-span-2"><strong className="text-gray-600 font-medium">Observations:</strong> {response.notes.observations || 'N/A'}</div>
            </div>
          </section>

          {SURVEY_STRUCTURE.map(section => (
            <section key={section.id} className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-md mr-3">
                    {React.createElement(section.icon, { className: "w-6 h-6" })}
                </div>
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.questions.map(q => (
                  <div key={q.id} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b last:border-b-0">
                    <p className="text-gray-600 sm:w-2/3">{q.text}</p>
                    <p className="font-semibold text-gray-900 text-left sm:text-right mt-1 sm:mt-0">{String(response.answers[q.id] ?? 'Not answered')}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default ResponseDetailPage;