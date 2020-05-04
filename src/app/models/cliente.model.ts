import { Model } from '../core/model';

export class Cliente extends Model {
  nome: string;
  cnpj: string;
  email: string;
}
