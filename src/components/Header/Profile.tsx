import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps{
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps){
    return (
        <Flex align="center">
        { showProfileData && (
            <Box mr="4" textAlign="right">
            <Text>Gislaine Mello</Text>
            <Text color="gray.300" fontSize="small">
            gislaine@rocketseat.com.br
            </Text>
        </Box>
        )}

        <Avatar size="md" name="Gislaine Mello" src="https://github.com/gimelloc.png" />
    </Flex>
    )
}