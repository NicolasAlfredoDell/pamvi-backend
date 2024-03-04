export const fileFilter = ( req: Express.Request, file: Express.Multer.File, cb: Function ) => {
    if ( !file ) return cb( new Error('El archivo no se envio'), false );
    if ( !file.mimetype.split('/')[1] ) return cb( new Error('El archivo no tiene el tipo'), false );

    const fileExtension = file.mimetype.split('/')[1];

    const validExtensions = ['pdf'];

    if ( validExtensions.includes(fileExtension) ) return cb(null, true);

    cb(null, false);
}