import React, { Component } from 'react';
import FilterContent from './product/filterContent';
import BreadCrumb from './common/breadCrumb';
import AlbumItem from './common/albumItem';
import Dropdown from 'react-bootstrap/Dropdown';
import PaginationBasic from './common/pagination';
import { getAllAlbum } from '../services/albumServiceHomePage';
import addfunc from '../ultis/additionalFunction';
import { Link } from 'react-router-dom';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import './Product.scss';

class Product extends Component {
    state = { 
        vietnameseFilter: [],
        internationalFilter : [],
        album : [],
        selectedFilterValue : null,
        selectedValueSort : "Tên Từ A Đến Z",
        sortOrderBy : "Tên Từ A Đến Z",
        albumPerPage : 12,
        currentPage : 1,
        isModalShowing: false
     }

    async componentDidMount() {
        window.scrollTo(0, 0);
        this.props.onLoadingScreen();
        additionalFunctionDom.fixBody();
        const { data : albumRaw } = await getAllAlbum();
        const album = addfunc.sortAToZ(albumRaw);
        const vietnameseFilter = addfunc.filterMusic("Việt Nam", album);
        const internationalFilter = addfunc.filterMusic("Quốc Tế", album);
        const selectedFilterValue = this.props.location.state ? this.props.location.state.band : null;
        this.setState({vietnameseFilter, internationalFilter, album, selectedFilterValue});
        document.title = `Sản Phẩm`;
        setTimeout( () => {
            this.props.onLoadingScreen();
            additionalFunctionDom.releaseBody();
        },500) 
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.location.state !== this.props.location.state){
            this.setState({selectedFilterValue : null});
            return
        }
        if (prevState.selectedFilterValue !== this.state.selectedFilterValue && this.state.selectedFilterValue === null){
            this.setState({selectedFilterValue : null});
        }
    }

    handleSort = sortValue => {
        this.setState({selectedValueSort : sortValue, sortOrderBy : sortValue, currentPage : 1})
    }

    handlePageChange = page => {
        if (page === this.state.currentPage) return
        this.setState( { currentPage : page })
        document.documentElement.classList.add('on-top');
        setTimeout(() => window.scrollTo(0,0),100);
    }

    handlePreviousPage = () => {
        const previousPage = this.state.currentPage
        if ( previousPage === 1 ) return;
        const pageNow = previousPage - 1;
        this.setState({ currentPage : pageNow });
        document.documentElement.classList.add('on-top');
        setTimeout(() => window.scrollTo(0,0),100);
    }

    handleNextPage = maxPage => {
        const previousPage = this.state.currentPage
        if ( previousPage === maxPage ) return;
        const pageNow = previousPage + 1;
        this.setState({ currentPage : pageNow });
        document.documentElement.classList.add('on-top');
        setTimeout(() => window.scrollTo(0,0),100);
    }

    handleFilter = filterValue => {
        const previousFilterValue = this.state.selectedFilterValue;
        const filterValueEnd =  (filterValue === previousFilterValue) ? null : filterValue
        this.setState({
                        selectedFilterValue : filterValueEnd, 
                        currentPage : 1, 
                        selectedValueSort : "Tên Từ A Đến Z",
                        sortOrderBy : "Tên Từ A Đến Z", 
                    })
        this.setState( { isModalShowing : false })
    }

    handleCloseFilter = () => {
        this.setState( { isModalShowing : false })
    }

    handleShow = () => {
        this.setState( { isModalShowing : true })
    }

    render() { 
        const { album , sortOrderBy, albumPerPage, currentPage, selectedFilterValue } = this.state;
        const filteredAlbum = addfunc.productFilter( album, selectedFilterValue )
        const totalAlbum = filteredAlbum.length;
        const sortedAlbum = addfunc.productSortBy( filteredAlbum , sortOrderBy);
        const albumDisplay = addfunc.albumDisplay( totalAlbum, currentPage, albumPerPage, sortedAlbum )

        return ( 
            <main className="product-section">
                <Modal show={this.state.isModalShowing} onHide={this.handleCloseFilter}>
                    <Modal.Header closeButton>
                    <Modal.Title>Bộ Lọc</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FilterContent 
                            filterList ={this.state.vietnameseFilter} 
                            filterValue = {selectedFilterValue}
                            onFilter={this.handleFilter}
                        />
                        <FilterContent 
                            filterList ={this.state.internationalFilter} 
                            filterValue = {selectedFilterValue}
                            onFilter={this.handleFilter}
                        />
                    </Modal.Body>
                </Modal>
                <div className="bread-crumb-line">
                    <Link to="/">Trang Chủ</Link>  /  Sản Phẩm
                </div>
                <BreadCrumb titleParent="Sản Phẩm"/>
                <div className="product-section-container d-flex justify-content-between">
                    <section className="filter-part">
                        <h3 className="filter-part-title">Bộ Lọc</h3>
                        <FilterContent 
                            filterList ={this.state.vietnameseFilter} 
                            filterValue = {selectedFilterValue}
                            onFilter={this.handleFilter}
                        />
                        <FilterContent 
                            filterList ={this.state.internationalFilter} 
                            filterValue = {selectedFilterValue}
                            onFilter={this.handleFilter}
                        />
                    </section>
                    <section className="product-part">
                        <div className="product-part-sort d-flex justify-content-between align-items-center">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    <span>Sắp xếp theo</span><strong>{this.state.selectedValueSort}</strong>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.handleSort("Tên Từ A Đến Z")}>Tên Từ A Đến Z</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSort("Tên Từ Z Đến A")}>Tên Từ Z Đến A</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSort("Giá Tăng Dần")}>Giá Tăng Dần</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSort("Giá Giảm Dần")}>Giá Giảm Dần</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="filter-icon d-flex align-items-center justify-content-center"  onClick={this.handleShow}>
                                <FontAwesomeIcon icon="filter"/>
                            </div>
                        </div>
                        <div className="product-part-container">
                            {albumDisplay.map( album => <AlbumItem {...album} key={album.id} onOpen = {this.handleOpening}/>  ) }
                        </div>
                        <PaginationBasic 
                            totalAlbum={totalAlbum}
                            currentPage={currentPage}
                            albumPerPage ={albumPerPage}
                            onPageChange = {this.handlePageChange}
                            onPreviousPage = {this.handlePreviousPage}
                            onNextPage = {this.handleNextPage}
                        />
                    </section>
                </div>
                
            </main>
         );
    }
}

export default Product;