import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  Table,
} from 'typeorm';

export class CreatePixKeyTable1701220531005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pix_keys',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'kind',
            type: 'varchar',
          },
          {
            name: 'key',
            type: 'varchar',
          },
          {
            name: 'bank_account_id',
            type: 'varchar',
            length: '36',
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
      'pix_keys',
      new TableForeignKey({
        name: 'pix_keys_bank_account_id_foreign_key',
        columnNames: ['bank_account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bank_accounts',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'pix_keys',
      'pix_keys_bank_account_id_foreign_key',
    );
    await queryRunner.dropTable('pix_key');
  }
}
