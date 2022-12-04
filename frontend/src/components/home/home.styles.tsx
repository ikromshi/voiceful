import styled from "styled-components";
import { FolderFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export const HomeButton = styled.button`
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  margin-top: 40px;
  letter-spacing: 0.8px;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  text-decoration: none;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    margin-left: 15px;
  }
  margin-bottom: 50px;
`

export const HomeButtonSvg = styled(FolderFill)`
  font-size: 25px;
  margin-left: 10px;
  transition: 0.3s ease-in-out;
  line-height: 1;
`

export const HomeLink = styled(Link)`
  text-decoration: none;
  margin-bottom: 4rem;
  width: 30%;
`

export const WelcomeMessage = styled.h1`
  color: white;
`

export const HomeLinkDiv = styled.div`
  width: 100%;
  display: inline-block;
`