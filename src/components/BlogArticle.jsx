import React, { Component } from 'react';
import './BlogArticle.scss';
import addfunc from '../ultis/additionalFunction';
import BreadCrumb from './common/breadCrumb';
import { getArticle } from '../services/articleService';
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
        const { data : article } = await getArticle(articleId);
        this.setState({ article })
        document.title = article.title;
        setTimeout( () => {
            this.props.onLoadingScreen();
            additionalFunctionDom.releaseBody();
        },1200)  
    }
    render() { 
        return ( 
            <main className="blog-detail">
                <BreadCrumb titleParent="Blog" title={this.state.article.title}/>
                <section className="section-article-content">
                    {Object.keys(this.state.article).length !== 0 && articlePreprocessor(this.state.article)}
                </section>
            </main>
         );
    }
}
 
export default BlogArticle;