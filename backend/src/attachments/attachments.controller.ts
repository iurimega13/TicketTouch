import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Param,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { AttachmentsService } from './attachments.service';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  
  @Controller('attachments')
  export class AttachmentsController {
    constructor(private readonly attachmentsService: AttachmentsService) {}
  
    @Post(':ticketId/upload')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads/tickets',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            callback(null, filename);
          },
        }),
        limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB por arquivo
      }),
    )
    async uploadFile(
      @Param('ticketId') ticketId: string,
      @UploadedFile() file: Express.Multer.File,
    ) {
      if (!file) {
        throw new HttpException('Nenhum arquivo enviado', HttpStatus.BAD_REQUEST);
      }
  
      return this.attachmentsService.createAttachment(ticketId, file.path);
    }
  }
  