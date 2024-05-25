import dotenv from "dotenv";
import mongoose, { Schema, connect, model } from "mongoose";
import User from "../entities/User";
import Debt from "../entities/Debt";
import Costumer from "../entities/Costumers";

interface AuthToken {
  user_id: string;
  token: string;
  expires_at: Date;
}

export const userSchema = new Schema<User>({
  id: String,
  email: String,
  hash_password: String,
  acess_token: String,
  permission: Number,
  createdAt: Date,
  updatedAt: Date,
});
export const debtSchema = new Schema<Debt>({
  costumer_id: String,
  debt_id: String,
  value: Number,
  initial_value: Number,
  payment_method: String,
  fee: Number,
  initial_date: Date,
  due_dates: [Date],
  payed: Number,
  late_fee: Number,
  callings: Number,
  description: String,
  doc: String,
});

export const costumerSchema = new Schema<Costumer>({
  costumer_id: String,
  email: String,
  phone: String,
  name: String,
  last_name: String,
  cep: String,
  adress: String,
  debts_ids: [String],
  cpf: String,
  rg: String,
  details: String,
});

export const authTokensSchema = new Schema<AuthToken>({
  user_id: String,
  token: String,
  expires_at: Date,
});

export const UserModel = model<User>("Users", userSchema);
export const DebtModel = model<Debt>("Debts", debtSchema);
export const CostumerModel = model<Costumer>("Costumers", costumerSchema);
export const authtokens = model<AuthToken>("AuthTokens", authTokensSchema);

dotenv.config();

async function run() {
  const mongoUrl: string | undefined = process.env.MONGO_DB;
  if (!mongoUrl) {
    return console.error("Missing mongo url env!");
  }
  await connect(mongoUrl as string);
  console.log("mongo connection:", mongoose.connection.readyState);
}

run().catch(err => console.log(err));
