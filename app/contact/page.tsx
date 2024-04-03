'use client'
import React from "react";
import Link from "next/link";
import { Icon } from "@chakra-ui/react";
import {
  Box,
  Divider,
  Text,
  Stack,
  FormControl,
  Image,
  Input,
  FormHelperText,
  FormLabel,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";
import { Card, CardFooter } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BiHome, BiLogoFacebook, BiLogoLinkedin, BiLaptop } from "react-icons/bi";

function Page() {
  const onSubmit = (event: any) => {
    event.preventDefault()
    toast.success("Mail Successfully sent!");
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <Icon as={BiHome} className="md:hidden block" />
      <ToastContainer />
      <br />
      <ChakraProvider>
        <Text
          fontWeight={600}
          textAlign={"left"}
          color={"black"}
          fontSize={20}
          mx={4}
          mb={4}
        >
          Mail one of our representatives in the Number8 group:
        </Text>

        <Box
          backgroundColor={"black"}
          borderRadius={6}
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          maxWidth={900}
          mx={4}
        >
          <Box
            borderRadius={6}
            backgroundColor={"black"}
            color={"white"}
            width={{ base: "full", md: "50%" }}
            padding={6}
          >
            <Image
              paddingBottom={10}
              margin={"0 auto"}
              width={120}
              src="https://cdn.number8.com/app/uploads/2023/06/number-8-logo-white.svg"
              alt="number-8"
            />
        <form onSubmit={onSubmit}>
  <Stack spacing={4}>
    <FormControl>
      <FormLabel>Name:</FormLabel>
      <Input type="text" isRequired />
      <FormHelperText fontWeight={500} color={"white"}>
        Just first and second name if you want.
      </FormHelperText>
    </FormControl>

    <FormControl>
      <FormLabel>Email:</FormLabel>
      <Input type="email" isRequired />
      <FormHelperText fontWeight={500} color={"white"}>
        We will never share your email.
      </FormHelperText>
    </FormControl>

    <FormControl>
      <FormLabel>Phone Number:</FormLabel>
      <Input type="text" isRequired />
      <FormHelperText fontWeight={500} color={"white"}>
        We may call you to align some things.
      </FormHelperText>
    </FormControl>

    <FormControl>
      <FormLabel>Subject:</FormLabel>
      <Input type="text" isRequired />
      <FormHelperText fontWeight={500} color={"white"}>
        Tell us about your interest.
      </FormHelperText>
    </FormControl>
  </Stack>

  <Button mt={4} variant={"ghost"} colorScheme="blue" type="submit">
    Submit
  </Button>
</form>

          </Box>

          <Card
            width={{ base: "full", md: "50%" }}
            fontWeight={600}
            color={"white"}
            direction={"column"}
            align={"center"}
            justify={"center"}
            padding={6}
            backgroundColor={"none"}
          >
            <Image
              margin={"0 auto"}
              src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
              alt="image"
              className="h-10"
            />
            <Text
              align={"center"}
              fontSize={20}
              color={"white"}
              mt={4}
              mb={4}
            >
              Thanks for trusting our job.
            </Text>
            <Divider />
            <CardFooter flexDirection={'column'} color={'white'} mt={4}>
              Our Social Medias:
              <Stack className="py-2" direction={'row'} spacing={6}>
                <Link href='https://www.linkedin.com/company/number-8-it/'><Icon transition='.3s ease' _hover={{color:'rgb(0,140,255)'}} boxSize={'30px'} as={BiLogoLinkedin} /></Link>
                <Link href='https://www.facebook.com/number8.dev/'><Icon transition='.3s ease' _hover={{color:'rgb(0,140,255)'}} boxSize={'30px'} as={BiLogoFacebook} /></Link>
                <Link href='https://number8.com/en/'><Icon transition='.3s ease' _hover={{color:'rgb(0,140,255)'}} boxSize={'30px'} as={BiLaptop} /></Link>
              </Stack>
            </CardFooter>
          </Card>
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default Page;
