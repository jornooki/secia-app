import { Model } from '../core/model';

export class Cliente extends Model {
  codigo: number;
  nome: string;
  cnpj: string;
  email: string;
}
