import React, { Fragment, useEffect, useCallback, useState } from 'react';
import Header from '../../components/Header/Header';
import Post from '../../components/Post/Post'
import { Container } from '@material-ui/core';
import './Timeline.css'
import { getPosts } from '../../services/post';
import Upload from '../../components/Upload/Upload'


const Timeline = () => {
    const [posts, setPosts] = useState([]);


    const fetchPosts = useCallback(async () => {
        const response = await getPosts();
        setPosts(response.data)
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <Fragment>
            <Header />
            <Container className="timeline">
                <Upload></Upload>
                {
                    posts.map(post => {
                        return (<Post key={post._id} post={post} />);
                    })
                }
            </Container>
        </Fragment>
    )
};

export default Timeline;