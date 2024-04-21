import {
  useDisclosure,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Header, Sidebar } from "../features/navbar";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
    onToggle: toggleDrawer,
  } = useDisclosure();

  return (
    <>
      <Sidebar
        isOpen={isDrawerOpen}
        onOpen={openDrawer}
        onClose={closeDrawer}
      >
        <List>
          <ListItem>List Item</ListItem>
        </List>
      </Sidebar>
      <Box ml={[0, 2]}>
        <Header toggleSideDrawer={toggleDrawer} />
      </Box>
      <Box
        position={{ base: "relative", md: "fixed" }}
        left={{ base: "0px", md: "300px" }}
        width={{ base: "auto", md: "calc(100% - 300px)" }}
      >
        {children}
      </Box>
    </>
  );
};
