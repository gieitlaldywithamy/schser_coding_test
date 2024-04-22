import {
  StackProps,
  Flex,
  Button,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

const replacePlusWithSpace = (input: string) => input?.replace('+',"_") || '';

export const SearchHistory: React.FC<StackProps> = (props) => {
  const [searchHistory, setSearchHistory] = useLocalStorage(
    "postcodes",
    [] as string[]
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const removeFromSearchParams = useCallback((postcode: string) => {
    const currentQueryParams = searchParams.get("postcodes");
    const newSearchParams = currentQueryParams
      ?.split(",")
      .filter(
        (postcodeQueryParam) =>
          replacePlusWithSpace(postcode) !== postcodeQueryParam
      );
    if (!newSearchParams || newSearchParams.length < 1 ) {
      searchParams.delete("postcodes");
      setSearchParams({});
    }
    searchParams.set("postcodes", newSearchParams?.join(",") || '');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return (
    <Flex direction="column"
      gap={2}
      m={2}
      width="100%"
      {...props}>
        {searchHistory.map((postcode) => {
          return (
            <Flex key={postcode} bgColor="#f0eddd" justifyContent="space-between" alignItems="center" borderRadius="md" p="4">
              <ChakraLink
                as={ReactRouterLink}
                to={`/crimes?postcodes=${postcode}`}
              >
                {postcode.replace("+", " ")}
              </ChakraLink>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => {
                  setSearchHistory(
                    searchHistory.filter((item) => item !== postcode)
                  );
                  removeFromSearchParams(postcode);
                }}
              >
                Delete
              </Button>
            </Flex>
          );
        })}
    </Flex>
  );
};
