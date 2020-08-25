import React, { Component } from 'react';
import CarouselFade from './homepage/carouselFade';
import AlbumHomePage from './homepage/albumHomePage';
import AlbumOfTheWeek from './homepage/albumOfTheWeek';
import FamousArtist from './homepage/famousArtist';
import Subscription from './homepage/subscription';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import { getAlbum } from '../services/albumServiceHomePage';
import './HomePage.scss';

class HomePage extends Component {
    state = { 
        vietnameseAlbum : [],
        internationalAlbum : [],
        albumOfTheWeek: [],
        isOpeningModal : false, 
        previewId: null,
        inPreView : false,
        windowWidth: null
    }
    
    async componentDidMount(){
        window.scrollTo(0, 0);
        this.props.onLoadingScreen();
        additionalFunctionDom.fixBody();
        const vietnameseAlbum  = await getAlbum(["5", "10", "14", "33"]);
        const internationalAlbum = await getAlbum(["6", "32", "26", "18"]);
        const albumOfTheWeek = await getAlbum(["23"]);
        const windowWidth = window.innerWidth;
        window.addEventListener("resize",this.updateWindowWidth);
        this.setState({ vietnameseAlbum, internationalAlbum, albumOfTheWeek, windowWidth});
        document.title = "QTV Music";
        setTimeout(() => {
            this.props.onLoadingScreen();
            additionalFunctionDom.releaseBody();
        },200)
    }

    updateWindowWidth = () => {
        const windowWidth = window.innerWidth;
        this.setState({ windowWidth })
    }

    render() { 
        return (
            <main className="main-container">
                <CarouselFade/>
                <AlbumHomePage 
                    title = {"Rock/Metal Việt Nam"}
                    album = {this.state.vietnameseAlbum}
                    onOpen = {this.handleOpening}
                    windowWidth ={ this.state.windowWidth }
                />
                <AlbumHomePage
                    title = {"Rock/Metal Quốc Tế"}
                    album = {this.state.internationalAlbum}
                    onOpen = {this.handleOpening}
                    windowWidth ={this.state.windowWidth}
                />
                <AlbumOfTheWeek {...this.state.albumOfTheWeek[0]}/>
                <FamousArtist windowWidth ={this.state.windowWidth}/>
                <Subscription/>
            </main>
        );
    }
}
 
export default HomePage;
