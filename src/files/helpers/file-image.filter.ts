export const fileImageFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: Function,
) => {
    if ( !file )
        return cb(null, true);

    if ( !file.mimetype.split('/')[0] )
        return cb( new Error('La imagen no tiene el tipo.'), false );

    if ( !file.mimetype.split('/')[1] )
        return cb( new Error('La imagen no tiene la extensión.'), false );

    const typeFile: string= file.mimetype.split('/')[0];
    const validTypes: string[] = ['image'];

    if ( !validTypes.includes(typeFile) )
        return cb( new Error('Seleccione una imagen.'), false );

    const fileExtension: string = file.mimetype.split('/')[1];
    const validExtensions: string[] = ['gif', 'jpg', 'jpeg', 'png', 'svg'];

    if ( validExtensions.includes(fileExtension) )
        return cb( new Error('La imagen debe ser de una extensión valida (gif, jpg, jpeg, png, svg)'), false );

    cb(null, true);
}