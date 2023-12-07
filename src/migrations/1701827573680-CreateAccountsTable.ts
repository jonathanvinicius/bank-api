import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAccountsTable1701827573680 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'owner_name',
            type: 'varchar',
          },
          {
            name: 'bank_id',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'bank_id',
      new TableForeignKey({
        name: 'accounts_bank_id_foreign_key',
        columnNames: ['bank_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'banks',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('bank_id', 'accounts_bank_id_foreign_key');
    await queryRunner.dropTable('accounts');
  }
}
