import {NextResponse} from 'next/server' 
import _ from 'lodash'  ; 
export default function middleware(req) {
    const {cookies,page} = req ;    
    console.log(req.url)
    const clientApi = 'http://localhost:3000' ;  
    if(cookies && cookies.isLoggedIn && page.name === '/login') 
      return NextResponse.redirect(`${clientApi}`)
    if(_.isEmpty(cookies) || !cookies.isLoggedIn){  
        if(page.name === '/login' ) {
            
            return NextResponse.next() ;
        }
       return  NextResponse.redirect(`${clientApi}/login`) ;  
    } 
   //rest will be dependent on which route to and if that is a valid one 
 
}