import React from 'react';
import PropTypes from 'prop-types';
import './Feed.css';

const Feed = ({feed}) => {
    return (
        <div className='box'>
            <div className='title'>{feed.title}</div>
            <div className='description'>{feed.description}</div>
            <div className='image'><img alt={'img'} width={'100%'} height={300} src={feed.urlToImage}/></div>
            <div className='date'>publishedAt: {feed.publishedAt}</div>
            <div className='url'><a href={feed.url} target="_blank">{feed.url}</a></div>
        </div>
    );
}

export default Feed;

Feed.propTypes = {
    feed: PropTypes.shape({
        author: PropTypes.string,
        source: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        }),
    })
}
