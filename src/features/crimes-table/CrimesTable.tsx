import { useSearchParams } from "react-router-dom";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Container,
} from "@chakra-ui/react";
import { useGetLatLong, useGetCrimes, Crime, CrimeList } from "../../api";
import { stringSearchParamsToArray } from "../../utils";
import { Loading, Error } from "../../components";

const groupByCrimeType = (crimeList: Crime[]): { [key: string]: Crime[] } =>
  crimeList.reduce((groupedByCrimeType: CrimeList, currentCrime: Crime) => {
    (groupedByCrimeType[currentCrime.category] =
      groupedByCrimeType[currentCrime.category] || []).push(currentCrime);
    return groupedByCrimeType;
  }, {});

export const CrimesTable = () => {
  const [searchParams] = useSearchParams();
  const postcodes = searchParams.get("postcodes");
  const { data: postcodesWithLatLong, isLoading: waitingForLatLongs } =
    useGetLatLong(stringSearchParamsToArray(postcodes || ""));
  const { data: crimes, isLoading: waitingForCrimes } =
    useGetCrimes(postcodesWithLatLong);

  if (!crimes || waitingForCrimes || waitingForLatLongs) {
    return <Loading />
  }

  const crimesGroupedByCategory = groupByCrimeType(crimes);

  if (crimes.length === 0) {
    return <Error>No crimes found! Try another postcode</Error>
  }

  return (
    <Container m="0" maxW="100%">
      <Tabs variant='soft-rounded' colorScheme='green' p="2">
        <TabList
          overflowX="scroll"
          p="2"
          sx={{
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {Object.keys(crimesGroupedByCategory).map((crimeType) => (
            <Tab css={{ "text-transform": "capitalize" }} minW="max-content" key={crimeType}>
              {crimeType.replace(/-/g, " ")}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {Object.values(crimesGroupedByCategory).map((crimes: Crime[]) => {
            // TODO needs pagination hence slice
            return (
              <TabPanel >
                <TableContainer>
                  <Table variant="fixed">
                    <Thead>
                      <Tr>
                        <Th>Postcode</Th>
                        <Th>Date of crime</Th>
                        <Th>Street</Th>
                        <Th>Outcome</Th>
                      </Tr>
                    </Thead>
                    <Tbody overflow="scroll">
                      {crimes.slice(0, 10).map((crime) => (
                        <Tr key={crime.id}>
                          <Td>{crime.postcode}</Td>
                          <Td>{crime.month}</Td>
                          <Td>{crime.location?.street?.name}</Td>
                          <Td>
                            {crime.outcome_status
                              ? crime.outcome_status.category
                              : "Ongoing"}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Container>
  );
};
