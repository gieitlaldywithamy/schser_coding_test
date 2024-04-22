import { useSearchParams } from "react-router-dom";

import {
  Table,
  Thead,
  Tbody,
  Text,
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
import { useGetLatLong } from "../../api/useGetLatLong";
import { stringSearchParamsToArray } from "../../utils";
import { useGetCrimes } from "../../api/useGetCrimes";

export const Crimes = () => {
  const [searchParams] = useSearchParams();
  const postcodes = searchParams.get("postcodes");
  const { data: postcodesWithLatLong, isLoading: waitingForLatLongs } =
    useGetLatLong(stringSearchParamsToArray(postcodes || ""));
  const { data: crimes, isLoading: waitingForCrimes } =
    useGetCrimes(postcodesWithLatLong);

  if (!crimes || waitingForCrimes || waitingForLatLongs) {
    return <Text>Loading</Text>;
  }

  return (
    <Container m="0" maxW="100%">
      <Tabs>
        <TabList
          overflowX="scroll"
          sx={{
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {Object.keys(crimes).map((crimeType) => (
            <Tab css={{ "text-transform": "capitalize" }} minW="max-content">
              {crimeType.replace(/-/g, " ")}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {Object.values(crimes).map((crimes) => {
            // TODO needs pagination hence slice
            return (
              <TabPanel>
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
