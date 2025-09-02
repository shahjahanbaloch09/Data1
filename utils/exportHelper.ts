import type { SurveyResponse, Section } from '../types';
import { SURVEY_STRUCTURE } from '../constants';

declare const jspdf: any;

const triggerDownload = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToJson = (response: SurveyResponse) => {
  const jsonString = JSON.stringify(response, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  triggerDownload(blob, `survey-response-${response.participantId}.json`);
};

export const exportToCsv = (responses: SurveyResponse[]) => {
  const headers = [
    'participantId',
    'timestamp',
    'notes_language',
    'notes_tehsil',
    'notes_observations',
    ...SURVEY_STRUCTURE.flatMap(section => section.questions.map(q => `${section.id}_${q.id}`)),
  ];

  const rows = responses.map(response => {
    const row = [
      response.participantId,
      new Date(response.timestamp).toISOString(),
      response.notes.language,
      response.notes.tehsil,
      response.notes.observations.replace(/,/g, ';'), // Avoid CSV issues with commas
    ];
    SURVEY_STRUCTURE.forEach(section => {
      section.questions.forEach(q => {
        const answer = response.answers[q.id] || '';
        // FIX: Convert number answers to string before pushing to the row array to fix type error.
        row.push(typeof answer === 'string' ? answer.replace(/,/g, ';') : String(answer));
      });
    });
    return row.join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-t-8;' });
  triggerDownload(blob, `survey-responses-all.csv`);
};

export const exportToTextSummary = (response: SurveyResponse) => {
  let summary = `Survey Response Summary\n`;
  summary += `=========================\n\n`;
  summary += `Participant ID: ${response.participantId}\n`;
  summary += `Date: ${new Date(response.timestamp).toLocaleString()}\n\n`;

  summary += `--- Survey Notes ---\n`;
  summary += `Language: ${response.notes.language}\n`;
  summary += `Tehsil: ${response.notes.tehsil}\n`;
  summary += `Observations: ${response.notes.observations}\n\n`;

  SURVEY_STRUCTURE.forEach(section => {
    summary += `--- ${section.title} ---\n`;
    section.questions.forEach(q => {
      summary += `${q.text}: ${response.answers[q.id] || 'N/A'}\n`;
    });
    summary += `\n`;
  });

  const blob = new Blob([summary], { type: 'text/plain' });
  triggerDownload(blob, `summary-${response.participantId}.txt`);
};

export const exportToPdf = (response: SurveyResponse) => {
  const { jsPDF } = jspdf;
  const doc = new jsPDF();
  let finalY = 0; // Keep track of the last y position

  // Document Title
  doc.setFontSize(20);
  doc.text('Survey Response Summary', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
  
  // Participant Info
  doc.setFontSize(12);
  doc.text(`Participant ID: ${response.participantId}`, 14, 35);
  doc.text(`Date: ${new Date(response.timestamp).toLocaleString()}`, 14, 42);

  // Notes Section
  doc.setFontSize(16);
  doc.text('Survey Notes', 14, 55);
  (doc as any).autoTable({
    startY: 60,
    theme: 'plain',
    body: [
      ['Language:', response.notes.language],
      ['Tehsil:', response.notes.tehsil],
      ['Observations:', response.notes.observations || 'N/A'],
    ],
    columnStyles: { 0: { fontStyle: 'bold' } },
  });
  finalY = (doc as any).lastAutoTable.finalY;

  // Question Sections
  SURVEY_STRUCTURE.forEach(section => {
    doc.setFontSize(16);
    // Check for page break before adding new section title
    if (finalY + 20 > doc.internal.pageSize.getHeight()) {
        doc.addPage();
        finalY = 0; // Reset Y on new page
    }
    doc.text(section.title, 14, finalY + 15);

    const tableData = section.questions.map(q => [
        q.text,
        String(response.answers[q.id] ?? 'N/A'),
    ]);
    
    (doc as any).autoTable({
      startY: finalY + 20,
      head: [['Question', 'Answer']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133] }, // A nice teal color
      didDrawPage: () => {
        // Reset Y for content after table on new page
        finalY = 0;
      }
    });
    finalY = (doc as any).lastAutoTable.finalY;
  });

  doc.save(`survey-response-${response.participantId}.pdf`);
};