
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SurveyResponse, Answers, SurveyNotes, Question } from '../types';
import { QuestionType } from '../types';
import { SURVEY_STRUCTURE, NoteIcon } from '../constants';

interface SurveyPageProps {
  addResponse: (response: SurveyResponse) => void;
}

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 my-4">
      <div
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const QuestionCard: React.FC<{ question: Question, value: string | number, onChange: (id: string, value: string | number) => void, error: boolean }> = ({ question, value, onChange, error }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm mb-4 border-2 ${error ? 'border-red-400' : 'border-transparent'}`}>
      <label className="block text-lg font-semibold text-gray-800 mb-3">
        {question.text} {question.required && <span className="text-red-500">*</span>}
      </label>
      {question.type === QuestionType.TEXT && (
        <input
          type="text"
          value={value as string || ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500"
        />
      )}
      {question.type === QuestionType.NUMBER && (
        <input
          type="number"
          value={value as number || ''}
          onChange={(e) => onChange(question.id, e.target.valueAsNumber || '')}
          className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500"
        />
      )}
      {question.type === QuestionType.RADIO && (
        <div className="space-y-3">
          {question.options?.map(option => (
            <label key={option} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={value === option}
                onChange={(e) => onChange(question.id, e.target.value)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-lg text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">This field is required.</p>}
    </div>
  );
};

const SurveyPage: React.FC<SurveyPageProps> = ({ addResponse }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [notes, setNotes] = useState<SurveyNotes>({ language: '', tehsil: '', observations: '' });
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const totalSections = SURVEY_STRUCTURE.length;
  const isNotesSection = currentSectionIndex === totalSections;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSectionIndex]);

  const handleAnswerChange = (questionId: string, value: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (errors.includes(questionId)) {
      setErrors(prev => prev.filter(err => err !== questionId));
    }
  };
  
  const validateSection = () => {
    if (isNotesSection) {
        const noteErrors = [];
        if (!notes.language) noteErrors.push('language');
        if (!notes.tehsil) noteErrors.push('tehsil');
        if (noteErrors.length > 0) {
            setErrors(noteErrors);
            return false;
        }
        return true;
    }

    const currentQuestions = SURVEY_STRUCTURE[currentSectionIndex].questions;
    const missingFields = currentQuestions
      .filter(q => q.required && (answers[q.id] === undefined || answers[q.id] === ''))
      .map(q => q.id);
    
    setErrors(missingFields);
    return missingFields.length === 0;
  };

  const handleNext = () => {
    if (validateSection()) {
      if(currentSectionIndex < totalSections) {
        setCurrentSectionIndex(prev => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    setErrors([]);
    setCurrentSectionIndex(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateSection()) {
      const newResponse: SurveyResponse = {
        participantId: `P-${Date.now()}`,
        timestamp: Date.now(),
        answers,
        notes,
      };
      addResponse(newResponse);
      navigate('/');
    }
  };

  const currentSection = !isNotesSection ? SURVEY_STRUCTURE[currentSectionIndex] : null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-4">
          <ProgressBar current={currentSectionIndex} total={totalSections + 1} />
          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
             <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg text-white">
                {isNotesSection ? <NoteIcon className="w-8 h-8"/> : React.createElement(currentSection!.icon, { className: "w-8 h-8" })}
             </div>
             <div>
                <h1 className="text-3xl font-bold text-gray-800">{isNotesSection ? "Survey Notes" : currentSection!.title}</h1>
                <p className="text-gray-500">Section {currentSectionIndex + 1} of {totalSections + 1}</p>
             </div>
          </div>
        </header>
        
        <main className="mt-8">
          {isNotesSection ? (
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-2">Language of Interview <span className="text-red-500">*</span></label>
                    <input type="text" value={notes.language} onChange={e => setNotes({...notes, language: e.target.value})} className={`w-full p-3 border rounded-lg text-lg focus:ring-2 focus:ring-blue-500 ${errors.includes('language') ? 'border-red-400' : 'border-gray-300'}`} />
                    {errors.includes('language') && <p className="text-red-500 text-sm mt-2">This field is required.</p>}
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-2">Geographic Location (Tehsil) <span className="text-red-500">*</span></label>
                    <input type="text" value={notes.tehsil} onChange={e => setNotes({...notes, tehsil: e.target.value})} className={`w-full p-3 border rounded-lg text-lg focus:ring-2 focus:ring-blue-500 ${errors.includes('tehsil') ? 'border-red-400' : 'border-gray-300'}`} />
                     {errors.includes('tehsil') && <p className="text-red-500 text-sm mt-2">This field is required.</p>}
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-2">Additional Observations (Optional)</label>
                    <textarea value={notes.observations} onChange={e => setNotes({...notes, observations: e.target.value})} rows={5} className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
              </div>
          ) : (
            <div>
              {currentSection?.questions.map(q => (
                <QuestionCard key={q.id} question={q} value={answers[q.id]} onChange={handleAnswerChange} error={errors.includes(q.id)} />
              ))}
            </div>
          )}
        </main>
        
        <footer className="mt-8 flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentSectionIndex === 0}
            className="px-8 py-4 bg-gray-300 text-gray-800 font-bold rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
          >
            Previous
          </button>
          
          {currentSectionIndex < totalSections ? (
            <button onClick={handleNext} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg text-lg hover:opacity-90 transition-opacity">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg text-lg hover:opacity-90 transition-opacity">
              Submit Survey
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default SurveyPage;
