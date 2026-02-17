// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Transaction {
    id: string;
    session_id?: string;
    title: string;
    amount: number;
    type: "credit" | "debit";
    created_at: Date;
  }
}
