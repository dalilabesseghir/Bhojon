import React from 'react';
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import Features from './Features';
import Hero from './Hero';

const HomePage = () => {
    const [loading, setLoading] = useState(true);

    // set website title
    useWebsiteTitle('Home')

    const onLoadEffect = () => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    useEffect(onLoadEffect, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <Hero />
            <Features />
        </div>
    );
};

export default HomePage;