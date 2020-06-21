import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';

import Content, { HTMLContent } from '../components/Content';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

import style from './index-page.sass';

const Block = props => {
    const { title, image, text, reverse } = props;

    return (
        <div className={`block ${reverse ? 'reverse' : ''}`}>
            <div className="image">
                <PreviewCompatibleImage
                    imageInfo={{
                        image,
                        alt: `${title}`,
                    }}
                />
            </div>
            <div className="text">
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        </div>
    );
};

export class IndexPageTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    displayBlocks = () => {
        const { homePageData } = this.props;

        let reverse = true;
        console.log(homePageData);
        return homePageData.map(data => {
            reverse = !reverse;
            return (
                <Block
                    key={data.title}
                    title={data.title}
                    image={data.image}
                    text={data.text}
                    reverse={reverse}
                />
            );
        });
    };

    render = () => {
        const { content, contentComponent } = this.props;
        const PostContent = contentComponent || Content;

        return (
            <div className="home-page">
                {this.displayBlocks()}
                <PostContent content={content} />
            </div>
        );
    };
}

IndexPageTemplate.propTypes = {
    title: PropTypes.string,
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
};

const IndexPage = ({ data }) => {
    const { frontmatter, html } = data.markdownRemark;
    const { markdownRemark: post } = data;

    const { homePageData } = frontmatter;

    console.log(homePageData);

    return (
        <Layout>
            <IndexPageTemplate
                content={html}
                contentComponent={HTMLContent}
                homePageData={homePageData}
            />
        </Layout>
    );
};

IndexPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
};

export default IndexPage;

export const pageQuery = graphql`
    query IndexPageTemplate {
        markdownRemark(
            frontmatter: { templateKey: { eq: "index-page" }, title: {} }
        ) {
            html
            frontmatter {
                homePageData {
                    image {
                        childImageSharp {
                            fluid(maxWidth: 120, quality: 100) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                    text
                    title
                }
            }
        }
    }
`;
