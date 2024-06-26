import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Heading,
  HStack,
  Show,
  FlexProps,
} from "@chakra-ui/react";
import { Search } from "../search";

interface HeaderProps extends FlexProps {
  openDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  openDrawer,
  ...rest
}) => {
  return (
    <Flex
      w="100%"
      flexDir={{ base: "column", md: "row" }}
      p={4}
      bgColor="#FDB018"
      {...rest}
    >
      <HStack gap="0">
        <Show below="md">
          <IconButton
            icon={<ChevronRightIcon w={8} h={8} />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={openDrawer}
            aria-label={"Toggle Side Drawer Navigation"}
          />
        </Show>

        <Heading flexGrow="2" textAlign="center">
          Search UK Crimes
        </Heading>
        
      </HStack>
      <Search ml={[0, 4]} />
    </Flex>
  );
};
