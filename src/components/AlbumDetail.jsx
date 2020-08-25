import React, { Component } from 'react';
import BreadCrumb from './common/breadCrumb';
import AudioPlayer from './common/audioPlayer';
import AlbumHomePage from './homepage/albumHomePage';
import { getAlbumDetail, getRelatedAlbum } from '../services/albumServiceHomePage';
import addfunc from '../ultis/additionalFunction';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import shoppingCartFunc from '../ultis/shoppingCartFunc';
import { Link } from 'react-router-dom';
import { cartAddItem } from '../store/shoppingCart';
import'./AlbumDetail.scss';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const mapStateToProps = state => ({
    shoppingCart : state.shoppingCart,
    isLogged : state.isLogged
})

const mapDispatchToProps = dispatch => ({
    cartAddItem : (item) => {
        dispatch(cartAddItem(item));
    }
})

class AlbumDetail extends Component {
    state = { 
        album :{},
        currentTab:"1",
        relatedAlbum: [],
    }

    async componentDidMount(){
        window.scrollTo(0, 0);
        this.props.onLoadingScreen();
        additionalFunctionDom.fixBody();
        const albumId = addfunc.getAlbumId(this.props.location.pathname); 
        try{
            const { data : album } = await getAlbumDetail(albumId);
            await this.setState({ album });
            const relatedAlbum  = await getRelatedAlbum(this.state.album.bandName, this.state.album.country, this.state.album.id);
            this.setState( { relatedAlbum } )
            document.title = this.state.album.albumName;
            const windowWidth = window.innerWidth;
            window.addEventListener("resize",this.updateWindowWidth);
            this.setState({ windowWidth })
            setTimeout( () => {
                this.props.onLoadingScreen();
                additionalFunctionDom.releaseBody();
            },300)  
        }
        catch(ex){
            if (ex.response && ex.response.status === 404){
                this.props.onLoadingScreen();
                additionalFunctionDom.releaseBody();
                this.props.history.replace("/khong-tim-thay")
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.componentDidMount();
            this.setState({currentTab : "1"})
        }
    }

    handleActiveTab = ({currentTarget : tab})=>{
        const currentTab = tab.getAttribute('data-button')
        this.setState({ currentTab })
    }

    handleAddToCart = () => {
        const { id, albumName, price, albumCover, bandName } = this.state.album;
        const imagePath = '/' + albumCover + '/cover.jpg';
        const MySwal = withReactContent(Swal)
        const newItem = new shoppingCartFunc.Item(id, albumName, price, imagePath, bandName);
        this.props.cartAddItem(newItem);
        shoppingCartFunc.saveShoppingCart() ;
        additionalFunctionDom.fixBody();
        MySwal.fire({
            icon: 'success',
            html: 'Đã Thêm Vào Giỏ Hàng',
            showConfirmButton: false,
            timer: 1250,
        }).then(() => {
            additionalFunctionDom.releaseBody();
        })
    }

    updateWindowWidth = () => {
        const windowWidth = window.innerWidth;
        this.setState({ windowWidth })
    }

    render() { 
        const { releaseYear,
                albumName, 
                bandName, 
                albumCover, 
                price, 
                description,
                previewSong, 
                previewSongName, 
                listSong, 
                listSongDuration} = this.state.album;

        const imagePath = '/' + albumCover + '/cover.jpg';
        const mp3Path = '/' + albumCover + '/' + previewSong;

        return ( 
            <main className="section-album-detail">
                <BreadCrumb title={albumName} titleParent="Sản Phẩm"/>
                <div className="bread-crumb-line">
                    <Link to="/">Trang Chủ</Link>  /  <Link to="/san-pham">Sản Phẩm</Link>  / {albumName}
                </div>
                <section className="section-album-detail-container d-flex justify-content-between">
                    <div className="album-cover-photo">
                        <div className="album-cover-photo-container">
                            <img src={imagePath} alt={albumName}/>
                        </div>
                    </div>
                    <div className="album-detail">
                        <h3 className="album-name">{albumName}</h3>
                        <h3 className="album-band-name">{bandName} - {releaseYear}</h3>
                        <h3 className="album-price">{price} VND</h3>
                        <AudioPlayer src ={mp3Path} songName = {previewSongName}/>
                        <div className="button-add-to-cart d-flex justify-content-center align-items-center"
                            onClick={this.handleAddToCart}
                            >Thêm Vào Giỏ Hàng
                        </div>
                        <div className="product-presentation">
                            <div className="product-presentation-header d-flex" >
                                <div className={this.state.currentTab === "1" ?
                                                "header-item d-flex justify-content-center align-items-center active-tab"
                                                :"header-item d-flex justify-content-center align-items-center "}
                                    onClick = {this.handleActiveTab}
                                    data-button ="1"
                                >
                                    Giới Thiệu
                                </div>
                                <div 
                                    className={this.state.currentTab === "2" ? 
                                                "header-item d-flex justify-content-center align-items-center active-tab"
                                                : "header-item d-flex justify-content-center align-items-center"}
                                    onClick = {this.handleActiveTab}
                                    data-button ="2"
                                >
                                    Tracklist
                                </div>
                            </div>
                            <div className="product-presentation-content">
                                <div className={this.state.currentTab === "1" ?
                                                "album-description tab-content active-tab-content"
                                                :"album-description tab-content"}>
                                    {description && description.map( (x,i) => <p key={i}>{ x }</p> )}
                                </div>
                                <div className={this.state.currentTab === "2" ?
                                                "album-track-list justify-content-between tab-content active-tab-content"
                                                :"album-track-list justify-content-between tab-content"}>
                                    <div className="album-track-list-song">
                                        {listSong && listSong.map( (x,i) => <div key={i} className="song-item d-flex justify-content-between">
                                                                                <p>{i+1}. {x}</p> <p>{addfunc.songTimeDuration(listSongDuration[i])}</p>
                                                                            </div> )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="related-album">
                    <AlbumHomePage 
                        title = {"Có Thể Bạn Cũng Thích"}
                        album = {this.state.relatedAlbum}
                        onOpen = {this.handleOpening}
                        windowWidth ={ this.state.windowWidth }
                    />
                </section>
            </main>
        );
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(AlbumDetail);
