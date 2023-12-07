import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './models/bank-account.model';
import { BankAccountController } from './controllers/bank-account-controller';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount])],
  controllers: [BankAccountController],
  providers: [],
})
export class BankAccountModule {}
