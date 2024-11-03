import React, { Suspense } from 'react';
import Link from 'next/link';
import VehicleList from '../../../../components/VehicleList';

export async function generateStaticPaths() {
    console.log('generateStaticParams called');
    try {
        const response = await fetch(
            'https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json'
        );
        if (!response.ok) {
            return [];
        }
        const data = await response.json();
        const makes = data.Results.slice(0, 10).map(make =>
            make.Make_ID.toString()
        );
        const years = Array.from({ length: 10 }, (_, i) =>
            (2015 + i).toString()
        );

        const params = makes.flatMap(makeId =>
            years.map(year => ({ makeId, year }))
        );

        return params.map(({ makeId, year }) => ({
            params: { makeId, year },
        }));
    } catch (error) {
        console.error('Error, with getting marks ', error);
        return [];
    }
}

export default async function ResultPage({ params }) {
    const { makeId, year } = params;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="title has-text-centered is-3 mb-6">
                Car models {year}:
            </h1>
            <Link href="/">
                <button className="button is-light mb-3">BACK</button>
            </Link>
            <Suspense fallback={'Loading...'}>
                <VehicleList makeId={makeId} year={year} />
            </Suspense>
        </div>
    );
}
