import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Box,
  Hide,
  Show,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface SideBarProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SideBarProps> = ({
  onClose,
  isOpen,
  children,
  ...rest
}) => {
  return (
    <>
      <Show below="md">
        <Drawer placement="left" onClose={onClose} isOpen={isOpen} {...rest}>
          <DrawerOverlay />
          <DrawerContent bgColor="#7A00E6">
            <DrawerCloseButton />

            <DrawerBody mt="8">{children}</DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
      <Hide below="md">
        <Box as="aside" position="fixed" left={0} top="100px" p={5} w="300px" bg="#7A00E6" h="100%">
          {children}
        </Box>
      </Hide>
    </>
  );
};
