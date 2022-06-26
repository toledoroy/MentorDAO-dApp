import  React from 'react';
import { useState } from 'react';
import { Admin } from "@/templates/Admin";
import { Meta } from "@/templates/Meta";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react'
import { create } from "ipfs-http-client";
import { ethers } from 'ethers'
const createValist = require('@valist/sdk').create;
import Web3HttpProvider from 'web3-providers-http';


const client = create('https://ipfs.infura.io:5001/api/v0');

const DaoPage = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [level, setLevel] = useState('')
  const [urlArr, setUrlArr] = useState([]);
  const [projectID, setProjectId] = useState("")

  async function setProject(){
    try {
        const web3 = new Web3HttpProvider("https://rpc.valist.io/polygon");
  
        const privateKey = ethers.Wallet.createRandom();
        const wallet = new ethers.Wallet(privateKey);
  
        const provider = new ethers.providers.Web3Provider(web3);
        const valist = await createValist(provider, { wallet, metaTx: true });
        const accountID = valist.generateID(137, 'acme-co');
        const projectID = valist.generateID(accountID, 'go-binary')
        setProjectId(projectID)      
    } catch (err) {
      console.log(err)
    }
  }

  console.log(urlArr)
  async function createNewDAO() {   
    /* saves post to ipfs then anchors to smart contract */
    if (!title || !desc) return
    await setProject();
    const hash = await saveDaoToIpfs()
    await saveDao(hash)
    await license()
    router.push(`/`)
  }

  async function license(projectID){
    try {
        const releaseID = await valist.getLatestReleaseID(projectID)
    
        const projectMeta = await valist.getProjectMeta(projectID);
        const latestRelease = await valist.getReleaseMeta(releaseID);
    
        console.log(projectMeta);
        console.log(latestRelease);
    } catch (err) {
      console.log(err)
    }
  }

  async function saveDao(hash) {
    /* anchor post to smart contract */
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contractAddress = 'address';
      const contract = new ethers.Contract(contractAddress, 'abi', signer)
      console.log('contract: ', contract)
      try {
        const val = await contract.createDao(title, hash)
        /* optional - wait for transaction to be confirmed before rerouting */
        /* await provider.waitForTransaction(val.hash) */
        console.log('val: ', val)
      } catch (err) {
        console.log('Errorr: ', err)
      }
    }    
  }


    async function saveDaoToIpfs() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const dao = {
        title,
        desc,
        level,
        projectID,
      }
      
      /* save post metadata to ipfs */
      try {
        const added = await client.add(JSON.stringify(dao))
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;

        setUrlArr(prev => [...prev, url]);    
        return added.path
      } catch (err) {
        console.log('error: ', err)
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
