import React, { Suspense } from 'react';
import Link from 'next/link';
import VehicleList from '../../../../components/VehicleList';

export async function generateStaticParams() {
    try {
        const response = await fetch(
            'https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json'
        );
        if (!response.ok) {
            throw new Error('Не удалось получить марки');
        }
        const data = await response.json();

        const makes = data.Results.slice(0, 10).map(make =>
            make.Make_ID.toString()
        );
        const years = [];

        for (let i = 2015; i <= 2024; i++) {
            years.push(i);
        }

        const params = [];
        makes.forEach(makeId => {
            years.forEach(year => {
                params.push({ makeId, year: year.toString() });
            });
        });

        return params;
    } catch (error) {
        console.error('Error with getting marks: ', error);
        return [];
    }
}

export default async function ResultPage({ params }) {
    const { makeId, year } = params;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="mb-6 text-2xl font-bold">Car models {year}:</h1>
            <Link href="/">
                <button className="rounded-lg bg-red-500 px-5 py-2 text-white hover:shadow-xl">
                    BACK
                </button>
            </Link>
            <Suspense fallback={'Loading...'}>
                <VehicleList makeId={makeId} year={year} />
            </Suspense>
        </div>
    );
}
