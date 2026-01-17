import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LibrosCRUDLService } from '../../application/use-case/libros.crudl.service';

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

    // //throw new NotImplementedException('metodo no implementado aun.');
    return "svc libros";
    // throw new NotFoundException(`Usuario co no encontrado`);
  }

  @Post()
  insertLibro(@Body() libro: any ) {
    return this.crudService.createLibro(libro);
  }

  @Put(':id')
  updateLibro(@Param('id') id: number, @Body() libro: any ){
    return this.crudService.updateLibro(id, libro);
  }

  @Delete(':id')
  deleteLibro(@Param('id') id: number) {
    return this.crudService.deleteLibro(id);
  }
}
