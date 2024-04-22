import { useQueries } from "@tanstack/react-query";
import { LatLongPostcode } from "./useGetLatLong";

export interface Crime {
  category: string;
  location: {
    street: {
      id: number;
      name: string;
    };
    latitude: number;
    longitude: number;
  };
  outcome_status: {
    category: string;
  };
  id: number;
  month: string;
  postcode: string;
}

interface CrimeDataResponse {
  data?: Crime[];
  isLoading: boolean;
}

export type CrimeList = { [key: string]: Crime[] };

const fetchCrimeData = async ({
  latitude,
  longitude,
  postcode,
}: LatLongPostcode) => {
  const res = await fetch(
    `https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}`
  );
  const data = await res.json();
  return { [postcode]: data };
};

export const useGetCrimes = (
  postcodes: LatLongPostcode[]
): CrimeDataResponse => {
  return useQueries({
    queries: postcodes.map((postcode) => ({
      queryKey: ["crime", postcode.postcode],
      queryFn: () => fetchCrimeData(postcode),
      enabled: !!postcode.postcode,
    })),
    combine: (results) => {
      if (results.some((result) => result.isPending)) {
        return {
          data: undefined,
          isLoading: true,
        };
      }
      const flatCrimeList: Crime[] = results.flatMap((result) => {
        const { data } = result;

        const flattenPostcodeObject = (postcodesWithCrimeList: {
          [x: string]: Crime[];
        }) => {
          const flatCrimeList: Crime[] = [];

          for (const [postcode, crimeList] of Object.entries(
            postcodesWithCrimeList
          )) {
            crimeList.forEach((value: Crime) => {
              flatCrimeList.push({ ...value, postcode });
            });
          }

          return flatCrimeList;
        };
        return flattenPostcodeObject(data || {});
      });

      return {
        data: flatCrimeList,
        isLoading: false,
      };
    },
  });
};
