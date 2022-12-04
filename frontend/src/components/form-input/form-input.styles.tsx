import styled, { css } from "styled-components";

const subColor = "black";
const mainColor = "white";

const ShrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`

type FormInputLabelProps = {
  shrink?: boolean;
};

export const FormInputLabel = styled.label<FormInputLabelProps>`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${({shrink}) => shrink && ShrinkLabelStyles}
`

export const Input = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabel} {
    ${ShrinkLabelStyles};
  }
`

export const Group = styled.div`
  position: relative;
  margin: 45px 0;
  width: 360px;
  
  input[type='password'] {
    letter-spacing: 0.3em;
  }
`