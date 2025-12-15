import React from 'react';

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css"

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { supabase } from '../supabase';

export default function Gallery({update}) {
    const [index, setIndex] = React.useState(-1);
    const [photos, setPhotos] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase.storage.from('Gallery-Bucket').list()
                if (error) throw error;

                const photoObjects = data.map((file) => ({
                    src: supabase.storage.from('Gallery-Bucket').getPublicUrl(file.name).data.publicUrl
                }));

                const imageInfo = await Promise.all(
                    photoObjects.map(
                        (file) => new Promise((resolve => {
                            //console.log("file info:", file)
                            const image = new Image();
                            image.src = file.src;
                            //console.log("Image src", file.src)
                            image.onload = () => {
                                resolve({
                                    src: file.src,
                                    width: image.width,
                                    height: image.height,
                                })
                            }

                            image.onerror = () => {
                                console.error("Failed to load Image", file.src);
                                resolve(null);
                            }
                        }))
                    )
                )

                setPhotos(imageInfo.filter(Boolean));
            } catch (error) {
                console.error("error fetching", error);
            } finally {
                setLoading(false);
            }
        }
        fetchImages();

    }, [update]);

    if (loading) return <p>Loading...</p>

	return (
		<>
            <h2> Gallery</h2>
            <div className="gallery">
                <RowsPhotoAlbum photos={photos} targetRowHeight={150} onClick={({ index }) => setIndex(index)} />
                <Lightbox
                    slides={photos}
                    open={index >= 0}
                    index={index}
                    close={() => setIndex(-1)}
                    // enable optional lightbox plugins
                    plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                />
            </div>
		</>
	)
}