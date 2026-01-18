import { Body, Controller, Delete, Get, NotImplementedException, Param, Patch, Post } from '@nestjs/common';
import { LibrosCRUDLService } from '../../application/use-case/libros.crudl.service';
import { CreateLibroDto } from '../../application/DTOs/create.libro.dto';
import { UpdateLibroDto } from '../../application/DTOs/update.libro.dto';

@Controller('libros')
export class LibrosController {
    constructor(private readonly crudService: LibrosCRUDLService) { }

    @Get()
    getLibros() {
        return this.crudService.getLibros();
    }

    @Get(':id')
    getLibroByID(@Param('id') id: number) {

        return this.crudService.getLibroById(id);
    }

    @Get('/to-svc')
    getLibrosToSVC(): string {

        throw new NotImplementedException('metodo no implementado aun.');
    }

    @Post()
    insertLibro(@Body() libro: CreateLibroDto) {
        return this.crudService.createLibro(libro);
    }

    @Patch(':id')
    updateLibro(@Param('id') id: number, @Body() libro: UpdateLibroDto) {
        return this.crudService.updateLibro(id, libro);
    }

    @Delete(':id')
    deleteLibro(@Param('id') id: number) {
        return this.crudService.deleteLibro(id);
    }
}
