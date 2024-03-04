import { existsSync } from 'fs';
import { join } from 'path';

import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {

    getStaticFile( fileName: string ) {
        const path: string = join(__dirname, '../../static/uploads', fileName);

        if ( existsSync(path) ) throw new BadRequestException(`No se encontro el archivo co nel nombre ${fileName}`);

        return path;
    }

}
