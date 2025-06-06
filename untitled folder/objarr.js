

const product=[{
   name:'apple',
   category: 'fruit'
},{
   name:'banana',
   category: 'fruit'
},{
   name:'onion',
   category: 'vegetable'
},{
   name:'carrot',
   category: 'vegetable'
},{
   name:'potato',
   category: 'vegetable'
},{
   name:'mango',
   category: 'fruit'
}]

const categories = product.reduce((acc,grocery)=>{
   if(!acc[grocery.category]){
      acc[grocery.category]=[]
   }
   acc[grocery.category].push(grocery.name)
   return acc
},{})
    
 console.log(categories)

// console.log(Object.keys(categories))

const reverse = Object.keys(categories).reduce((acc,key)=>{
   acc.push(categories[key].map((namee)=>{
      return{
         name: namee,
         category: key
      }
   }))
   return acc
},[])

console.log(reverse.flat(Infinity))