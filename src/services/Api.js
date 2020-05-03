import {to} from "await-to-js";
import axios from 'axios';
import qs from 'qs';

export const request = async (url, type = 'GET', params = {}, body = {}) => {
    console.log('network start. url: %s, params: %O, body: %O', url, params, JSON.stringify(body));

    const options = {
        method: type.toUpperCase(),
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(body),
        params,
        url,
    };

    const [err, result] = await to(axios(options));

    console.log('network finished. result: %O, err: %O', result, err);

    if (err) {
        return [err, null];
    }

    return [err, result.data];
}
