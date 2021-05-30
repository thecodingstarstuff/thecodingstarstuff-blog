import {getURL} from 'next/dist/next-server/lib/utils';
import Head from 'next/head';
import Date from '../../components/date';
import Layout from '../../components/layout';

import {getAllPostIds, getPostData} from '../../lib/posts';
import postData from '../../lib/post_data.interface';

import utilStyles from '../../styles/utils.module.scss';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';
import makefile from 'highlight.js/lib/languages/makefile';
import {useEffect} from "react";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('makefile', makefile);


export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}: { params: { id: string } }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

const getDomain = (url) => {
    const regex = /https?:\/\/(?<domain>[A-Za-z0-9-.]+)\/.*/;
    const matches = url.match(regex);
    if (matches) {
        return matches.groups.domain;
    } else {
        return null;
    }
};
const Post = ({postData}: { postData: postData }) => {
    useEffect(() => {
        hljs.initHighlighting();
    })
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            {postData.series ? (
                <>
                    <h1 className={utilStyles.headingXl}>{postData.series}</h1>
                    <h2>{postData.title}</h2>
                </>
            ) : (
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            )}
            <div className={utilStyles.lightText}>
                by <a href={postData.authorLink}>{postData.author}</a>
            </div>
            {postData.draft && (
                <div className={utilStyles.lightText}>
                    <small>
                        Keep in mind this is a draft, make sure to check out later for the
                        final version.
                    </small>
                </div>
            )}
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date}/>
                {postData.updated && (
                    <span>
            . Updated on: <Date dateString={postData.updated}/>
          </span>
                )}
            </div>
            <div className={utilStyles.lightText}>
                {postData.firstOn && (
                    <div className={utilStyles.lightText}>
                        Originally published at:{' '}
                        <a href={postData.firstOn}>{getDomain(postData.firstOn)}</a>
                    </div>
                )}
                <ul className={utilStyles.keywords}>
                    {postData.keywords.map((keyword) => (
                        <li key={keyword}>#{keyword}</li>
                    ))}
                </ul>
            </div>
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
            {postData.draft && (
                <div className={utilStyles.lightText}>
                    <small>
                        Keep in mind this is a draft, make sure to check out later for the
                        final version.
                    </small>
                </div>
            )}
        </Layout>
    );
};

export default Post;
