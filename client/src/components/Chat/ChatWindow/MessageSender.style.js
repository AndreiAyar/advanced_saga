import styled from 'styled-components';

export const Container = styled.div`
position:relative;
button{
position:absolute;
right:25%;
top:25%;
width:100px;
height:50px;
background-color:#73496F;
font-size:15px;
color:white;
border:none;

}
`
export const TextArea = styled.textarea`

resize: none;
width:calc(75% - 3px);
height:80px;
border:solid 3px #722463;
margin:5px;
padding:0;

`