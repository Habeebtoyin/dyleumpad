import { ActivePools } from "../../../data/PoolsData";

export default async function handler(req, res) {
  res.status(200).json(ActivePools);
}
