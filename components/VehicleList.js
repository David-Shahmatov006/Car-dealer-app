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

    if (!data || data.length === 0) {
        return <p>Sorry, but no data for the selected brand and year =(</p>;
    }

    return (
        <ul className="max-h-[300px] overflow-y-auto rounded-lg p-10 shadow-xl">
            {data.map(model => (
                <li className="text-xl" key={uuidv4()}>
                    {model.Model_Name}
                </li>
            ))}
        </ul>
    );
}
