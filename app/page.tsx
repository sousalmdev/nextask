/* eslint-disable jsx-a11y/aria-proptypes */
'use client';

import React, { useState, useEffect,useRef } from "react";
import { BiCheck, BiFilter, BiHome, BiLogoOkRu, BiSearch, BiSolidCheckCircle, BiSolidConfused, BiSolidHeart, BiSolidSearch } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
import { Card, CardBody, CardFooter, ChakraProvider } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderThumb,
  RangeSliderFilledTrack,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icon";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  ButtonGroup,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Box,
  Select,useDisclosure
} from "@chakra-ui/react";
import data from "./assets/data.json";
import Link from "next/link";

const OverlayTwo = () => (
  <ModalOverlay
    bg="none"
    backdropFilter="blur(4px)"
    backdropBlur="2px"
  />
);

interface HouseAtt {
  Id: number;
  DateListed: string;
  Title: string;
  Description: string;
  "Sale Price": number;
  ThumbnailURL: string;
  PictureURL: string;
  Location: string;
  Sqft: number;
  Bedrooms: number;
  Bathrooms: number;
  Parking: number;
  YearBuilt: number;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<HouseAtt | null>(null);
  const [bedrooms, setBedrooms] = useState<number | undefined>(undefined);
  const [bathrooms, setBathrooms] = useState<number | undefined>(undefined);
  const [parking, setParking] = useState<number | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 800000]);
  const [filteredHouses, setFilteredHouses] = useState<HouseAtt[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [applyFilters, setApplyFilters] = useState(false); 
  const [favorites, setFavorites] = useState<HouseAtt[]>([]);
  const btnRef = React.useRef(null)

  const { isOpen: isAddToFavoritesOpen, onOpen: onOpenAddToFavorites, onClose: onCloseAddToFavorites } = useDisclosure();
  useEffect(() => {
      const filtered = data.filter((house) => {
        return (
          (!bedrooms || house.Bedrooms === bedrooms) &&
          (!bathrooms || house.Bathrooms === bathrooms) &&
          (!parking || house.Parking === parking) &&
          house["Sale Price"] >= priceRange[0] &&
          house["Sale Price"] <= priceRange[1]
        );
      });
      setFilteredHouses(filtered);
  }, [bedrooms, bathrooms, parking, priceRange]
  )
  const handleViewDetails = (house: HouseAtt) => {
    setSelectedHouse(house);
    setIsOpen(true);
  };

  const FavoriteHouseCard = ({ house }: { house: HouseAtt }) => {
    const handleRemoveFromFavorites = () => {
      removeFromFavorites(house);
    };
  
    return (
      <Box
        backgroundColor="white"
        boxShadow="md"
        borderRadius="md"
        p={4}
        maxW="sm"
        borderWidth="1px"
        color={'black'}
      >
        <Image src={house.ThumbnailURL} alt={house.Title} borderRadius="md" />
        <Stack spacing={2} mt={4}>
          <Text fontWeight="bold">{house.Title}</Text>
          <Text>{house.Location}</Text>
          <Text fontSize="lg" fontWeight="bold" color="blue.400">
            ${house["Sale Price"]}
          </Text>
          <ButtonGroup spacing={5}>
            <Link href={`/contact`} passHref>
              <Button colorScheme="blue">Buy</Button>
            </Link>
            <Button colorScheme="red" onClick={ () => {
      handleRemoveFromFavorites();
      if (favorites.length === 1) {
        onCloseAddToFavorites();
      }
      }}>Delete</Button>
      <Button onClick={() => handleViewDetails(house)}><Icon as={BiSearch} /></Button>
          </ButtonGroup>

        </Stack>
      </Box>
    );
  };
  const addToFavorites = (house: HouseAtt) => {
    const isAlreadyAdded = favorites.some((fav) => fav.Id === house.Id);
  
    if (!isAlreadyAdded) {
      setFavorites([...favorites, house]);
    }
  };
  
  const removeFromFavorites = (house: HouseAtt) => {
    const updatedFavorites = favorites.filter((item) => item.Id !== house.Id);
    setFavorites(updatedFavorites);
  };
  const clearFilters = () => {
    setBedrooms(undefined);
    setBathrooms(undefined);
    setParking(undefined);
    setPriceRange([0, 800000]);
    setApplyFilters(true);
    const defaultPriceRange:[number,number] = [0, 800000];
    setPriceRange(defaultPriceRange); // Aplicar os filtros após limpar
  };

  const handleClose = () => setIsOpen(false);
  const handleOpenFilterModal = () => setIsFilterModalOpen(true);
  const handleCloseFilterModal = () => setIsFilterModalOpen(false);

  return (     
    <>
    <header className="min-w-screen bg-black bg-opacity-80 fixed z-50 top-0 left-0 w-full  p-2 flex items-center text-white justify-between ">
  <h1 className="flex md:text-3xl text-lg font-bold">
    HOUSES{" "}
    <span className="text-blue-400 bg-clip-text">8</span>
  </h1> 
  <nav className="px-5 flex items-center">
    <div className="flex items-center">
      <Icon
        as={BiSolidHeart}
        color={"white"}
        cursor="pointer"
        h={30}
        w={30}
        onClick={onOpenAddToFavorites}
        marginRight={10}
      />
      <Icon
        color={"white"}
        as={BiFilter}
        cursor="pointer"
        h={30}
        w={30}
        onClick={handleOpenFilterModal}
      />
    </div>
  </nav>
</header>
    <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
<ChakraProvider>
    <Modal
        finalFocusRef={btnRef}
        scrollBehavior='inside'
        isOpen={isAddToFavoritesOpen}
        onClose={onCloseAddToFavorites}
      >
        <ModalContent
        bgColor={'rgb(70,140,255)'}
        right={140}
        width={300}
        position={'absolute'}
        color={'white'}
        >
     <ModalHeader>
  Properties you loved <span><Icon as={BiSolidHeart} /></span>
</ModalHeader>
<ModalCloseButton />
<ModalBody>
  {favorites.length > 0 ? (
    <Stack spacing={4}>
      {favorites.map((house) => (
        <FavoriteHouseCard key={house.Id} house={house} />
      ))}
    </Stack>
  ) : (
    <Stack spacing={4} alignItems="center">
      <Icon as={BiSolidConfused} boxSize={60} color="white" />
      <Text fontSize="xl">Nothing Here</Text>
    </Stack>
  )}
</ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" variant={'ghost'} mr={3} onClick={onCloseAddToFavorites}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

        <Modal
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilterModal}
          isCentered
        >
          <ModalOverlay />
          <ModalContent position="fixed" top={20} right={35}>
            <ModalHeader
              backgroundColor="rgba(0, 140, 255, 0.8)"
              color="white"
              textAlign="center"
              fontSize="xl"
              py={4}
            >
              Filter by:
            </ModalHeader>
            <ModalBody>
              <Stack spacing={4} mb={4}>
                <Select
                  placeholder="Bedrooms"
                  value={bedrooms || ""}
                  onChange={(e) => setBedrooms(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </Select>
                <Select
                  placeholder="Bathrooms"
                  value={bathrooms || ""}
                  onChange={(e) => setBathrooms(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </Select>
                <Select
                  placeholder="Parking"
                  value={parking || ""}
                  onChange={(e) => setParking(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </Select>
                <Box>
                  <RangeSlider
                    aria-label={['1', '2']}
                    defaultValue={[priceRange[0],priceRange[1]]}
                    min={0}
                    max={800000}
                    onChange={(value) => setPriceRange([value[0], value[1]])}
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} defaultValue={0} />
                    <RangeSliderThumb index={1} />
                  </RangeSlider>
                  <Box textAlign="center" mt={2}>
                    From ${priceRange[0]} to ${priceRange[1]}
                  </Box>
                </Box>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup marginRight={'110px'} spacing={5} alignSelf={'start'}>
       
                <Button variant={'ghost'} colorScheme="gray" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </ButtonGroup>
              <Button colorScheme="red" mr={3} onClick={handleCloseFilterModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <div className="py-5 px-4 sm:px-10 md:px-20 lg:px-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredHouses.map((house, index) => (
            <Card
              backgroundColor="rgba(256,256,256)"
              color="black"
              key={index}
              maxW="sm"
            >
              <CardBody display="flex" flexDirection="column">
                <Image
                  justifySelf="center"
                  src={house.ThumbnailURL}
                  alt={house.Title}
                  borderRadius="sm"
                  width="300px"
                  height="200px"
                />
                <Stack mt="6" spacing="3">
                  <Heading width={"80%"} size="md" textTransform="uppercase">
                    {house.Title}
                  </Heading>
                  <Text>{house.Location}</Text>
                </Stack>
              </CardBody>
              <Text ml={6} color="blue.400" fontSize="2xl">
                ${house["Sale Price"]}
              </Text>
              <CardFooter>
                <ButtonGroup className="w-11/12 mt-4 self-center flex justify-evenly">
                  <Button
                    fontSize="smaller"
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => handleViewDetails(house)}
                  >
                    Details
                  </Button>
                  <Popover>
      <PopoverTrigger>
        <Button
          fontSize="smaller"
          variant="ghost"
          colorScheme="blue"
          onClick={() =>  addToFavorites(house)}
        >
         Favorites <span className="pl-1 mb-1"><Icon as={BiSolidHeart}/></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent bgColor={'white'}>
        <PopoverHeader color={'rgb(0,140,255)'} >Successfully added on Favorites! <span><Icon color={'rgb(0,140,255)'} marginBottom={3} as={BiSolidCheckCircle} /></span></PopoverHeader>
        <PopoverArrow />
        <PopoverBody  color={'rgb(0,140,255)'} paddingBlock={5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          To see your favorite houses, click on the heart symbol on the top right corner.
        </PopoverBody>
      </PopoverContent>
    </Popover>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Modal isCentered isOpen={isOpen} onClose={handleClose}>
          {selectedHouse && (
            <>
              <OverlayTwo />
              <ModalContent display="flex" alignItems="center" padding="8px">
                <ModalHeader>
                  <Image
                    src={selectedHouse.PictureURL}
                    display="flex"
                    width="400px"
                    alt={selectedHouse.Title}
                  />
                </ModalHeader>
                <ModalBody>
                  <Text textAlign="center" fontWeight="700" fontSize="larger">
                    {selectedHouse.Title} at {selectedHouse.Location}
                  </Text>
                  <br />
                  <Text
                    textAlign="center"
                    fontWeight="500"
                    fontSize="medium"
                    color={"gray"}
                  >
                    Listed at: {selectedHouse.DateListed}
                  </Text>
                  <br />
                  <Text fontSize="13">{selectedHouse.Description}</Text>
                </ModalBody>
                <br />
                <Stack
                  paddingInline={5}
                  spacing={8}
                  backgroundColor="white"
                  direction="row"
                  fontWeight={600}
                >
                  <Text color={"blue.400"} textAlign={"center"}>
                    {selectedHouse.Bathrooms} <br />
                    <span className="text-black uppercase">Baths</span>
                  </Text>
                  <Text color={"blue.400"} textAlign={"center"}>
                    {selectedHouse.Bedrooms} <br />
                    <span className="text-black uppercase">Beds</span>
                  </Text>
                  <Text color={"blue.400"} textAlign={"center"}>
                    {selectedHouse.Sqft} <br />
                    <span className="text-black uppercase">SQFT</span>
                  </Text>
                  <Text color={"blue.400"} textAlign={"center"}>
                    {selectedHouse.YearBuilt} <br />
                    <span className="text-black uppercase">Year</span>
                  </Text>
                  <Text color={"blue.400"} textAlign={"center"}>
                    {selectedHouse.Parking} <br />
                    <span className="text-black uppercase">Parkings</span>
                  </Text>
                </Stack>
                <br />
                <Text
                  fontSize={30}
                  color={"blue.400"}
                  fontWeight={600}
                  textAlign={"center"}
                >
                  ${selectedHouse["Sale Price"]}
                </Text>
                <Divider />
                <ModalFooter>
                  <ButtonGroup paddingTop={3} spacing={20}>
                    <Link href={`/contact`} passHref>
                      <Button colorScheme="blue">I want it!</Button>
                    </Link>
                    <Button
                      colorScheme="gray"
                      variant="ghost"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  </ButtonGroup>
                </ModalFooter>
              </ModalContent>
            </>
          )}
        </Modal>
</ChakraProvider>
   </div></>
    );   
}
