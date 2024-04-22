import { Stack, Skeleton } from "@chakra-ui/react";

export const Loading: React.FC = () => (
  <Stack>
    <Skeleton height="20px" />
    <Skeleton height="20px" />
    <Skeleton height="20px" />
  </Stack>
);
