import React from 'react'
import styled from 'styled-components'
import Image from './Image'

const StyledComment = styled.div`
    display: flex;
    margin-top: 10px;
`
const Container = styled.div`
    background-color: #eef0f5;
    border-radius: 10px;
    padding: 10px;
    margin-left: 10px;
`
const CommentWriter = styled.div`
    display: flex;
    justify-content: space-between;
`
const CommentText = styled.div`
`

const Comment = ({ comment }) => {
    return (
        <StyledComment>
            <Image />
            <Container>
                <CommentWriter>
                    {/* <p><strong>John Smith</strong></p> */}
                    <p><strong>{comment.author.fullName}</strong></p>
                    <p>2 hours ago</p>
                </CommentWriter>
                <CommentText>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </p> */}
                    <p>{comment.body}</p>
                </CommentText>
            </Container>
        </StyledComment>
    )
}

export default Comment
