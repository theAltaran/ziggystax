import pots_minter_abi from "../contracts/pots_MINTER.json";
import type { PotsMINTER } from "../contracts/types";
import useContract from "./useContract";

export default function useMinter(tokenAddress?: string) {
  return useContract<PotsMINTER>("0x219A0De2813d8DEee2dBcb2cc2A738e36423dFfF", pots_minter_abi);
}