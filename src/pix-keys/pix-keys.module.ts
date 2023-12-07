import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixKey } from './models/pix-key-model';
import { PixKeyController } from './controllers/pix-key-controller';
import { BankAccount } from './../bank-account/models/bank-account.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([PixKey, BankAccount]),
    ClientsModule.register([
      {
        name: 'CODEPIX_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_URL,
          package: 'github.com.jonathanvinicius.codepix',
          protoPath: [join(__dirname, 'protofiles/pixkey.proto')],
        },
      },
    ]),
  ],
  controllers: [PixKeyController],
  providers: [],
})
export class PixKeyAccountModule {}
