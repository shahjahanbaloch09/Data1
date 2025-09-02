
import type { Section } from './types';
import { QuestionType } from './types';

// SVG Icon Components
export const UserIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const MapPinIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const MegaphoneIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </svg>
);

export const UsersIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const BuildingLibraryIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  </svg>
);

export const NoteIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);


export const SURVEY_STRUCTURE: Section[] = [
  {
    id: 'demographic',
    title: 'DEMOGRAPHIC INFORMATION',
    icon: UserIcon,
    questions: [
      { id: 'name', text: 'Name of respondent', type: QuestionType.TEXT, required: false },
      { id: 'age', text: 'Age', type: QuestionType.NUMBER, required: true },
      { id: 'gender', text: 'Gender', type: QuestionType.RADIO, options: ['Male', 'Female'], required: true },
      { id: 'education_level', text: 'Education level', type: QuestionType.RADIO, options: ['No formal education', 'Primary', 'Secondary', 'Higher'], required: true },
      { id: 'occupation', text: 'Occupation', type: QuestionType.TEXT, required: true },
      { id: 'monthly_income', text: 'Monthly household income', type: QuestionType.RADIO, options: ['<15,000 PKR', '15,000-30,000 PKR', '>30,000 PKR'], required: true },
      { id: 'children_under_2', text: 'Total number of children under 2 years', type: QuestionType.NUMBER, required: true },
      { id: 'youngest_child_age', text: 'Age of youngest child', type: QuestionType.TEXT, required: true },
    ],
  },
  {
    id: 'geographic',
    title: 'GEOGRAPHIC AND ACCESS BARRIERS',
    icon: MapPinIcon,
    questions: [
      { id: 'distance_to_center', text: 'Distance to nearest vaccination center', type: QuestionType.RADIO, options: ['<2 km', '2-5 km', '>5 km'], required: true },
      { id: 'transport_mode', text: 'Mode of transport to vaccination center', type: QuestionType.RADIO, options: ['Walk', 'Motorbike', 'Public transport', 'Private car'], required: true },
      { id: 'travel_cost', text: 'Average cost of travel to vaccination center', type: QuestionType.NUMBER, required: true },
      { id: 'services_regular', text: 'Are vaccination services available regularly in your area?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
      { id: 'mobile_team_visit', text: 'Have you been visited by a mobile vaccination team?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
      { id: 'seasonal_access', text: 'Are vaccination centers accessible during monsoon/winter seasons?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
      { id: 'nomadic_difficulties', text: 'Do nomadic families in your area face difficulties accessing vaccination?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
      { id: 'enough_centers_remote', text: 'Are there enough vaccination centers in remote areas of Awaran?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
      { id: 'geo_challenges', text: 'Do geographical challenges prevent regular vaccination services?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
      { id: 'transport_barrier', text: 'Is transportation a major barrier to vaccination in your area?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
    ],
  },
  {
    id: 'awareness',
    title: 'AWARENESS AND INFORMATION SOURCES',
    icon: MegaphoneIcon,
    questions: [
      { id: 'know_vaccine_purpose', text: 'Do you know the purpose of each vaccine given to children?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
      { id: 'vaccine_info_source', text: 'Main source of vaccine information', type: QuestionType.RADIO, options: ['Lady Health Worker', 'Health facility', 'Media', 'Religious leader', 'Family'], required: true },
      { id: 'vaccine_safety_belief', text: 'Do you believe vaccines are safe for children?', type: QuestionType.RADIO, options: ['Yes', 'No', 'Not sure'], required: true },
      { id: 'language_barrier', text: 'Do you face language barriers when health workers explain vaccines?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
      { id: 'heard_rumors', text: 'Have you heard rumors or misconceptions about vaccines?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
      { id: 'awareness_campaigns', text: 'Are there awareness campaigns about vaccination in your area?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
      { id: 'know_schedule', text: 'Do you know the complete vaccination schedule for children under 2 years?', type: QuestionType.RADIO, options: ['Yes', 'No', 'Partially'], required: true },
      { id: 'received_reminders', text: 'Have you ever received SMS or phone reminders for vaccination?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
    ],
  },
  {
    id: 'cultural',
    title: 'CULTURAL AND RELIGIOUS FACTORS',
    icon: UsersIcon,
    questions: [
        { id: 'cultural_discouragement', text: 'Are there cultural beliefs in your community that discourage vaccination?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
        { id: 'gender_differential_treatment', text: 'Do families in Awaran treat vaccination differently for boys and girls?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
        { id: 'religious_leaders_opinion', text: 'What do religious leaders in your community say about vaccination?', type: QuestionType.RADIO, options: ['Support', 'Oppose', 'Neutral'], required: true },
        { id: 'male_permission_needed', text: 'Do women need male family member\'s permission for child vaccination?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
        { id: 'traditional_healers_influence', text: 'Are there traditional healers who influence vaccination decisions?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
        { id: 'tribal_customs_affect', text: 'Do tribal customs affect vaccination acceptance in your area?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
        { id: 'vaccines_against_religion', text: 'Have you heard that vaccines are against religious beliefs?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
        { id: 'older_family_members_support', text: 'Do older family members support or discourage vaccination?', type: QuestionType.RADIO, options: ['Support', 'Discourage', 'Neutral'], required: true },
    ],
  },
  {
    id: 'health_system',
    title: 'HEALTH SYSTEM AND SERVICE QUALITY',
    icon: BuildingLibraryIcon,
    questions: [
        { id: 'rate_health_worker_behavior', text: 'How would you rate the behavior of health workers during vaccination?', type: QuestionType.RADIO, options: ['Good', 'Fair', 'Poor'], required: true },
        { id: 'service_hours_convenient', text: 'Are vaccination service hours convenient for your family?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
        { id: 'refused_services', text: 'Have you ever been refused vaccination services?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
        { id: 'trust_govt_vaccines', text: 'Do you trust vaccines provided at government health centers?', type: QuestionType.RADIO, options: ['Yes', 'No', 'Not sure'], required: true },
        { id: 'experienced_stock_outs', text: 'Have you experienced vaccine stock-outs at health facilities?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
        { id: 'recommend_vaccination', text: 'Would you recommend vaccination to other parents in Awaran?', type: QuestionType.RADIO, options: ['Yes', 'No'], required: true },
    ],
  },
];
