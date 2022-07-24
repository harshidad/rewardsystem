import styled from 'styled-components'
export const HeaderContainer = () => {
    const Header = styled.div`
        height: 50px;
        background-color: #5bccf6;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    return(
        <Header>
            Welcome to Reward System
        </Header>
    )
}