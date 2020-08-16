import React from 'react';
import './aboutThisWebsite.scss';

const AboutThisWebsite = ({onClose, isOpening}) => {
    return ( 
        <div className={isOpening ? "about-this-website displaying" : "about-this-website"}>
            <div className="about-website-content">
                <h2 className="title-about-website">About This Website </h2>
                <p>This website is built as part of my Front-end coding bootcamp at TechMaster ( Ha Noi, Vietnam ), not for any commercial purposes. Content in  this website ( photos, audios, articles, ...) is collected on the internet and doesn't belong to me, I have only created UI/UX design and coding part. You can find UI/UX design at : <a href="https://www.figma.com/file/WIjNg3boRYdXP4oeyb9LVS/QTV-Music-Shop?node-id=0%3A1">https://www.figma.com/file/WIjNg3boRYdXP4oeyb9LVS/QTV-Music-Shop?node-id=0%3A1</a> ( need to create a Figma account if you don't have one )</p>
                <p>Because of lacking back-end development, I have used <a href="json-server-auth">json-server-auth</a> and <a href="https://www.npmjs.com/package/json-server">json-server</a> to make a fake REST API for getting data and building authentication.</p>
                <p>Special thanks to Mr Dang Quang Huy and members of class Web Front-end 8 for providing guidance and feedback to help me complete this project.</p>
                <p>If you have any questions, feel free to contact me by email: quangtuanvu1991@gmail.com. Thanks.</p>
                <div className="close-about-website" onClick={onClose}> Đóng </div>
            </div>
        </div>
     );
}
 
export default AboutThisWebsite;