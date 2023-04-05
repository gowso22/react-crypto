import styled from "styled-components";

function Coins(){
    const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
  `;
    return (
    <Title>코인</Title>
    )
}

export default Coins;