import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SlaEntity } from './entities/sla.entity';
import { CreateSlaDto } from './dtos/createSla.dto';
import { UpdateSlaDto } from './dtos/updateSla.dto';

@Injectable()
export class SlasService {
  constructor(
    @InjectRepository(SlaEntity)
    private readonly slaRepository: Repository<SlaEntity>,
  ) {}

  async createSla(createSlaDto: CreateSlaDto) {
    const sla = this.slaRepository.create(createSlaDto);
    return await this.slaRepository.save(sla);
  }

  async getAllSlas() {
    return await this.slaRepository.find();
  }

  async updateSla(id: string, updateSlaDto: UpdateSlaDto) {
    await this.slaRepository.update(id, updateSlaDto);
    return this.slaRepository.findOneBy({ id });
  }

  async deleteSla(id: string) {
    const sla = await this.slaRepository.findOneBy({ id });
    if (!sla) throw new Error('SLA not found');
    await this.slaRepository.remove(sla);
  }

  async getSlaById(id: string) {
    return await this.slaRepository.findOneBy({ id });
  }
  
}