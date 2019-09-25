import net from 'net'
import { argv, log } from '../common/utils'
import readlLine from 'readline'
import fs from 'fs'
import path from 'path'
import ClientFactory from './clientFactory'

export default class FtpUpload extends ClientFactory{

    constructor(host, port){
        super(host, port);
    }


    sendData(filepath){
        console.log(`i send data from ${filepath}`);
    }
}
