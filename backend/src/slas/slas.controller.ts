import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { SlasService } from './slas.service';
import { CreateSlaDto } from './dtos/createSla.dto';
import { UpdateSlaDto } from './dtos/updateSla.dto';

@Controller('slas')
export class SlasController {
  constructor(private readonly slasService: SlasService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createSla(@Body() createSlaDto: CreateSlaDto) {
    return this.slasService.createSla(createSlaDto);
  }

  @Get()
  async getAllSlas() {
    return this.slasService.getAllSlas();
  }

  @Get(':id')
  async getSlaById(@Param('id') id: string) {
    return this.slasService.getSlaById(id);
  }
  
  @Put(':id')
  async updateSla(@Param('id') id: string, @Body() updateSlaDto: UpdateSlaDto) {
    return this.slasService.updateSla(id, updateSlaDto);
  }

  @Delete(':id')
  async deleteSla(@Param('id') id: string) {
    return this.slasService.deleteSla(id);
  }
}