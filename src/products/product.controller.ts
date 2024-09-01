import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
  UseGuards,
  Post,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ProductService } from './product.service';
import { ProductQueryDto } from './dtos/productQuery.dto';
import { ErrorResponse } from 'src/shared/responses/ErrorResponse';
import { ProductParamDto } from './dtos/productParam.dto';
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async listProducts(@Req() req: Request, @Res() res: Response) {
    const data = await this.productService.listProducts();
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  async findProductById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id,
  ) {
    const data = await this.productService.findProductById(id);
    res.status(HttpStatus.OK).json(data);
  }

  @Post('search')
  async searchProducts(
    @Req() req: Request,
    @Res() res: Response,
    @Body() query: ProductQueryDto,
  ) {
    const errors = [];

    if (!query.name && !query.description) {
      errors.push('Você deve informar um nome ou uma descrição');
    }

    if (errors.length) {
      const response = new ErrorResponse('Erro ao buscar produtos', errors);
      res.status(HttpStatus.BAD_REQUEST).json(response);
    }
    const data = await this.productService.searchProducts(query);

    res.status(HttpStatus.OK).json(data);
  }
}
