import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { PixKeyKind } from '../models/pix-key-model';

export class PixKeySaveDTO {
  @IsString()
  @IsIn(Object.values(PixKeyKind))
  @IsNotEmpty()
  readonly kind: PixKeyKind;

  @IsString()
  @IsNotEmpty()
  readonly key: string;
}
