'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dropdown from '../components/Dropdown';

export default function FilterPage() {
    const [makes, setMakes] = useState([]);
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const years = Array.from(
        { length: new Date().getFullYear() - 2015 + 1 },
        (_, i) => 2015 + i
    );

    useEffect(() => {
        const fetchVehicleMakes = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_MAKES_URL}`
            );
            const data = await response.json();
            setMakes(
                data.Results.map(make => ({
                    value: make.MakeId,
                    label: make.MakeName,
                }))
            );
        };
        fetchVehicleMakes();
    }, []);

    return (
        <div
            className="columns is-centered is-vcentered"
            style={{ minHeight: '100vh' }}
        >
            <div className="column is-half">
                <div className="bg-light flex flex-col items-center justify-center p-4">
                    <h1
                        className="title has-text-centered is-3 mb-6"
                    >
                        Choose your Vehicle
                    </h1>
                    <div className="w-full">
                        <Dropdown
                            label="Vehicle Make:"
                            options={makes}
                            value={selectedMake}
                            onChange={e => setSelectedMake(e.target.value)}
                            placeholder="Select a make"
                        />
                        <Dropdown
                            label="Model Year:"
                            options={years.map(year => ({
                                value: year,
                                label: year,
                            }))}
                            value={selectedYear}
                            onChange={e => setSelectedYear(e.target.value)}
                            placeholder="Select a year"
                        />
                        <Link
                            href={`/result/${selectedMake}/${selectedYear}`}
                            passHref
                        >
                            <button
                                disabled={!selectedMake || !selectedYear}
                                className={`is-fullwidth button is-primary is-rounded mt-4 ${!selectedMake || !selectedYear ? 'is-disabled' : ''}`}
                            >
                                Next
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
