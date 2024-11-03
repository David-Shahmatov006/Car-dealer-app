import React from 'react';
import { v4 as uuidv4 } from 'uuid';

async function fetchData(makeId, year) {
    const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    const result = await response.json();
    return result.Results;
}

export default async function VehicleList({ makeId, year }) {
    const data = await fetchData(makeId, year);

    return (
        <ul
            style={{ maxHeight: '300px', overflowY: 'auto' }}
            className="box has-shadow rounded-lg p-10"
        >
            {data.map(model => (
                <li className="is-size-4" key={uuidv4()}>
                    {model.Model_Name}
                </li>
            ))}
        </ul>
    );
}
