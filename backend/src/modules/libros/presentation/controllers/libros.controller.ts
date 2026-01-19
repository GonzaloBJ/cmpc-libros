import { Body, Controller, Delete, Get, NotImplementedException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { LibrosCRUDLService } from '../../application/use-case/libros.crudl.service';
import { CreateLibroDto } from '../../application/DTOs/create.libro.dto';
import { UpdateLibroDto } from '../../application/DTOs/update.libro.dto';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/security/jwt.auth.guard';

@Controller('libros')
export class LibrosController {
    constructor(private readonly crudService: LibrosCRUDLService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getLibros() {
        return this.crudService.getLibros();
    }

    @UseGuards(JwtAuthGuard)
    @Get('paginated')
    getLibrosPaginated(
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        console.log('Pagination params - page:', page, 'limit:', limit);
        return this.crudService.getLibrosPaginated(
            Number(page),
            Number(limit),
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('/to-svc')
    getLibrosToSVC(): string {

        throw new NotImplementedException('metodo no implementado aun.');
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getLibroByID(@Param('id') id: number) {

        return this.crudService.getLibroById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    insertLibro(@Body() libro: CreateLibroDto) {
        return this.crudService.createLibro(libro);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateLibro(@Param('id') id: number, @Body() libro: UpdateLibroDto) {
        return this.crudService.updateLibro(id, libro);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteLibro(@Param('id') id: number) {
        return this.crudService.deleteLibro(id);
    }
}
