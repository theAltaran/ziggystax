import PancakePairPots_ABI from "../contracts/PancakePairPOTS.json";
import type { PancakePairPOTS } from "../contracts/types";
import useContract from "./useContract";

export default function usePOTSBUSDPair(tokenAddress?: string) {
  return useContract<PancakePairPOTS>("0xF90BAA331Cfd40F094476E752Bf272892170d399", PancakePairPots_ABI);
}
