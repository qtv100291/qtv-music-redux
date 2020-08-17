import React, { useState, useEffect } from 'react';
import AlbumItem from './common/albumItem';
import PaginationBasic from './common/pagination';
import PreviewModal from './common/previewModal';
import BreadCrumb from './common/breadCrumb';
import Dropdown from 'react-bootstrap/Dropdown';
import addfunc from '../ultis/additionalFunction';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import { searchAlbum } from '../services/albumServiceHomePage';
import './SearchPage.scss';


const SearchPage = (props) => {
    const [albumList, setAlbumList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpeningModal, setIsOpeningModal] = useState(false);
    const [preViewId, setPreViewId] = useState(null);
    const [sortOrderBy, setSortOrderBy] = useState("Tên Từ A Đến Z");
    
    const keyword = props.location.state.keyword;
    const albumPerPage = 12;
    
     useEffect( () => {
        (async function getData(){
            const albumList = await searchAlbum(keyword);
            setAlbumList(albumList)
        })();
        document.title = "Tìm Kiếm";
        window.scrollTo(0, 0);
        props.onLoadingScreen();
        additionalFunctionDom.fixBody();
        setTimeout( () => {
            props.onLoadingScreen();
            additionalFunctionDom.releaseBody();
        },1200) 
    },[keyword])

    const totalAlbum = albumList.length;
    const sortedAlbum = addfunc.productSortBy( albumList , sortOrderBy);
    const albumDisplay = addfunc.albumDisplay( totalAlbum, currentPage, albumPerPage, sortedAlbum )

    const handlePreviousPage = () => {
        const previousPage = currentPage
        if ( previousPage === 1 ) return;
        const pageNow = previousPage - 1;
        setCurrentPage(pageNow);
        document.documentElement.classList.add('on-top');
        setTimeout(() => window.scrollTo(0,0),100);
    }

    const handleNextPage = maxPage => {
        const previousPage = currentPage
        if ( previousPage === maxPage ) return;
        const pageNow = previousPage + 1;
        setCurrentPage(pageNow);
        document.documentElement.classList.add('on-top');
        setTimeout(() => window.scrollTo(0,0),100);
    }

    const handlePageChange = page => {
        if (page === currentPage) return;
        setCurrentPage(page);
        document.documentElement.classList.add('on-top');
        setTimeout(() => window.scrollTo(0,0),100);
    }

    const handleSort = sortValue => {
        setSortOrderBy(sortValue);
        setCurrentPage(1)
    }

    const handleOpening = id => {
        additionalFunctionDom.fixBody();
        setIsOpeningModal(true);
        setPreViewId(id);
    }

    const handleClose = () => {
        additionalFunctionDom.releaseBody();
        setIsOpeningModal(false);
        setPreViewId(null);
    }

    return ( 
        <main className="search-page-main">
            <PreviewModal   
                isOpeningModal = {isOpeningModal} 
                previewId = {preViewId}
                onClose = {handleClose}
                updateShoppingCart = {props.updateShoppingCart}
            />
            <BreadCrumb titleParent="Tìm Kiếm"/>
            <section className="result-list">
                <h3 className="result-list-title">Tìm kiếm cho : <span className="keyword">{keyword}</span> <span className="result-number">({totalAlbum} kết quả)</span></h3>
                <div className="product-part-sort">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            <span>Sắp xếp theo</span><strong>{sortOrderBy}</strong>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSort("Tên Từ A Đến Z")}>Tên Từ A Đến Z</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSort("Tên Từ Z Đến A")}>Tên Từ Z Đến A</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSort("Giá Tăng Dần")}>Giá Tăng Dần</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSort("Giá Giảm Dần")}>Giá Giảm Dần</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className = "result-container">
                    {albumDisplay.map(album => <AlbumItem {...album} key={album.id} onOpen = {handleOpening}/> )}
                </div>
                <PaginationBasic 
                    totalAlbum={totalAlbum}
                    currentPage={currentPage}
                    albumPerPage ={albumPerPage}
                    onPageChange = {handlePageChange}
                    onPreviousPage = {handlePreviousPage}
                    onNextPage = {handleNextPage}
                />
            </section>
        </main>
     );
}

export default SearchPage;