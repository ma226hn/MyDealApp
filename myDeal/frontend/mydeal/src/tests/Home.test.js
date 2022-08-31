
import { render, screen } from "@testing-library/react";
import Home from '../components/Home/Home.js'
 test('if the user is authorized the option (Add product)should appear' , async () => {
     render(<Home logined={true} />)
    expect ( screen.getByRole('link',{name:'Add product'})).toBeInTheDocument()
 })
 test('if the user is not authorized the option (Add product)should not appear' , async () => {
    render(<Home logined={false} />)
  expect ( screen.queryByRole('link',{name:'Add product'})).toBeNull()
 
})