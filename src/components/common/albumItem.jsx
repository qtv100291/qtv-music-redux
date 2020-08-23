import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './albumItem.scss';
import { connect } from 'react-redux';
import { openQuickViewModal } from '../../store/quickViewModal';
import additionalFunctionDom from '../../ultis/additionalFunctionDom';

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleOpenModal : () => {
        additionalFunctionDom.fixBody();
        console.log(openQuickViewModal({id : ownProps.id }))
        dispatch(openQuickViewModal({ id : ownProps.id }))
    }
})

class AlbumItem extends Component {
    render() { 
        const { id, albumName, bandName, albumCover, price} = this.props;
        const imagePath = '/' + albumCover + '/cover.jpg';
        const productPath = '/san-pham/' + (albumName && albumName.replace(/ /g, "-")) + '-' +id;
        return (
        <React.Fragment>
            <div className="album-item">
                <div className="album-photo">
                    <Link to={productPath}>
                        <img src={imagePath} alt={albumName}/>
                    </Link>
                    <div className="button-quickview d-flex justify-content-center align-items-center" onClick = {this.props.handleOpenModal}>Xem Nhanh</div>
                </div>
                <h3 className="album-name">
                    <Link to={productPath}>
                        {albumName}
                    </Link>
                </h3>
                <h3 className="album-band-name">{bandName}</h3>
                <h3 className="album-price">{price} VND</h3>
            </div>
        </React.Fragment>
        );
    }
}

export default connect(null,mapDispatchToProps)(AlbumItem);


