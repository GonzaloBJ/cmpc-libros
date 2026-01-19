import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/security/jwt.auth.guard';
import { StockLibrosCRUDLService } from '../../application/use-case/stock-libros.crudl.service';
import { CreateStockLibroDto } from '../../application/DTOs/create.stock-libro.dto';
import { UpdateStockLibroDto } from '../../application/DTOs/update.stock-libro.dto';

@Controller('stock-libros')
export class StockLibrosController {
    constructor(private readonly crudService: StockLibrosCRUDLService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getStockLibros() {
        return this.crudService.getStockLibros();
    }

    @UseGuards(JwtAuthGuard)
    @Get('paginated')
    getStockLibrosPaginated(
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        console.log('Pagination params - page:', page, 'limit:', limit);
        return this.crudService.getStockLibrosPaginated(
            Number(page),
            Number(limit),
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getStockLibroByID(@Param('id') id: number) {
        return this.crudService.getStockLibroByIdLibro(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    insertStockLibro(@Body() stockLibro: CreateStockLibroDto) {
        return this.crudService.createStockLibro(stockLibro);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateStockLibro(@Param('id') id: number, @Body() stockLibro: UpdateStockLibroDto) {
        return this.crudService.updateStockLibro(id, stockLibro);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteStockLibro(@Param('id') id: number) {
        return this.crudService.deleteStockLibro(id);
    }
}
