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
} from '@chakra-ui/react'

const DaoPage = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [level, setLevel] = useState('')

  console.log(title)
  const handleSubmit = () => {

  }

  return (
    <Admin meta={<Meta title="Start DAO" description="MentorDAO" />}>
      <h3 className="text-2xl font-bold">Start a DAO</h3>
      <hr className="my-6 opacity-80" />
      <FormControl>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <Input width='200' variant='outline' size='lg' className="my-3 opacity-80" onChange={(event) => setTitle(event.target.value)} id='title' type='title' />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='description'>Description</FormLabel>
        <Input width='200' variant='outline' size='lg' className="my-3 opacity-80" onChange={(event) => setDesc(event.target.value)} id='description' type='description' />
      </FormControl>
      <FormControl>
      <FormLabel htmlFor='country'>Level</FormLabel>
      <Select width='200' size='lg' className="my-3 opacity-80" onChange={(event) => setLevel(event.target.value)} id='level' placeholder='Select level'>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Select>
      </FormControl>
      <Button
        colorScheme='blue'
        mt={4}
        onClick={handleSubmit}
        className="btn-indigo"
      >
        Submit
      </Button>
    </Admin>
  )
};

export default DaoPage;
