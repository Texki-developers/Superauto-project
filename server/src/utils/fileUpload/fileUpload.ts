import { UploadedFile } from 'express-fileupload';
import { IfileReturn } from '../../types/base.type';

const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

export const uploadFile = (file: UploadedFile, type: 'image' | 'doc' | 'video', allowedExtension: string[] | null):IfileReturn|void => {
  const allowedFileTypes: string[] = allowedExtension || []; // Add the file types you want to allow

  const newdate = new Date().toLocaleDateString('fr-CA');

  var dir = `public/uploads/${newdate}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const splittedFileName:string[] = file.name.split('.');

  const ext = splittedFileName[splittedFileName.length - 1];
  const filename = Date.now() + uuidv4() + '.' + ext;
  const filepath = `${type}/` + newdate + '/' + filename;
  const newpath = path.join(process.cwd(), dir, filename);

  // Check if the file type is allowed
  if (!allowedFileTypes.includes(ext.toLowerCase())) {
    throw new Error('Invalid file type. Only ' + allowedFileTypes.join(', ') + ' files are allowed.');
  }

  const files = file.mv(newpath, function (err: any) {
    if (err) {
      console.log(err,"REASON")
      throw new Error(`File Upload failed Error: ${err}`);
    } else {
      console.log('File uploaded....');
  
      
    }
  });
  return {location:filepath,name:file.name};
};
