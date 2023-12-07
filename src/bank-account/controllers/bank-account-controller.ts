import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from 'src/bank-account/models/bank-account.model';
import { Repository } from 'typeorm';

@Controller('bank-accounts')
export class BankAccountController {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepo: Repository<BankAccount>,
  ) {}

  @Get()
  index() {
    return this.bankAccountRepo.find();
  }

  @Get(':bankAccountId')
  async show(
    @Param('bankAccountId')
    bankAccountId: string,
  ) {
    const bankAccount = await this.bankAccountRepo.findOne({
      where: {
        id: bankAccountId,
      },
    });

    if (!bankAccount) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return bankAccount;
  }
}
