import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Heading,
  HStack,
  Show,
  FlexProps,
} from "@chakra-ui/react";

interface HeaderProps extends FlexProps {
  toggleSideDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  toggleSideDrawer,
  ...rest
}) => {
  return (
    <Flex
      w="100%"
      flexDir={{ base: "column", md: "row" }}
      bg="#CBD5E0"
      {...rest}
    >
      <HStack pt="4" px="2">
        <Show below="md">
          <IconButton
            icon={<ChevronRightIcon w={8} h={8} />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={toggleSideDrawer}
            aria-label={"Toggle Side Drawer Navigation"}
          />
        </Show>

        <Heading flexGrow="2" textAlign="center">
          Search UK Crimes
        </Heading>
      </HStack>
    </Flex>
  );
};
