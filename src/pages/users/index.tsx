import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, Link } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { useUsers } from "@/services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "@/services/queryClient";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import { getUsers } from '../../services/hooks/useUsers';

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export default function UserList({users}){
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, error } = useUsers(page, {
        initialData: users,
    })

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    async function handlePrefectUser(userId: string){
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`users/${userId}`)

            return response.data
        }, {
            staleTime: 1000 * 60 * 10, //10min 
        })
    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

            <Box
            flex="1" borderRadius={8} bg="gray.800" p="8"
            >
            
            <Flex mb="8" justify="space-between" align="center">
                <Heading size="lg" fontWeight="normal">
                Usuários
                {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
                </Heading>

                
                <Button as={Link} size="sm" fontSize="sm" colorScheme="pink" 
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                href="/users/create"
                >
                Criar novo
                </Button>
                
            </Flex>

            { isLoading ? (
                <Flex justify="center">
                    <Spinner />
                </Flex>
            ) : error ? (
                <Flex justify="center">Falha ao obter os dados do usuário</Flex>
            ) : (
                 <>
                <Table colorScheme="whiteAlpha">
                <Thead>
                    <Tr>
                        <Th px="6" color="gray.300" width="8">
                            <Checkbox colorScheme="pink" />
                        </Th>
                        <Th>Usuário</Th>
                        { isWideVersion && <Th>Data de Cadastro</Th>}
                        <Th width="8"></Th>
                    </Tr>
                </Thead>
                <Tbody>
                        {data.users.map((user: User) => {
                        return (
                        <Tr key={user.id}>
                        <Td px={[ "4", "4", "6"]}>
                            <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                            <Box>
                                <Link color="purple.400" onMouseEnter={() => handlePrefectUser(user.id)} >
                                <Text fontWeight="bold">{user.name}</Text>
                                </Link>
                                <Text fontSize="sm" color="gray.300">{user.email}</Text>
                            </Box>
                        </Td>
                        { isWideVersion && <Td>{user.createdAt}</Td>}
                        </Tr>
                        )
                    })}
                </Tbody>
                </Table>
            <Pagination 
                totalCountOfRegister={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
            />
            </>
            )}
            </Box>
            </Flex>
        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const {users, totalCount} = await getUsers(1)

    return {
        props: {
            users,
        }
    }
}