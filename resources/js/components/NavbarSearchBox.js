import { Input } from 'antd'
import styled from 'styled-components'

const { Search } = Input

const NavbarSearchBox = styled(Search)`
input {
    border: none;
    background-color: rgba(255, 255, 255, .10);
    color: rgba(255, 255, 255, 0.5);
    transition: all .125s linear;

    &:focus {
        -webkit-box-shadow: none;
        background-color: rgba(255, 255, 255, 1);
        color: rgba(142, 142, 142, 1);
        box-shadow: none;

        &::placeholder {
            color: rgba(142, 142, 142, 1);
        }

        & ~ .ant-input-suffix > i {
            color: rgba(142, 142, 142, 1);
        }
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    & ~ .ant-input-suffix > i {
        color: rgba(255, 255, 255, 0.5);
    }
}
`
export default NavbarSearchBox