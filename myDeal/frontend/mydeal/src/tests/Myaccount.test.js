import { screen,render } from "@testing-library/react";
import Myaccount from '../components/Myaccount/Myaccount.js'
import userEvent from "@testing-library/user-event";
test ('navigate from change email to chang password', ()=>{
    render(<Myaccount />)
expect (screen.getByText(/Insert your new email/i)).toBeInTheDocument()
expect (screen.queryByRole('button',{name: 'Change password'})).toBeNull();
userEvent.click(screen.getByRole('button',{name: 'Change your passWord'}))
expect (screen.getByRole('button',{name: 'Change password'})).toBeInTheDocument()
expect (screen.queryByText(/Insert your new email/i)).toBeNull();
})