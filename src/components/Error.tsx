import { Heading, Box, HeadingProps } from "@chakra-ui/react";

export const Error: React.FC<HeadingProps> = (props) => (
    <Box m={10} p={4} bgColor="red" borderRadius="lg">
        <Heading as="h5" fontSize="lg" color="white" textAlign="center" {...props} />
    </Box>
);