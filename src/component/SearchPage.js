
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState();
  const [results, setResults] = useState([]);
  const [error, serError] = useState('')
  const navigate = useNavigate()

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${searchTerm}`);
      console.log(response.data)
      setResults(response.data)


    } catch (err) {
      console.log(err)
    }
  }

  const handleSelectDrug = (drug) => {
    navigate(`/drug/${drug.name}`)
  }
  return (
    <div>
      <TextField
        label="Search Drug Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>search</Button>
      {error && <div>{error}</div>}
      <List>
        {results.map((drug) => (
          <ListItem button key={drug.rxcui} onClick={() => handleSelectDrug(drug)}>
            <ListItemText>{drug.name}</ListItemText>
          </ListItem>
        ))}
      </List>

    </div>
  )
}

export default SearchPage