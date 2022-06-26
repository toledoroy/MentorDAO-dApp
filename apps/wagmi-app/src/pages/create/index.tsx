// @ts-nocheck
import  React from 'react';
import { useState } from 'react';
import { Admin } from "@/templates/Admin";
import { Meta } from "@/templates/Meta";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import abiHub from '../../../../../contracts/abi/hub.json'

const DaoPage = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [level, setLevel] = useState('')
  const [urlArr, setUrlArr] = useState([]);
  const [projectID, setProjectId] = useState("123")
  const [isLoading, setIsLoading] = useState(false)
  const [nfts, setNFTs] = useState(false)
  const contractAddress = '0x402D30e7Dba9BE455203A9d02bAB122bc5F59549';


  /**
   * Fetch NFTs via COVALENT NFT API
   * https://www.covalenthq.com/docs/api/#/0/Class-A/Get-changes-in-token-holders-between-two-block-heights/lng=en
   */
  async function offersGetCov(contractHash) {
    // const chain = '137'; //Polygon
    // const chain = '80001'; //Mumbai
    // let res = await
    fetch(
      `https://api.covalenthq.com/v1/137/tokens/${contractHash}/nft_token_ids/?key=ckey_3cf63e4335e74f97a35b9f16bb1`,
      // `https://api.covalenthq.com/v1/80001/tokens/${contractHash}/nft_token_ids/?key=ckey_3cf63e4335e74f97a35b9f16bb1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        console.warn("[TEST] covalenthq Contract's NFTs:", response?.data?.items);
        response?.data?.items ? setNFTs(response?.data?.items) : setNFTs([]);
        //Done Loading
        setIsLoading(false);
        return response;
      })
      .catch((err) => {
        console.error(err);
        //Done Loading
        setIsLoading(false);
        //Has Error
        setError(err);
      });
    // console.warn("[TEST] covalenthq Contract's NFTs:", res);
  }

  async function setProject(){
    try {
        setProjectId("projectID")      
    } catch (err) {
      console.log(err)
    }
  }

  console.log(urlArr)
  async function createNewDAO() {   
    /* saves post to ipfs then anchors to smart contract */
    if (!title || !desc || !level) return
    await saveDao('hash')
    await license()
    const response = await offersGetCov(contractAddress)
    console.log("response")
    console.log(response)
  }

  async function license(){
    try {
        console.log("latestRelease");
    } catch (err) {
      console.log(err)
    }
  }

  async function saveDao(hash) {
    /* anchor post to smart contract */
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abiHub, signer)
      console.log('contract: ', contract)
      try {
        const val = await contract.teamDAOMake(title, hash)
        /* optional - wait for transaction to be confirmed before rerouting */
        /* await provider.waitForTransaction(val.hash) */
        console.log('val: ', val)
      } catch (err) {
        console.log('Errorr: ', err)
      }
    }    
  }

  return (
    <Admin meta={<Meta title="Start DAO" description="MentorDAO" />}>
      <h3 className="text-2xl font-bold">Start a micro DAO</h3>
      <hr className="my-6 opacity-80" />
      <FormControl>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <Input width='200' variant='outline' size='lg' className="my-3 opacity-80 py-1 px-1" onChange={(event) => setTitle(event.target.value)} id='title' type='title' />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='description'>Description</FormLabel>
        <Textarea width='200' variant='outline' size='lg' className="my-3 opacity-80 py-1 px-1" onChange={(event) => setDesc(event.target.value)} id='description' type='description' />
      </FormControl>
      <FormControl>
      <FormLabel htmlFor='country'>Level</FormLabel>
      <Select width='200' size='lg' className="my-3 opacity-80 px-1 py-1" onChange={(event) => setLevel(event.target.value)} id='level' placeholder='Select level'>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Select>
      </FormControl>
      <Button
        colorScheme='blue'
        mt={4}
        onClick={(e) => createNewDAO()}
        className="btn-indigo btn-sm py-2 px-2"
        type="submit"
      >
        Submit
      </Button>
    </Admin>
  )
};

export default DaoPage;
