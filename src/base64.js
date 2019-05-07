/* @flow */
const fs = require('fs');
const axios = require('axios');

export const fromFile = (file: string) => {
    const body: Buffer = fs.readFileSync(file);
    return body.toString('base64');
}

export const fromURL = (url: string):Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            responseType: 'arraybuffer'
          }).then(response => {
            const type: string = response.headers["content-type"];
            if(!type.includes("image")) 
                reject(new Error('URL is not an image'));

            resolve(Buffer.from(response.data, 'binary').toString('base64'));
        }).catch(error => {
            reject(error.response);
        })
    })
}

export const fromURLs = (urls: Array<string>):Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.all([
            axios.get(urls[0], { responseType: 'arraybuffer'}),
            axios.get(urls[1], { responseType: 'arraybuffer'})
        ]).then(axios.spread((res1, res2) => {
                const type: string = res1.headers["content-type"];
                const type2: string = res2.headers["content-type"];

                if(!type.includes("image") || !type2.includes("image")) 
                    reject(new Error('URL is not an image'));

            resolve([
                Buffer.from(res1.data, 'binary').toString('base64'),
                Buffer.from(res2.data, 'binary').toString('base64')
            ]);
        })).catch(error => {
            reject(error.response);
        })
    })
}