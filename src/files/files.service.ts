import { existsSync } from 'fs';
import { join } from 'path';

import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {

    getStaticFile(
        fileName: string,
    ) {
        const path: string = join(__dirname, '../../static/uploads', fileName);

        if ( existsSync(path) )
            throw new BadRequestException(`No se encontró el archivo con el nombre ${fileName}`);

        return path;
    }

}
