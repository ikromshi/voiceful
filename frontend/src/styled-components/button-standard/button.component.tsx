/**
 * THREE TYPES OF BUTTONS:
 * 1) default
 * 2) inverted
 * 3) google sign-in
 */

 import { BaseButton, InvertedButton, ButtonSpinner, GoogleSignInButton, TextReaderButton } from "./button.styles";
 import { ButtonHTMLAttributes, FC } from "react";
 
 export enum BUTTON_TYPE_CLASSES {
     base = "base",
     google = "google-sign-in",
     inverted = "inverted",
     textReader = "text-reader"
 };
 
 
 const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton => ({
     [BUTTON_TYPE_CLASSES.base]: BaseButton,
     [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
     [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
     [BUTTON_TYPE_CLASSES.textReader]: TextReaderButton,
 }[buttonType]);
 
 export type ButtonProps = {
     buttonType?: BUTTON_TYPE_CLASSES;
     isLoading?: boolean;
 } & ButtonHTMLAttributes<HTMLButtonElement>;
 
 const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
     const CustomButton = getButton(buttonType);
     return (
         <CustomButton disabled={isLoading} {...otherProps}>
             {isLoading ? <ButtonSpinner /> : children}
         </CustomButton>
     );
 };
 
 export default Button;