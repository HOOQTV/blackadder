/* eslint-disable no-console */
import test from 'ava';
import HttpClient from '../lib';

const pkg = require('../../package.json');

test('1', async (t) => {
    const client = new HttpClient(),
        { body } = await client.get('http://posttestserver.com/post.php?dump');
    t.true(body.indexOf(`${pkg.name}/${pkg.version}`) >= 0);
});

test('2', async (t) => {
    const client = new HttpClient(),
        { body } = await client.post('http://posttestserver.com/post.php?dump', { hihi: 'haha' });
    t.true(body.indexOf(`${pkg.name}/${pkg.version}`) >= 0);
});

test('3', async (t) => {
    const client = new HttpClient(),
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        { body } = await client.post('http://posttestserver.com/post.php?dump', { hihi: 'haha' }, { headers });
    t.true(body.indexOf(`${pkg.name}/${pkg.version}`) >= 0);
});
