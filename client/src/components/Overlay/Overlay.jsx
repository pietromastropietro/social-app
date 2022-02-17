import styled from "styled-components";

const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #5757577d;
    z-index: 1;

    display: grid;
    place-content: center;
`
const Overlay = ({ children}) => {
    return (
        <StyledOverlay>
            {children}
        </StyledOverlay>
    )
}

export default Overlay;