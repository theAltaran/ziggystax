import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import usePOTSBUSDPair from "./usePOTSBUSDPair";
import { parseBalance } from "../util";
import { BigNumber } from "ethers";

function getPOTSPrice(contract: any) {
  return async () => {
    const balance = [] = await contract.getReserves();
    const potsPrice = balance[1] / balance[0];
    return potsPrice.toFixed(3);
    //return cakePrice;
  };
}

export default function usePOTSPrice(
  suspense = false
) {
  const contract = usePOTSBUSDPair();

  const shouldFetch = !!contract;

  const POTS = useSWR(
    shouldFetch ? ["getReservess"] : null,
    getPOTSPrice(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(POTS.mutate);

  return POTS;
}
