import React, { Component } from 'react';
import CarouselFade from './homepage/carouselFade';
import AlbumHomePage from './homepage/albumHomePage';
import AlbumOfTheWeek from './homepage/albumOfTheWeek';
import FamousArtist from './homepage/famousArtist';
import Subscription from './homepage/subscription';
import PreviewModal from './common/previewModal';
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
        window.addEventListener("resize",this.updateWindowWidth)
        this.setState({ vietnameseAlbum, internationalAlbum, albumOfTheWeek, windowWidth});
        document.title = "QTV Music";
        this.props.onLoadingScreen();
        additionalFunctionDom.releaseBody();
  
    }

    handleOpening = id => {
        additionalFunctionDom.fixBody();
        this.setState({ isOpeningModal : true, previewId : id, inPreView: true });
    }

    handleClose = () => {
        additionalFunctionDom.releaseBody();
        this.setState({ isOpeningModal : false, previewId: null, inPreView : false });
    }

    updateWindowWidth = () => {
        const windowWidth = window.innerWidth;
        this.setState({ windowWidth })
    }

    render() { 
        return (
            <main className="main-container">
                <PreviewModal   isOpeningModal = {this.state.isOpeningModal} 
                                previewId = {this.state.previewId}
                                onClose={this.handleClose}
                                inPreView = {this.state.inPreView}
                                updateShoppingCart={this.props.updateShoppingCart}
                />
                <CarouselFade/>
                <AlbumHomePage 
                    title = {"Rock/Metal Việt Nam"}
                    album = {this.state.vietnameseAlbum}
                    key = {"homepage-1"}
                    onOpen = {this.handleOpening}
                    windowWidth ={ this.state.windowWidth }
                />
                <AlbumHomePage
                    title = {"Rock/Metal Quốc Tế"}
                    album = {this.state.internationalAlbum}
                    key = {"homepage-2"}
                    onOpen = {this.handleOpening}
                    windowWidth ={ this.state.windowWidth }
                />
                <AlbumOfTheWeek {...this.state.albumOfTheWeek[0]}/>
                <FamousArtist windowWidth ={ this.state.windowWidth }/>
                <Subscription/>
            </main>
         );
    }
}
 
export default HomePage;
