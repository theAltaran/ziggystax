import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import {
  Button,
  SimpleGrid,
  Box,
  Text,
  Heading,
  Img,
  Center,
  HStack,
  VStack,
  Badge,
  Input,
  Link,
  Spinner,
} from "@chakra-ui/react"
import { useState } from "react";
import useTokenBalance from "../hooks/useTokenBalance";
import useMinter from "../hooks/useMinter"
import useTokenContract from "../hooks/useTokenContract";
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from "ethers";
import useMyMiners from "../hooks/useMyMiners";
import useFPS from "../hooks/useFPS";
import useBAL from "../hooks/useAvailBalance"
import useCountdown from "../hooks/useCountdown";
import useCakeApproval from "../hooks/useCakeApproval";
import useCakeBaking from "../hooks/useCakeBaking";
var isLoading = false;
function Home() {
  
  const { account, library } = useWeb3React();
  const triedToEagerConnect = useEagerConnect();
  const [CAKE, setCAKE] = useState('');
  const [miners, setMiners] = useState('');
  const balCAKE = useTokenBalance(account, "0x3fcca8648651e5b974dd6d3e50f61567779772a8")
  const cakeContract = useTokenContract("0x3fcca8648651e5b974dd6d3e50f61567779772a8")
  const miner = useMinter()
  const isConnected = typeof account === "string" && !!library;
  const router = useRouter()
  const myMiners = useMyMiners(account)
  const FPS = useFPS(account)
  const preFeeBAL = useBAL(account)
  const date = useCountdown(account)
  const isCakeApproved = useCakeApproval("0x219A0De2813d8DEee2dBcb2cc2A738e36423dFfF", account);
  const cakeBal = useCakeBaking();
  const BAL = (Number(preFeeBAL.data) * 0.95).toFixed(6)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.href;
      const split = hostname.split("=")
      const ref = split[1]
   }
  })


  async function approveCAKE(amount: any) {
    isLoading = true;
    const approve = await cakeContract.approve("0x219A0De2813d8DEee2dBcb2cc2A738e36423dFfF", amount)
  }
  async function investCAKE(amount: any){
    const hostname = window.location.href;
      let ref
      const split = hostname.split("=")
      var data = split[1]
      if(data && data.length > 10){
         ref = data
      } else {
         ref = account
      }
    const invest = await miner.investPots(ref, amount)
  }
  async function compoundCAKE(){
    const hostname = window.location.href;
      let ref
      const split = hostname.split("=")
      var data = split[1]
      if(data && data.length > 10){
         ref = data
      } else {
         ref = account
      }
    const compound = await miner.compoundPots(ref)
  }
  async function sellCAKE(){
    const pop = await miner.sellPots()
  }

  return (
    <Box bg="#393960" minW="100vw" minH="100vh">
    <>
      <Head>
        <title>Ziggystax POTS Minting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <Center pt={5}>
          <VStack>
          <Button colorScheme="yellow"><Account triedToEagerConnect={triedToEagerConnect} /></Button>
          <Heading px={10} size="md" as="a" href="https://cakestax.money" color="white">Looking to bake CAKE? Click here for CakeStax.</Heading>
          </VStack>
          </Center>
          <SimpleGrid column={5} spacing={5} justifyItems="center">
          <Box borderRadius="30px" mt="2em" boxShadow="lg" bg="#4C4C80" alignItems="center" width={{base: "90vw", md: "40vw"}}>
          <Center>
            <HStack>
            <Img maxW="100px" maxH="100px" p="1em" src="/pots.svg" />
            <Heading fontSize={{base: "xl", md: "3xl"}} color="#B4B3CC" p={{base: 0, md: 5}}>Ziggystax POTS Minter</Heading>
            <Img maxW="100px" maxH="100px" p="1em" src="/pots.svg" />
            </HStack>
          </Center>
          <Center>
            <HStack>
              {isConnected ?<>
            <Text color="#B4B3CC" fontSize={{base: "md", md: "xl"}} p={3}>{cakeBal.data} Total POTS being mined.</Text></> :
             <><Text color="#B4B3CC" p={1}>Please Connect To MetaMask.</Text></>
              }
            </HStack>
          </Center>
            <Center>
            <HStack pb={5}>
            <Badge ml="1" fontSize="1em" colorScheme="yellow">3% DAILY</Badge>
            <Badge ml="1" fontSize="1em" colorScheme="yellow">1,095% APR</Badge>
            </HStack>
            </Center>
          </Box>
        
          <Center borderRadius="30px" boxShadow="lg" bg="#4C4C80" alignItems="center" width={{base: "90vw", md: "40vw"}}>
          <VStack p={5}>
              <Text color="#B4B3CC" p={1}>1. Enter POTS Amount Below and Approve Spend</Text>
              <Input textColor="white" onChange={event => setCAKE(event.target.value)} value={CAKE} placeholder="Amount of POTS" />
              <HStack>
              {isConnected ? <>
              <Button variant="link" onClick={(e) => setCAKE(balCAKE.data)}>{balCAKE.data}</Button>
              <Text color="#B4B3CC" p={1}>available POTS</Text></> :
              <Spinner mb={3} color="blue.500" />
              }
              </HStack>
              {!isCakeApproved.data ? 
              <Button isLoading={isLoading} onClick={() => approveCAKE(ethers.utils.parseEther(CAKE))}colorScheme="yellow">Approve POTS Spend</Button> :
              <Button isLoading={false} onClick={() => approveCAKE(ethers.utils.parseEther(CAKE))}colorScheme="yellow">Approve Additional POTS Spend</Button>
              }
            </VStack>
          </Center>
          <Center borderRadius="30px" boxShadow="lg" bg="#4C4C80" alignItems="center" width={{base: "90vw", md: "40vw"}}>
          <VStack p={5}>
              <Text color="#B4B3CC" p={1}>2. Exchange POTS To Hire Cadets. Cadets mine the moon for more POTS!</Text>
              <Input textColor="white" onChange={event => setMiners(event.target.value)} value={miners} placeholder="Amount of POTS" />
              <HStack>
              {isConnected ? <>
              <Button variant="link" onClick={(e) => setMiners(balCAKE.data)}>{balCAKE.data}</Button>
              <Text color="#B4B3CC" p={1}>available POTS</Text></> :
              <Spinner mb={3} color="blue.500" />
              }
              </HStack>
              <Button onClick={() => investCAKE(ethers.utils.parseEther(miners))} colorScheme="yellow">Hire Cadets</Button>
            </VStack>
          </Center>
          <Center borderRadius="30px" boxShadow="lg" bg="#4C4C80" alignItems="center" width={{base: "90vw", md: "40vw"}}>
          <VStack p={5}>
              {isConnected ? <>
              <Text color="#B4B3CC" fontSize="2xl" fontWeight="semibold">{myMiners.data} Hired Cadets</Text>
              <Text color="#B4B3CC" fontSize="2xl" fontWeight="semibold">{BAL} Mined POTS</Text>
              <Text color="#B4B3CC" fontSize={{base:"lgs", md:"2xl"}} fontWeight="semibold">Your POTS will be fully mined on:<br/> {date.data}</Text></> :
              <Spinner mb={3} color="blue.500" />
              }
            <SimpleGrid columns={{base:1, md:2}} spacing={3}>
            <Button onClick={() => compoundCAKE()} colorScheme="yellow">Hire More Cadets</Button>
            <Button onClick={() => sellCAKE()} colorScheme="yellow">Pocket mined POTS</Button>
            </SimpleGrid>
            </VStack>
    
          </Center>
          <Center mb={5} borderRadius="30px" boxShadow="lg" bg="#4C4C80" alignItems="center" width={{base: "90vw", md: "40vw"}}>
          <VStack p={5}>
              <Text color="#B4B3CC" fontSize="md" fontWeight="semibold">Use your referral link to earn free Cadets!</Text>
              {isConnected ? <>
              <Link href={`https://ziggystax.money?ref=${account}`}><Text color="#B4B3CC" fontSize="10px" fontWeight="semibold">https://ziggystax.money?ref={account}</Text></Link></> :
              <Spinner mb={3} color="blue.500" />
              }
            </VStack>
    
          </Center>
          </SimpleGrid>
          
       </>
       </Box>
  );
}

export default Home;
