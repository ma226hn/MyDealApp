import { render, screen } from "@testing-library/react";
import Header from '../components/Header/Header'
 test('efter the user log in it should apear just (home , new offers , my account) options and disappear (login , rigester) options' , async () => {
     render(<Header logined={true} />)
    expect ( screen.getByRole('link',{name:'Logout'})).toBeInTheDocument()
    expect ( screen.getByRole('link',{name:'My Account'})).toBeInTheDocument()
    expect ( screen.getByRole('link',{name:'New Offers'})).toBeInTheDocument()
    expect ( screen.queryByRole('link',{name:'Log in'})).toBeNull()
    expect ( screen.queryByRole('link',{name:'Rigester'})).toBeNull()

 })
 test('befor the user log in it should not  apear  (home , new offers , my account) options and disappear (login , rigester) shoud appear' , async () => {
    render(<Header logined={false} />)
   expect ( screen.queryByRole('link',{name:'Logout'})).toBeNull()
   expect ( screen.queryByRole('link',{name:'My Account'})).toBeNull()
   expect ( screen.queryByRole('link',{name:'New Offers'})).toBeNull()
   expect ( screen.getByRole('link',{name:'Log in'})).toBeInTheDocument()
   expect ( screen.getByRole('link',{name:'Rigester'})).toBeInTheDocument()

})