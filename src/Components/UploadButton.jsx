import React from 'react';
import { supabase } from '../supabase';
export default function UploadButton({ setUpdate }) {

    const inputRef = React.useRef();

    const handleClick = () => {
        inputRef.current.click();
    }

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
            console.log("No upload files");
        }
        try {
            await Promise.all(
                files.map(async (file) => {
                    try {
                        //console.log("working on", file);
                        const { error } = await supabase.storage.from('Gallery-Bucket').upload(file.name, file);
                        if (error) throw error;
                        //console.log("Uploaded file", file);
                    }
                    catch (error) {
                        console.error("Upload Failed for", file.name, error.message);
                    }
                })
            );
        } catch (err) {
            console.error('Some error', err);
        } finally {
            setUpdate(prev => !prev);
        }
    }

    return (
        <>
            <button type="button" onClick={handleClick} className="browse-btn">Upload File</button>
            <input
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                style={{ display: "none" }}
            />
        </>
    )
}