import { useQueries } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

const POSTCODE_API_BASE_URL = "http://api.getthedata.com/postcode/";

export type LatLongPostcode = {
  postcode: string;
  latitude: string;
  longitude: string;
};

const getLatLong = async (postcode: string) => {
  const res = await fetch(`${POSTCODE_API_BASE_URL}/${postcode}`);
  return await res.json();
};

export const useGetLatLong = (postcodes: string[]) => {
  const toast = useToast();
  return useQueries({
    queries: postcodes.map((postcode) => {
      return {
        queryKey: ["lat-long", postcode],
        queryFn: () => getLatLong(postcode),
        refetchOnMount: false,
        enabled: !!postcodes,
        onError: () => {
          toast({
            title: "Something went wrong!",
            description: "Please try searching postcodes again. We're sorry!",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      };
    }),
    combine: (results) => {
      const validPostCodes = results.filter(
        (result) => result.data?.status === "match"
      );
      const postCodesWithLatLong: LatLongPostcode[] = validPostCodes.map(
        ({
          data: {
            data: { postcode, longitude, latitude },
          },
        }) => ({ postcode, longitude, latitude })
      );
      return {
        data: postCodesWithLatLong,
        isLoading: results.some((result) => result.isLoading),
      };
    },
  });
};
