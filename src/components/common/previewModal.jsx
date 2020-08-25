import React, {Component} from 'react';
import { getAlbumDetail } from '../../services/albumServiceHomePage';
// import AudioPlayer from '../common/audioPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import shoppingCartFunc from '../../ultis/shoppingCartFunc';
import './previewModal.scss'
import { createRef } from 'react';
import loadingIconSmall from '../../assets/homepage-assets/loading-icon-small.gif';
import { connect } from 'react-redux';
import additionalFunctionDom from '../../ultis/additionalFunctionDom';
import { closeQuickViewModal } from '../../store/quickViewModal';
import { cartAddItem } from '../../store/shoppingCart';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const mapStateToProps = state => ({
    isOpeningModal : state.quickViewModal.isOpening,
    quickViewId : state.quickViewModal.quickViewId,
})

const mapDispatchToProps = dispatch => ({
    handleCloseModal : () => {
        additionalFunctionDom.releaseBody();
        dispatch(closeQuickViewModal())
    },
    cartAddItem : (item) => {
        dispatch(cartAddItem(item));
    }
})

class PreviewModal extends Component {
    state = { 
        album :{},
        isLoading: false
    }

    myModal = createRef();

    async componentDidUpdate(prevProps) {
        if (this.props.quickViewId !== prevProps.quickViewId){
            if (this.props.quickViewId === null) return
            this.setState({ isLoading : true })
            const {data : album} = await getAlbumDetail(this.props.quickViewId);
            this.setState({ album });
            this.myModal.current.scrollTo (0,0);
            this.setState({ isLoading : false })
        }
    }

    handleAddToCart = async () => {
        const { id, albumName, price, albumCover, bandName } = this.state.album;
        const imagePath = '/' + albumCover + '/cover.jpg';
        const MySwal = withReactContent(Swal)
        const newItem = new shoppingCartFunc.Item(id, albumName, price, imagePath, bandName);
        this.props.cartAddItem(newItem);
        this.props.handleCloseModal(); 
        additionalFunctionDom.fixBody();
        shoppingCartFunc.saveShoppingCart()
        MySwal.fire({
            icon: 'success',
            html: 'Đã Thêm Vào Giỏ Hàng',
            showConfirmButton: false,
            timer: 1250,
        }).then(() => {
            additionalFunctionDom.releaseBody();
        })
    }

    

    render() { 
        const {
            id,
            albumName, 
            bandName, 
            albumCover, 
            price, 
            // previewSong, 
            // previewSongName, 
            description,} = this.state.album;
        const { isLoading } = this.state
        const imagePath = '/' + albumCover + '/cover.jpg';
        // const mp3Path = '/' + albumCover + '/' + previewSong;
        const productPath = '/san-pham/' + (albumName && albumName.replace(/ /g, "-")) + '-' +id;
        return ( 
            <div className={this.props.isOpeningModal ?  
                            "preview-modal active-mode" 
                            : "preview-modal"}
                > 
                <div className="preview-modal-container d-flex justify-content-between align-items-center" >
                    <div className={isLoading? "loading-screen-modal" : "loading-screen-modal turn-off"}>
                        <img src={loadingIconSmall} alt="loading icon"/>
                    </div>
                    <div className="close-button d-flex justify-content-center align-items-center" onClick={this.props.handleCloseModal}><FontAwesomeIcon icon="times-circle"/></div>
                    <div className="preview-modal-photo">
                        <img src={imagePath} alt={albumName}/>
                    </div>
                    <div className="preview-modal-content" ref={this.myModal}>
                        <Link to={productPath} onClick={this.props.handleCloseModal}>
                            <h3 className="album-name">{albumName}</h3>
                        </Link>
                        <h3 className="album-band-name">{bandName}</h3>
                        <h3 className="album-price">{price} VND</h3>
                        {/* <AudioPlayer src ={mp3Path} songName = {previewSongName} inPreView={this.props.inPreView}/> */}
                        <div className="button-add-to-cart d-flex justify-content-center align-items-center"
                            onClick={this.handleAddToCart}
                            >
                            Thêm Vào Giỏ Hàng</div>
                        <div className="preview-modal-presentation">
                            <h4 className="preview-modal-presentation-title">Giới Thiệu : </h4>
                            <div className="album-description">
                                {description && description.map( (x,i) => <p key={i}>{ x }</p> )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(PreviewModal);