import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${searchTerm}`);
      console.log(response)
      const data = response.data.idGroup.rxnormId;

      if (data && data.length) {
        setError('');
        const drugDetails = await Promise.all(
          data.map(async (rxcui) => {
            const detailResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/properties.json`);
            return detailResponse.data.properties;
          })
        );
        setResults(drugDetails);
      } else {
        const suggestionsResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${searchTerm}`);
        const suggestions = suggestionsResponse.data.suggestionGroup.suggestionList.suggestion;

        if (suggestions && suggestions.length) {
          setError(`Did you mean: ${suggestions.join(', ')}?`);
        } else {
          setError('No results found.');
        }
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred. Please try again.');
    }
  };

  const handleSelectDrug = (drug) => {
    navigate(`/drugs/${drug.name}`);
  };

  return (
    <div>
      <TextField
        label="Search Drug Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button onClick={handleSearch}>Search</Button>
      {error && <div>{error}</div>}
      <List>
        {results.map((drug) => (
          <ListItem button key={drug.rxcui} onClick={() => handleSelectDrug(drug)}>
            <ListItemText primary={drug.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SearchPage;
