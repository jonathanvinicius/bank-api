import {
  Controller,
  Get,
  Body,
  Param,
  ValidationPipe,
  Post,
  Inject,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PixKey } from '../models/pix-key-model';
import { PixKeySaveDTO } from '../dtos/pix-key-save-DTO';
import { BankAccount } from 'src/bank-account/models/bank-account.model';
import { ClientGrpc } from '@nestjs/microservices';
import { PixService } from '../grpc-types/pix-service.grpc';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Controller('bank-accounts/:bankAccountId/pix-keys')
export class PixKeyController {
  constructor(
    @InjectRepository(PixKey)
    private pixKeyRepo: Repository<PixKey>,

    @InjectRepository(BankAccount)
    private bankAccountRepo: Repository<BankAccount>,

    @Inject('CODEPIX_PACKAGE')
    private client: ClientGrpc,
  ) {}

  @Get()
  index(
    @Param('bankAccountId')
    bankAccountId: string,
  ) {
    return this.pixKeyRepo.find({
      where: { bank_account_id: bankAccountId },
      order: { created_at: 'DESC' },
    });
  }

  @Post()
  async create(
    @Param('bankAccountId')
    bankAccountId: string,
    @Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
    body: PixKeySaveDTO,
  ) {
    await this.bankAccountRepo.findOne({ where: { id: bankAccountId } });

    const pixService: PixService = this.client.getService('PixService');
    const notFound = await this.checkPixKeyNotFound(body);
    if (!notFound) {
      throw new UnprocessableEntityException('Pix key already exists');
    }

    const createdPixKey = await lastValueFrom(
      pixService.registerPixKey({
        ...body,
        accountId: bankAccountId,
      }),
    );
    if (createdPixKey.error) {
      throw new InternalServerErrorException(createdPixKey.error);
    }
    const pixKey = this.pixKeyRepo.create({
      id: createdPixKey.id,
      bank_account_id: bankAccountId,
      ...body,
    });
    return await this.pixKeyRepo.save(pixKey);
  }

  async checkPixKeyNotFound(params: { kind: string; key: string }) {
    const pixService: PixService = this.client.getService('PixService');

    try {
      await firstValueFrom(pixService.find(params));
      return false;
    } catch (error) {
      if (error.details === 'no key was found') {
        return true;
      }
      console.log(error);

      throw new InternalServerErrorException('Server error');
    }
  }

  // @Get('exists')
  // exists(){}
}
