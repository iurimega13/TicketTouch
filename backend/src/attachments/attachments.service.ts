import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttachmentEntity } from './entities/attachments.entity';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(AttachmentEntity)
    private attachmentsRepository: Repository<AttachmentEntity>,
  ) {}

  async createAttachment(ticketId: string, filePath: string) {
    const attachment = this.attachmentsRepository.create({
      ticket: { id: ticketId },
      file_path: filePath,
    });
    return await this.attachmentsRepository.save(attachment);
  }
}
