(() => {
    // --- HELPERS ---
    const weightedRandom = (choices) => {
        const total = choices.reduce((acc, choice) => acc + choice.weight, 0);
        let random = Math.random() * total;
        for (const choice of choices) {
            if (random < choice.weight) return choice.value;
            random -= choice.weight;
        }
    };
    const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // --- DATA POOLS ---
    const femaleNames = ['Fatima', 'Ayesha', 'Zainab', 'Noor', 'Sana', 'Hira', 'Sadia', 'Rabia', 'Maria', 'Amna', 'Sobia', 'Iqra', 'Nida', 'Saman', 'Kiran', 'Mehwish', 'Farah', 'Alina', 'Sehrish', 'Uzma'];
    const occupations = ['Housewife', 'Housewife', 'Housewife', 'Farm worker', 'Seamstress', 'Laborer'];
    const tehsils = ['Awaran', 'Jhal Jhao', 'Mashkai', 'Gishkore'];
    const languages = ['Balochi', 'Urdu', 'Brahui'];
    const observations = [
        'Respondent was hesitant to discuss income.',
        'Family members were present and influenced some answers.',
        'Respondent seemed distrustful of the questions.',
        'Interview was interrupted multiple times by children.',
        'Respondent expressed frustration with local health services.',
        '', '', '', ''
    ];

    const generateResponse = (index) => {
        const timestamp = Date.now() - (100 - index) * 1000 * 60 * 60 * randomInt(18, 30); // Spread over last ~100 days
        
        return {
            participantId: `SYNTH-P-${timestamp}-${index}`,
            timestamp: timestamp,
            answers: {
                // Demographic
                name: randomChoice(femaleNames),
                age: randomInt(20, 45),
                gender: 'Female',
                education_level: weightedRandom([{ value: 'No formal education', weight: 60 }, { value: 'Primary', weight: 30 }, { value: 'Secondary', weight: 10 }]),
                occupation: randomChoice(occupations),
                monthly_income: weightedRandom([{ value: '<15,000 PKR', weight: 75 }, { value: '15,000-30,000 PKR', weight: 20 }, { value: '>30,000 PKR', weight: 5 }]),
                children_under_2: randomInt(1, 3),
                youngest_child_age: `${randomInt(2, 23)} months`,

                // Geographic
                distance_to_center: weightedRandom([{ value: '>5 km', weight: 75 }, { value: '2-5 km', weight: 20 }, { value: '<2 km', weight: 5 }]),
                transport_mode: weightedRandom([{ value: 'Walk', weight: 50 }, { value: 'Public transport', weight: 30 }, { value: 'Motorbike', weight: 20 }]),
                travel_cost: randomInt(50, 500),
                services_regular: weightedRandom([{ value: 'No', weight: 80 }, { value: 'Yes', weight: 20 }]),
                mobile_team_visit: weightedRandom([{ value: 'No', weight: 70 }, { value: 'Yes', weight: 30 }]),
                seasonal_access: weightedRandom([{ value: 'No', weight: 85 }, { value: 'Yes', weight: 15 }]),
                nomadic_difficulties: weightedRandom([{ value: 'Yes', weight: 60 }, { value: 'No', weight: 40 }]),
                enough_centers_remote: weightedRandom([{ value: 'No', weight: 90 }, { value: 'Yes', weight: 10 }]),
                geo_challenges: weightedRandom([{ value: 'Yes', weight: 80 }, { value: 'No', weight: 20 }]),
                transport_barrier: weightedRandom([{ value: 'Yes', weight: 85 }, { value: 'No', weight: 15 }]),

                // Awareness
                know_vaccine_purpose: weightedRandom([{ value: 'No', weight: 75 }, { value: 'Yes', weight: 25 }]),
                vaccine_info_source: weightedRandom([{ value: 'Lady Health Worker', weight: 40 }, { value: 'Family', weight: 30 }, { value: 'Religious leader', weight: 20 }, { value: 'Health facility', weight: 10 }]),
                vaccine_safety_belief: weightedRandom([{ value: 'No', weight: 50 }, { value: 'Not sure', weight: 30 }, { value: 'Yes', weight: 20 }]),
                language_barrier: weightedRandom([{ value: 'Yes', weight: 60 }, { value: 'No', weight: 40 }]),
                heard_rumors: weightedRandom([{ value: 'Yes', weight: 70 }, { value: 'No', weight: 30 }]),
                awareness_campaigns: weightedRandom([{ value: 'No', weight: 80 }, { value: 'Yes', weight: 20 }]),
                know_schedule: weightedRandom([{ value: 'No', weight: 60 }, { value: 'Partially', weight: 30 }, { value: 'Yes', weight: 10 }]),
                received_reminders: weightedRandom([{ value: 'No', weight: 95 }, { value: 'Yes', weight: 5 }]),

                // Cultural
                cultural_discouragement: weightedRandom([{ value: 'Yes', weight: 60 }, { value: 'No', weight: 40 }]),
                gender_differential_treatment: weightedRandom([{ value: 'Yes', weight: 40 }, { value: 'No', weight: 60 }]),
                religious_leaders_opinion: weightedRandom([{ value: 'Oppose', weight: 30 }, { value: 'Neutral', weight: 40 }, { value: 'Support', weight: 30 }]),
                male_permission_needed: weightedRandom([{ value: 'Yes', weight: 85 }, { value: 'No', weight: 15 }]),
                traditional_healers_influence: weightedRandom([{ value: 'Yes', weight: 50 }, { value: 'No', weight: 50 }]),
                tribal_customs_affect: weightedRandom([{ value: 'Yes', weight: 60 }, { value: 'No', weight: 40 }]),
                vaccines_against_religion: weightedRandom([{ value: 'Yes', weight: 50 }, { value: 'No', weight: 50 }]),
                older_family_members_support: weightedRandom([{ value: 'Discourage', weight: 40 }, { value: 'Neutral', weight: 30 }, { value: 'Support', weight: 30 }]),

                // Health System
                rate_health_worker_behavior: weightedRandom([{ value: 'Poor', weight: 50 }, { value: 'Fair', weight: 30 }, { value: 'Good', weight: 20 }]),
                service_hours_convenient: weightedRandom([{ value: 'No', weight: 70 }, { value: 'Yes', weight: 30 }]),
                refused_services: weightedRandom([{ value: 'Yes', weight: 50 }, { value: 'No', weight: 50 }]),
                trust_govt_vaccines: weightedRandom([{ value: 'No', weight: 60 }, { value: 'Not sure', weight: 25 }, { value: 'Yes', weight: 15 }]),
                experienced_stock_outs: weightedRandom([{ value: 'Yes', weight: 75 }, { value: 'No', weight: 25 }]),
                recommend_vaccination: weightedRandom([{ value: 'No', weight: 60 }, { value: 'Yes', weight: 40 }]),
            },
            notes: {
                language: randomChoice(languages),
                tehsil: randomChoice(tehsils),
                observations: randomChoice(observations),
            }
        };
    };

    const generatedResponses = [];
    for (let i = 0; i < 100; i++) {
        generatedResponses.push(generateResponse(i));
    }

    window.syntheticData = generatedResponses;
})();
