import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { BankAccountModule } from './bank-account/bank-account.module';
import { PixKeyAccountModule } from './pix-keys/pix-keys.module';
import { ConsoleModule } from 'nestjs-console';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConsoleModule,
    DatabaseModule,
    BankAccountModule,
    PixKeyAccountModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
