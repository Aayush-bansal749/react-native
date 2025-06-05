import React, {createElement, useState} from 'react';
import {Button, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';


const App = () => {

    const[ans,setAns] = useState(0)
  const [curr,setcurr]= useState(0)
  const [prev,setprev]= useState('')
  
  
  
  const Push = () =>{
    if (prev === '+'){
      setAns(ans+curr)
    }
    if (prev === '-'){
      setAns(ans-curr)
    }
    if (prev === '*'){
      setAns(ans*curr)
    }
    if (prev === '/'){
      setAns(ans/curr)
    }
    if (prev === ''){
      setAns(curr)
    }
    

  }

    const clean =()=>{
        if(prev === '='){
          setAns(0)
          setprev('')
          setcurr(0)
      }
    }

    const data = [
    {
        title:'7',
        onpress:function(){
             clean()
             setcurr(curr*10 + 7)
        }
    },
    {
        title:'8',
        onpress:function(){
             clean()
             setcurr(curr*10 + 8)
        }
    },
    {
        title:'9',
        onpress:function(){
             clean()
             setcurr(curr*10 + 9)   
        }
    },
    {
        title:'+',
        onpress:function(){
          Push()
          setprev('+')
          setcurr(0)
        }
    },
    {
        title:'4',
        onpress:function(){
              clean()
             setcurr(curr*10 + 4)  
        }
    },
    {
        title:'5',
        onpress:function(){
              clean()
             setcurr(curr*10 + 5)  
        }
    },
    {
        title:'6',
        onpress:function(){
             clean()
             setcurr(curr*10 + 6)   
        }
    },
    {
        title:'-',
        onpress:function(){
            Push()
          setprev('-')
          setcurr(0)    
        }
    },
    {
        title:'1',
        onpress:function(){
             clean()
             setcurr(curr*10 + 1)   
        }
    },
    {
        title:'2',
        onpress:function(){
             clean()
             setcurr(curr*10 + 2)   
        }
    },
    {
        title:'3',
        onpress:function(){
             clean()
             setcurr(curr*10 + 3)   
        }
    },
    {
        title:'*',
        onpress:function(){
            Push()
          setprev('*')
          setcurr(0)   
        }
    },
    {
        title:'C',
        onpress:function(){
              setAns(0)
          setprev('')
          setcurr(0)
        }
    },
    {
        title:'0',
        onpress:function(){
              clean()
             setcurr(curr*10 + 0)  
        }
    },
    {
        title:'=',
        onpress:function(){
                Push()
          setprev('=')
          setcurr(0)
        }
    },
    {
        title:'/',
        onpress:function(){
             Push()
          setprev('/')
          setcurr(0)   
        }
    },
    
]



 function renderButtons (item){
    
   return <Pressable 
    onPress = {item.onpress}
    style= {styles.Buttons}>
        <View ><Text style={{color:'#AACACB'}}> {item.title} </Text></View>
        
    </Pressable>
 }
 
  return<View style={styles.container}>
    <View style={styles.input}><Text style={styles.texti}>{curr}</Text></View>
    
    <View style={styles.output}> <Text style={styles.texto}>{ans}</Text></View>
    <View style={styles.press}>
      {  data.map((item)=>
    renderButtons(item)
      )}
    </View>
  
 </View>

 







}
const styles = StyleSheet.create({
    Buttons:{
      flex:1,
      margin:1,
      height: 95,
      width: 100,
        backgroundColor: '#212121',
        justifyContent:'center',
      alignItems:'center',

    },
    container:{
        flex:1,
        justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#212121'
    }  ,
    press:{
      flex:4,
      display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor:'#333333'

    },
    texti:{
        color:'#AACACB', 
        fontSize:60
        

    },
    texto:{
        color:'#AACACB', 
        fontSize:60
        
        

    },
    input:{
      flex:4,
      
      justifyContent:'center'
    },
    output:{
      flex:1
    }
    })

export default App;
