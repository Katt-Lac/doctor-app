const BASE_URL = 'https://randomuser.me';

const diagnoses = [
    "Flu",
    "Diabetes",
    "High Blood Pressure",
    "Asthma",
    "Allergy",
    "Migraine",
    "Bronchitis",
    "Back Pain",
    "Depression",
    "Urinary Tract Infection"
];

function getRandomDiagnosis() {
    const index = Math.floor(Math.random() * diagnoses.length);
    return diagnoses[index];
}

export async function getPatients(count = 30) {
    const res = await fetch(`${BASE_URL}/api/?results=${count}`);
    const data = await res.json();
    return data.results.map(p => {
        const fullName = `${p.name.first} ${p.name.last}`;
        const birthDate = p.dob.date;
        const address = `${p.location.city}, ${p.location.country}`;
        const picture = p.picture.large;

        return {
            id: p.login.uuid,
            name: fullName,
            birthDate: birthDate,
            address: address,
            picture: picture,
            diagnosis: getRandomDiagnosis(),
            raw: p // povodný objekt pre detail
        };
    });
}

export async function getPatientById(id) {
    const res = await fetch(`${BASE_URL}/Patient/${id}`);
    return res.json();
}

export async function getConditionsByPatientId(patientId) {
    const res = await fetch(`${BASE_URL}/Condition?patient=${patientId}`);
    const data = await res.json();
    return data.entry?.map(e => e.resource) || [];
}
