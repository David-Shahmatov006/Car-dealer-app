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
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="mb-6 text-2xl font-bold">Choose your Vehicle</h1>
            <div className="w-full max-w-md space-y-4">
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
                <Link href={`/result/${selectedMake}/${selectedYear}`} passHref>
                    <button
                        disabled={!selectedMake || !selectedYear}
                        className="mt-4 w-full rounded-md bg-blue-500 py-2 text-white disabled:bg-gray-400"
                    >
                        Next
                    </button>
                </Link>
            </div>
        </div>
    );
}
