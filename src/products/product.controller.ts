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

import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ProductService } from './product.service';
import { ProductQueryDto } from './dtos/productQuery.dto';

import { ValidationErrorsException } from 'src/shared/responses/ValidationErrorsException';
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
      throw new ValidationErrorsException(errors);
    }
    const data = await this.productService.searchProducts(query);

    res.status(HttpStatus.OK).json(data);
  }
}
