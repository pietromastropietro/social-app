import React from 'react'
import styled from 'styled-components'
import Comment from './Comment'

const StyledComments = styled.div`
    border-top: 1px solid #a5a5a5;
    margin-top: 10px;
    padding-top: 10px;
`

const Comments = ({ data }) => {
    return (
        <StyledComments>
            {/* <p>Show all 5 comments</p>
            <Comment />
            <Comment /> */}
            {data.map(comment => <Comment info={comment} key={comment._id} />)}
        </StyledComments>
    )
}

export default Comments
