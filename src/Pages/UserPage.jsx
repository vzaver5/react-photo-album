import React from 'react';

import Navbar from '../Components/Navbar';
import Gallery from '../Components/Gallery';
    
export default function UserPage() {
    const [update] = React.useState(true);
    return (
        <>
            <Navbar></Navbar>
            <Gallery update={update}></Gallery>
        </>
    )
}