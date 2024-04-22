import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { removeDuplicates, replaceSpaceWithPlus } from "../../utils";

const isValidPostcodeSeparatedList = (postcodes: string) => /^(?:[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2},)*[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/.test(postcodes);


export const Search: React.FC = () => {
    const searchInput = useRef<HTMLInputElement>(null);

    const toast = useToast();
    const navigate = useNavigate();

    const [searchHistory, setSearchHistory] = useLocalStorage('postcodes', [] as string[] )
    const [searchInvalid, setSearchInvalid] = useState(false);

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!searchInput.current) {
            return;
        }
        const postcodesInput = searchInput.current.value;
        if (!isValidPostcodeSeparatedList(postcodesInput )) {
            toast({
                title: 'Postcode search failed.',
                description: "Please enter in format KA9 2DF,PA1 1TF (note no space between postcodes!)",
                status: 'error',
                duration: 9000,
                isClosable: true,
              });
              setSearchInvalid(true);
              return;
        }
        const newPostcodeHistory = removeDuplicates(replaceSpaceWithPlus(postcodesInput).split(',').concat(searchHistory));
        setSearchHistory(newPostcodeHistory);
        navigate(`/crimes/?postcodes=${postcodesInput.replace(/ /g, '+')}`);
    }

    return (
        <Box p="4" flexGrow="2">
            <form onSubmit={handleSubmit}>
                <InputGroup bg="#6012a6" color="whiteAlpha.800" borderColor="#A0AEC0">
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='whiteAlpha.800' />
                    </InputLeftElement>
                    <Input colorScheme="blackAlpha" ref={searchInput} isInvalid={searchInvalid} required placeholder="Enter postcode or postcodes in comma separated list" />
                </InputGroup>
            </form>
        </Box>

    )
}