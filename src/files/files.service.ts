import { existsSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuid } from 'uuid';

import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// DTOs
import { DestinationFilesDto, validateFolders } from './dto/destination-files.dto';

@Injectable()
export class FilesService {

    constructor(
        private configService: ConfigService,
    ) {}

    getStaticFile(
        fileName: string,
        folder: string,
    ) {
        const path: string = join(__dirname, `../../static/uploads/${folder}/`, fileName);

        if ( !existsSync(path) )
            throw new BadRequestException(`No se encontró el archivo con el nombre ${fileName}`);

        return path;
    }

    uploadFiles(
        destinationFilesDto: DestinationFilesDto,
        files: Array<Express.Multer.File>,
    ) {
        const destination: string = destinationFilesDto.destination;
        
        if ( !validateFolders.includes(destination) )
            throw new BadRequestException(`El destino no es un valor aceptado.`);
        
        if ( !files || files.length == 0 )
            throw new BadRequestException(`Debe seleccionar al menos ${destination == 'user' ? 'una imagen.' : 'un archivo.'}`);
    
        switch (destination) {
            case 'users':
                if ( files.length > 1 )
                    throw new BadRequestException(`Como máximo 1 imagen.`);
            break;
        }
    
        this.validateSizesFiles(files, destination);
        this.validateTypeAndExtensionFiles(files, destination);
        this.removeFilesInDirectory(destinationFilesDto);
    
        return {
            message: `Imágenes guardadas`,
            ...this.saveFiles(destinationFilesDto, files),
        };
    }
    
    private validateSizesFiles(
        files: Array<Express.Multer.File>,
        destination: string,
    ): void {
        for ( const file of files ) {
            if ( file.size > 10000000 )
                throw new BadRequestException(`${destination == 'user' ? 'La imagen' : 'El archivo'} ${file.originalname} no puede pesar más de 10 megas.`);
        }
    }
    
    private validateTypeAndExtensionFiles(
        files: Array<Express.Multer.File>,
        destination: string,
    ): void {
        const validExtensions = destination == 'users'
            ? this.configService.get('FILES_EXTENSIONS_IMAGE_VALID')
            : null;
    
        for (const file of files) {
            const typeExtension = file.mimetype.split('/')[0];
            
            if ( destination == 'users' && typeExtension != 'image' ) 
                throw new BadRequestException(`Debe ingresar una imagen`);
        
            const fileExtension = file.mimetype.split('/')[1];
    
            if ( !validExtensions.includes(fileExtension) )
                throw new BadRequestException(`${destination == 'user' ? 'Imagen' : 'Archivo'} ${file.originalname} no tiene una extensión válida.`);
        }
    }
    
    private removeFilesInDirectory(
        destinationFilesDto: DestinationFilesDto,
    ) {
        if ( destinationFilesDto.filesStorageRemove ) {
            const urlsFiles: string[] = destinationFilesDto.filesStorageRemove;
            urlsFiles.forEach( ( urlFile: string ) => unlinkSync( urlFile ) );
        }
    }
    
    private saveFiles(
        destinationFilesDto: DestinationFilesDto,
        files: Array<Express.Multer.File>,
    ) {
        let filesName: string[] = [];
        let securesUrls: string[] = [];
    
        for ( const file of files ) {
            const fileExtension = file.mimetype.split('/')[1];
            const fileName = `${uuid()}.${fileExtension}`;
    
            writeFileSync(`./static/uploads/${destinationFilesDto.destination}/${fileName}`, file.buffer);

            filesName.push(fileName);
    
            securesUrls.push(
                `${this.configService.get('API_PROTOCOL')}://${this.configService.get('API_HOST')}:${this.configService.get('API_PORT')}/api/files/${fileName}`
            );
        }
    
        return {
            filesName,
            securesUrls,
        };
    }

}
