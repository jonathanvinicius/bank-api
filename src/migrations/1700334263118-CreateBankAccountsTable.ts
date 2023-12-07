import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBankAccountsTable1700334263118
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bank_accounts',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'account_number',
            type: 'varchar',
          },
          {
            name: 'owner_name',
            type: 'varchar',
          },
          {
            name: 'balance',
            type: 'double',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bank_accounts');
  }
}
