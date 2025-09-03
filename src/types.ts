// FIX: Import React type to resolve 'Cannot find namespace 'React'' error.
import type React from 'react';

export enum QuestionType {
  TEXT = 'text',
  NUMBER = 'number',
  RADIO = 'radio',
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}

export interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  questions: Question[];
}

export interface Answers {
  [questionId: string]: string | number;
}

export interface SurveyNotes {
  language: string;
  tehsil: string;
  observations: string;
}

export interface SurveyResponse {
  participantId: string;
  timestamp: number;
  answers: Answers;
  notes: SurveyNotes;
}