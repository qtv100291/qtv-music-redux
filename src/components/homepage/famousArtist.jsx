import React from 'react';
import SwiperSliderArtist from './swiperSliderArtist';

const FamousArtist = ( { windowWidth } ) => {
    return ( 
        <section className="album-section">
            <div className="album-title d-flex align-items-center">
                <div className = "title-point"></div>
                <h2>Nghệ Sĩ Nổi Bật</h2>
            </div>
            <SwiperSliderArtist windowWidth ={ windowWidth }/>
        </section> 
     );
}
 
export default FamousArtist;