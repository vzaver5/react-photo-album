import React from 'react';
import Navbar from '../Components/Navbar';
import Gallery from '../Components/Gallery';
import UploadButton from '../Components/UploadButton';

export default function AdminUploadPage() {
    const [update, setUpdate] = React.useState(true);
    return (
        <>
            <Navbar></Navbar>
            <Gallery update={update}></Gallery>
            <UploadButton setUpdate={setUpdate}></UploadButton>
        </>
    )
}