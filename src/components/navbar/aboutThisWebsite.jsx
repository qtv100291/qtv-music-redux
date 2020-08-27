import React from 'react';
import './aboutThisWebsite.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectAboutThisWebsiteIsOpening, closeAboutThisWebsiteModal } from '../../store/aboutThisWebsiteModal'
import additionalFunctionDom from '../../ultis/additionalFunctionDom';

const AboutThisWebsite = () => {
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        additionalFunctionDom.releaseBody();
        dispatch(closeAboutThisWebsiteModal());
    }

    const isOpening = useSelector(selectAboutThisWebsiteIsOpening);

    return ( 
        <div className={isOpening ? "about-this-website displaying" : "about-this-website"}>
            <div className="about-website-content">
                <h2 className="title-about-website">About This Website </h2>
                <p>This website is built as part of my Front-end coding bootcamp at TechMaster ( Ha Noi, Vietnam ), not for any commercial purposes. Content in  this website ( photos, audios, articles, ...) is collected on the internet and doesn't belong to me, I have only created UI/UX design and coding part. You can find UI/UX design at : <a href="https://www.figma.com/file/WIjNg3boRYdXP4oeyb9LVS/QTV-Music-Shop?node-id=0%3A1" target="_blank" rel="noopener noreferrer">https://www.figma.com/file/WIjNg3boRYdXP4oeyb9LVS/QTV-Music-Shop?node-id=0%3A1</a> ( need to create a Figma account if you don't have one )</p>
                <p>Because of lacking back-end development, I have used <a href="https://www.npmjs.com/package/json-server-auth" target="_blank" rel="noopener noreferrer">json-server-auth</a> and <a href="https://www.npmjs.com/package/json-server" target="_blank" rel="noopener noreferrer">json-server</a> to make a fake REST API for getting data and building authentication.</p>
                <p>I have created a account with email: user@gmail.com and password: 123456 for testing, but if needed, you can create your own account</p>
                <p>Special thanks to Ms.Nguyen Thi Yen, Mr.Dang Quang Huy and members of class Web Front-end 8 for providing guidance and feedback to help me complete this project.</p>
                <p>If you have any questions, feel free to contact me by email: quangtuanvu1991@gmail.com. Thanks.</p>
                <div className="close-about-website" onClick={handleCloseModal}> Đóng </div>
            </div>
        </div>
     );
}
 
export default AboutThisWebsite;