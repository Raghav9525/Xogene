
import { ListItem, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

function DrugDetails() {
    const { drug_name } = useParams()
    const [drugDetail, setDrugDetail] = useState(null)

    useEffect(() => {
        const fetchDrugDetails = async () => {
            try {
                const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drug_name}`);
                setDrugDetail(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchDrugDetails();
    }, [drug_name])

    if (!drugDetail) {
        return <div>Loading.....</div>
    }
    return (
        <div>
            <div>Drug name</div>
            {/* <Typography variant='h4'>{drugDetail.drug_name}
            
        </Typography> */}

            {drugDetail.ndcs.map((ndc, index) => (
                <ListItem key={index}>
                    <ListItemText primary={`NDC ${index + 1}:$${ndc}`} />

                </ListItem>
            ))}
        </div>
    )
}

export default DrugDetails