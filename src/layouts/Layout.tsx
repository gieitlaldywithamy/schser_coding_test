import { useDisclosure, Box } from "@chakra-ui/react";
import { Header, Sidebar } from "../features/navbar";
import { SearchHistory } from "../features/search-history";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
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
      <Box ml={[0, 2]}>
        <Header openDrawer={openDrawer} />
      </Box>
      <Box
        position={{ base: "relative", md: "fixed" }}
        left={{ base: "0px", md: "300px" }}
        top="100px"
        width={{ base: "auto", md: "calc(100% - 300px)" }}
      >
        {children}
      </Box>
    </>
  );
};
