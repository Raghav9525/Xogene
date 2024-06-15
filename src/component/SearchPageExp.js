import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function SearchPageExp() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);  // State to handle dropdown visibility
    const [suggestions, setSuggestions] = useState([]); // State to handle suggestions
    const navigate = useNavigate();
    
    const handleSearch = async (event) => {
        event.preventDefault();  // Prevent form submission from reloading the page
        try {
            const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchTerm}`);
            const data = response.data.drugGroup.conceptGroup || [];

            if (data.length) {
                const allConceptProperties = data.flatMap(group => group.conceptProperties || []);
                console.log(allConceptProperties);
                setResults(allConceptProperties);
                setDropdownOpen(true); // Open the dropdown after the search
                setSuggestions([]); // Clear suggestions if there are results
            } else {
                const suggestionsResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${searchTerm}`);
                const suggestionsList = suggestionsResponse.data.suggestionGroup.suggestionList.suggestion;

                if (suggestionsList && suggestionsList.length) {
                    setError(`Did you mean: ${suggestionsList.join(', ')}?`);
                    setSuggestions(suggestionsList);
                    setDropdownOpen(false); // Close results dropdown
                } else {
                    setError('No results found.');
                    setSuggestions([]);
                    setDropdownOpen(false); // Close results dropdown
                }
            }
        } catch (err) {
        console.log(err);
        setError('An error occurred. Please try again.');
    }
};

function handleChange(e) {
    setSearchTerm(e.target.value);
}

function medicineDetail(drug_name, drug_full_name) {
    console.log("Selected Medicine:", drug_name);

    console.log("drug_full_name",drug_full_name)

    navigate('/drugs', { state: { drug_name, drug_full_name } });

    // You can perform further actions here with the selected item
}

return (
    <div className="container">
        <div className="row justify-content-center mt-5">
            <div className="col-md-6">
                <div className="card" style={{border:"none"}}>
                    <div className="card-body text-center">
                        <h3 className="card-title">SEARCH FOR DRUG</h3>

                        <form className="d-flex mt-4" onSubmit={handleSearch}>
                            <input type="text" className="form-control  mr-2"
                                onChange={handleChange}
                                value={searchTerm}
                                placeholder="Enter Drug Name"
                            />
                            <button className="btn btn-primary">Submit</button>
                        </form>

                        {dropdownOpen && (
                            <div className="dropdown mt-3 w-100">
                                <ul className="dropdown-menu show w-100" style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                    {results.map((item, index) => (
                                        <li key={index} className="dropdown-item" onClick={() => medicineDetail(searchTerm,item.name)}>
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {suggestions.length > 0 && (
                            <div className="dropdown mt-3 w-100">
                                <ul className="dropdown-menu show w-100" style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index} className="dropdown-item" onClick={() => setSearchTerm(suggestion)}>
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default SearchPageExp;
