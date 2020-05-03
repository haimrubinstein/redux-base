import React, {useCallback, useEffect, useState} from 'react';
import Feed from '../../components/Feed/Feed';
import {request} from '../../../services/Api';
import './Feeds.css';

function Feeds() {
    const [feeds, setFeeds] = useState([]);
    const [offset, setOffset] = useState(20);
    const params = {apiKey: '578d79c7f2b74031879b1353427b2c38', q: 'bitcoin'};

    useEffect(() => {
        (async () => {
            params.pageSize = offset;
            const [err, data] = await request('https://newsapi.org/v2/everything', 'get', params);
            if(!err) {
                setFeeds(data.articles);
            }
        })();
    }, [offset]);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', () => scrollHandler);
        }
    }, []);

    const scrollHandler = useCallback((e) => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            setOffset(offset => offset + 20)
        }
    }, [offset, setOffset])

    return (
        <div className={'container'}>
            {feeds.map(feed => {
                return (
                    <Feed key={feed.url} feed={feed} />
                )
            })}
        </div>
    );
}

export default Feeds;
