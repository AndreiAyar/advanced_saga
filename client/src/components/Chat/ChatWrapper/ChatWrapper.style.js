import styled from 'styled-components'


export const Container = styled.div`
min-width:600px;
min-height:700px;
max-width: 1000px;
max-height:1100px;
height:900px;
resize: both;
overflow: hidden;
background: rgb(120,36,111);
background: linear-gradient(0deg, rgba(120,36,111,1) 0%, rgba(102,28,95,1) 52%, rgba(102,28,95,1) 87%, rgba(130,42,120,1) 100%);
border-top-left-radius: 10px;
border-top-right-radius: 10px;

`

export const Header = styled.div`
width:100%;
height:40px;
cursor: ${({isDragging}) => isDragging ? '-webkit-grabbing' : '-webkit-grab'};  
background-color: rgb(88,0,123);
background-image: linear-gradient(0deg, rgba(88,0,123,1) 0%, rgba(71,0,98,1) 35%, rgba(72,16,88,1) 52%, rgba(98,55,109,1) 53%, rgba(104,74,113,1) 69%, rgba(129,90,161,1) 100%);
span{
display: block;
width:100%;
height:40px;
background-repeat: repeat;
opacity:0.3;
filter: grayscale(100%);
background-position: 75% 35%;
background-image:${({bg}) => bg && `url(${bg})`};
background-size: 350px;
}
`

export const Navigation = styled.div`
display:flex;
flex-direction: column;
div ul{
display:flex;
gap:5px;
list-style: none;
padding:0;
margin:0;

}
.primary-nav  ul li  {
color:white;
font-size:12px;
padding-left:10px;
padding-right:10px;

}
.secondary-nav ul{
margin:10px 10px 10px 5px;
display:flex;
font-size:13px;
color:white;
text-align:center;

}
.secondary-nav_right{
margin-left:auto;
display:flex;
}
.secondary-nav ul li img{
width:45px;
height:45px;
opacity:0.4; 
display:flex;
object-fit: contain;
align-items: center;
justify-content: center;
margin:0 25px 0 25px;
}
`
export const UserInfo = styled.div`
position:absolute;
right:0;
left:76.5%;
width:22.1%;
height:75.6%;
max-height:82%;
margin-top:5px;

background-color:#945F8D;
border: solid 2px rgb(175,129,166);

`
export const Avatar = styled.div`
display:flex;
height:100%;
width:100%;
flex-direction: column;
justify-content: space-between;
align-items: center;

.recipient{
width:95%;
 height:130px;
border: solid 1px rgb(175,129,166);
margin:10px;
object-fit: contain;
background-image:url(${'https://picsum.photos/200'}); //https://source.unsplash.com/user/tamas_tuzeskatai
background-position: center;
background-repeat: no-repeat;
background-size:100%;
}
.sender{
width:95%;
 height:130px;
border: solid 1px rgb(175,129,166);
margin:10px;
object-fit: contain;
background-image:url(${'https://picsum.photos/300'}); //https://source.unsplash.com/user/tamas_tuzeskatai //https://i.picsum.photos/id/518/200/200.jpg?hmac=nY2cAnZ0_ItWhhAsJ_XL3RsNkDo7_zobodK8FWIoCDM
background-position: center;
background-repeat: no-repeat;
background-size:100%;
}
`

export const MessageSender = styled.div`
height:80px;
position:relative;

`

export const UtilsArea = styled.div`

ul{
list-style: none;
display:flex;
padding-left:15px;
margin:10px 5px 0px 5px;
}
img{
width:20px;
padding-right:30px;
height:20px;
filter:grayscale(100%);
object-fit: contain;
}
img:hover{
filter:grayscale(0%);
}
`