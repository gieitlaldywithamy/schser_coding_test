import { useDisclosure, Box } from "@chakra-ui/react";
import { Header, Sidebar } from "../features/navbar";
import { SearchHistory } from "../features/search-history";

export const AppContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  return (
    <>
      <Sidebar isOpen={isDrawerOpen} onClose={closeDrawer}>
        <SearchHistory />
      </Sidebar>
      <Box>
        <Header openDrawer={openDrawer} />
      </Box>
      <Box
        position={{ base: "relative", md: "fixed" }}
        left={{ base: "0px", md: "300px" }}
        top="auto"
        p="2"
        bg="#f0eddd"
        width={{ base: "auto", md: "calc(100% - 300px)" }}
        height={{ base: "calc(100vh - 100px)", md: "100%" }}
      >
        {children}
      </Box>
    </>
  );
};
