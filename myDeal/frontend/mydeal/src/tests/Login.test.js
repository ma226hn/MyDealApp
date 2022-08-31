
import { render, screen } from "@testing-library/react";
import Login from '../components/Login/Login.js'
 test('if the value of password and username are empty button is disable' , async () => {
     render(<Login loginData = {{username:'',password:''}} />)
    expect ( screen.getByRole('button',{name:'Log in'})).toBeDisabled()
 })
 test('if the value of password and username is not empty button is enable' , async () => {
    render(<Login loginData = {{username:'kjjjj',password:'hhhhhh'}} />)
    expect( screen.getByRole('button',{name:'Log in'})).toBeEnabled()
   

})
test('if the value of password or username is wrong should give error message' , async () => {
    render(<Login loginData = {{username:'kjjjj',password:'hhhhhh'}} fellogning={true} />)
    expect( screen.getByText( /Wrong name/i )).toBeInTheDocument()
   

})