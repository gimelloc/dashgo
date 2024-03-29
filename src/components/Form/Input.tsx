import { FormControl, FormErrorMessage, FormLabel, Input as ChackraInput, InputProps as ChackraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChackraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
= ({name, label, error = null, ...rest}, ref) => {
    return (
        <FormControl isInvalid={!!error}>
        { !!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        
        <ChackraInput
        id={name}
        name={name}
        type="email"
        focusBorderColor='pink.500'
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900'
        }}
        size="lg"
        ref={ref}
        {...rest}
        />

        {!!error && (
            <FormErrorMessage>
                {error.message}
            </FormErrorMessage>
        )}
        </FormControl>
    );
}

export const Input = forwardRef(InputBase)