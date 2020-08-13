import React, { Component } from 'react';
import './BlogArticle.scss';
import addfunc from '../ultis/additionalFunction';
import { Link } from 'react-router-dom';
import { getArticle } from '../services/articleService';
import calendar from '../assets/blog/calendar-1.png';
import pen from '../assets/blog/pen-1.png';
import articlePreprocessor from '../ultis/articlePreprocessor';
import additionalFunctionDom from '../ultis/additionalFunctionDom';

class BlogArticle extends Component {
    state = { 
        article: {}
     }
    async componentDidMount() {
        window.scrollTo(0, 0);
        this.props.onLoadingScreen();
        additionalFunctionDom.fixBody();
        const articleId = addfunc.getAlbumId(this.props.location.pathname);
        try{
            const { data : article } = await getArticle(articleId);
            this.setState({ article })
            document.title = article.title;
            setTimeout( () => {
                this.props.onLoadingScreen();
                additionalFunctionDom.releaseBody();
            },800)  
        }
        catch(ex){
            console.log(ex.response)
            if (ex.response && ex.response.status === 404){
                this.props.onLoadingScreen();
                additionalFunctionDom.releaseBody();
                this.props.history.replace("/khong-tim-thay")
            }
        }    
    }

    componentDidUpdate(prevProps){
        if (addfunc.getAlbumId(prevProps.location.pathname) !== addfunc.getAlbumId(this.props.location.pathname)){
            this.componentDidMount();
        }
    }

    render() { 
        const article_1 = {
                            title : "Chester Bennington một cuộc đời để nhớ",
                            id : 1,
                            date: "20 Tháng 07, 2020"
                        }
        const article_2 = {
                            title : "Đô Thị Phần Lan Trong Cuộc Đua Giành Ngôi Vị Thủ Đô Metal",
                            id : 2,
                            date: "02 Tháng 07, 2020"
                        }
        const article_3 = {
                            title : "Ban Nhạc Hạc San Ra Mắt Album Hồn Trăng Máu",
                            id : 3,
                            date : "25 Tháng 06, 2020"
                        }
        const article_4 = {
                            title : "Những Điều Thú Vị Về Tứ Trụ Thrash Metal",
                            id : 4,
                            date : "08 Tháng 06, 2020"
                        }
        const articleIndex = parseInt(this.state.article.id);
        const articleTitles = [{...article_1}, {...article_2}, {...article_3}, {...article_4}];
        let relatedArticle;
        if (articleIndex) {
            relatedArticle = articleTitles.filter( (article,index) => index !== (articleIndex -1))
        } else return null
        
        return (
            <main className="blog-detail">
                <div className="bread-crumb"><Link to="/">Trang Chủ</Link>  /  <Link to ="/blog">Blog</Link>  /  {this.state.article.title}</div>
                <section className="section-article-content">
                    {Object.keys(this.state.article).length !== 0 && articlePreprocessor(this.state.article)}
                </section>
                <section className="section-related-articles">
                    <h2>Bài Viết Cùng Chuyên Mục: </h2>
                    {relatedArticle && relatedArticle.map(article => (
                        <div className="related-article-item" key={article.id}>
                            <Link to={`/blog/${article.title.split(" ").join("-")}-${article.id}`}>{article.title}</Link> <span>{article.date}</span>
                        </div>
                    ))}
                </section>
            </main>
         );
    }
}

export default BlogArticle;