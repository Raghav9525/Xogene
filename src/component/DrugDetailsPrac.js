import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function DrugDetailsPrac() {
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [filteredDrug, setFilteredDrug] = useState(null); // State to store the filtered drug

    const location = useLocation();
    const { drug_name, drug_full_name } = location.state || {};

    console.log(drug_name, drug_full_name)



    // const drug_full_name = "{3 (azithromycin 500 MG Oral Tablet [Zithromax]) } Pack [TRI-PAK]";
    // const drug_name = 'azithromycin';

    useEffect(() => {
        const fetchDrugs = async () => {
            try {
                console.log(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${drug_name}`);
                const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${drug_name}`);
                console.log(response.data);

                const data = response.data.drugGroup.conceptGroup || [];
                const allConceptProperties = data.flatMap(group => group.conceptProperties || []);
                console.log(allConceptProperties);

                // Filter results to find the matching drug name
                const matchingDrug = allConceptProperties.find(drug => drug.name === drug_full_name);
                if (matchingDrug) {
                    setFilteredDrug(matchingDrug);
                } else {
                    setError('No matching drug found.');
                }

                setResults(allConceptProperties); // Optional: Store all results if needed elsewhere

            } catch (err) {
                console.log(err);
                setError('An error occurred. Please try again.');
            }
        };

        fetchDrugs(); // Call the async function within useEffect
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className='container'>

            <div className="row mt-5 ">
                <div className="col-md-6 card m-auto ">
                    <h3 className='text-center'>DRUG DETAILS</h3>
                    {filteredDrug ? (
                        <div className='text-center mt-3'>
                            <h6 className='mt-3'><strong>Id:</strong> {filteredDrug.rxcui}</h6>
                            <h6 className='mt-3'><strong>Name:</strong> {filteredDrug.name}</h6>
                            <h6 className='mt-3'><strong>Synonym:</strong> {filteredDrug.synonym}</h6>
                        </div>
                    ) : (
                        <p>{error}</p>
                    )}

                </div>
            </div>

        </div>
    );
}

export default DrugDetailsPrac
