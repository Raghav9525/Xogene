import { ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DrugDetails() {
    console.log("hiii")
  const { drug_name } = useParams();
  const [drugDetail, setDrugDetail] = useState(null);
  const [ndcs, setNdcs] = useState([]);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drug_name}`);
        console.log(response)
        const rxcui = response.data.idGroup.rxnormId[0];

        if (rxcui) {
          const detailResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/properties.json`);
          setDrugDetail(detailResponse.data.properties);

          const ndcsResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs.json`);
          setNdcs(ndcsResponse.data.ndcGroup.ndcList.ndc);
        } else {
          setDrugDetail(null);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDrugDetails();
  }, [drug_name]);

  if (!drugDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h4">{drugDetail.name}</Typography>
      <Typography variant="h6">RXCUI: {drugDetail.rxcui}</Typography>
      <Typography variant="h6">Synonyms: {drugDetail.synonym}</Typography>
      <div>
        <Typography variant="h6">NDCs:</Typography>
        {ndcs.map((ndc, index) => (
          <ListItem key={index}>
            <ListItemText primary={`NDC ${index + 1}: ${ndc}`} />
          </ListItem>
        ))}
      </div>
    </div>
  );
}

export default DrugDetails;
