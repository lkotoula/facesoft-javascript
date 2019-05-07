/* @flow */

const axios = require('axios');
const base64 = require('./base64');

const API_BASE: string = "https://api.facesoft.io";
const API_VERSION: string = "v1";

class Facesoft {
    apiKey: string;

    constructor(apiKey: string){
        this.apiKey = apiKey;
    }

    _get(endpoint: string, params: Object): Promise<Object> {
        return new Promise((resolve, reject) => {
            const url: string = API_BASE + "/" + API_VERSION + "/" + endpoint;

            axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.apiKey
                },
                params
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            })
        })
    }

    _delete(endpoint: string, params: Object): Promise<Object> {
        return new Promise((resolve, reject) => {
            const url: string = API_BASE + "/" + API_VERSION + "/" + endpoint;

            axios.delete(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.apiKey
                },
                params
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            })
        })
    }

    _post(endpoint: string, payload: Object, params: Object = {}): Promise<Object> {
        return new Promise((resolve, reject) => {
            const url: string = API_BASE + "/" + API_VERSION + "/" + endpoint;
            axios.post(url, JSON.stringify(payload), {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.apiKey
                },
                params
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            })
        })
    }

    detect(image1: string){
        return this._post('face/detect', { image1: image1 })
    }
    detectFromURL(url: string){
        return base64.fromURL(url).then(response => this._post('face/detect', { image1: response }))
    }
    detectFromFile(filelocation: string){
        return this._post('face/detect', { image1: base64.fromFile(filelocation) })
    }

    match(image1: string, image2: string){
        return this._post('face/match', { 
            image1: image1, 
            image2: image2 
        })
    }
    matchFromURLs(url1: string, url2: string){
        return base64.fromURLs([url1, url2]).then(response => this._post('face/match', { 
            image1: response[0], 
            image2: response[1] 
        }))
    }
    matchFromFiles(filelocation1: string, filelocation2: string){
        return this._post('face/match', { 
            image1: base64.fromFile(filelocation1),
            image2: base64.fromFile(filelocation2)
        })
    }

    getTagInfo(tagID: string){
        return this._get('face/tags', { tagID: tagID })
    }
    createTag(tagID: string){
        return this._post('face/tags', { tagID: tagID })
    }
    deleteTagWithImages(tagID: string){
        return this._delete('face/tags', { tagID: tagID })
    }
    recognizeTagByFace(tagID: string){
        return this._post('face/tags/find', { tagID: tagID })
    }
    associateImageWithTag(tagID: string, image1: string){
        return this._post('face/tags/images', { 
            tagID: tagID,
            image1: image1
        })
    }

    deleteImage(imageID: string){
        return this._delete('face/tags/images', { imageID: imageID })
    }

    validateImageWithTag(tagID: string, image1: string){
        return this._post('face/tags/validate', { 
            tagID: tagID,
            image1: image1
        })
    }
}
module.exports = Facesoft;