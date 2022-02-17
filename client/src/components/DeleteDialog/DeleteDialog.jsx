import Button from 'components/Button/Button'
import Overlay from 'components/Overlay/Overlay'
import { radius } from 'style'
import styled from 'styled-components'

const Dialog = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 250px;
    background-color: #fff;
    border-radius: ${radius.primary};
    padding: 20px;
    text-align: center;
    row-gap: 30px;

    > div {
        display: flex;
        justify-content: space-evenly;
    }
`

const DeleteDialog = ({ name, handleConfirm, handleCancel }) => {
    return (
        <Overlay>
            <Dialog>
                <p>Do you really want to delete this {name}?</p>

                <div>
                    <Button width='60px' warning small onClick={handleConfirm}>Yes</Button>
                    <Button width='60px' primaryOutlined small onClick={handleCancel}>No</Button>
                </div>
            </Dialog>
        </Overlay>
    )
}

export default DeleteDialog