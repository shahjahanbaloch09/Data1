
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import SurveyPage from './components/SurveyPage';
import ResponsesPage from './components/ResponsesPage';
import ResponseDetailPage from './components/ResponseDetailPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { SurveyResponse } from './types';

const Header: React.FC = () => (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link to="/" className="font-bold text-xl tracking-tight">
                        Field Research Survey Tool
                    </Link>
                </div>
            </div>
        </nav>
    </header>
);

const App: React.FC = () => {
    const [responses, setResponses] = useLocalStorage<SurveyResponse[]>('surveyResponses', []);

    const addResponse = (response: SurveyResponse) => {
        setResponses([...responses, response]);
    };

    const deleteResponse = (participantId: string) => {
        setResponses(responses.filter(r => r.participantId !== participantId));
    };

    return (
        <HashRouter>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage responses={responses} />} />
                        <Route path="/survey" element={<SurveyPage addResponse={addResponse} />} />
                        <Route path="/responses" element={<ResponsesPage responses={responses} deleteResponse={deleteResponse} />} />
                        <Route path="/responses/:id" element={<ResponseDetailPage responses={responses} />} />
                    </Routes>
                </main>
            </div>
        </HashRouter>
    );
};

export default App;
