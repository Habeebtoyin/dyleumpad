import { ActivePools } from "../../../data/PoolsData";

export default function handler({ query: { id } }, res) {
  const filtered = ActivePools?.filter((pool) => pool.id === Number(id));
  console.log(filtered)

  if (filtered?.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res.status(404).json({ message: `Pool with the id of ${id} is not found` });
  }
}
