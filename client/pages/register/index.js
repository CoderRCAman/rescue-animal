import React,{useState} from 'react'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
function index() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        
      });
      const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };
      const registerSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:5000/user/register", { ...user });
    
          // localStorage.setItem("firstLogin", true);
          // localStorage.setItem("role","admin")
          // localStorage.setItem("user_id")
          toast.success('Sign Up Succesfully. SignIn Now')
          window.location.href = "/login";
        } catch (err) {
          toast.error("Not register");
        }
      };
  return (
    <div>
    <Toaster/>
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
        <div className="md:flex w-full">
            
            
              <img className='rounded-lg w-[50%]' src='https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?cs=srgb&dl=pexels-pixabay-247502.jpg&fm=jpg'/>
    
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                <div className="text-center mb-10">
                    <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                    <p>Enter your information to register</p>
                </div>
                <div
                
                >
                  
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label for="" className="text-xs font-semibold px-1">Name</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input type="email" 
                                value={user.name}
                                onChange={onChangeInput}
                                name="name"
                                id="name"
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="dejesh"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <label for="" className="text-xs font-semibold px-1">Email</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input 
                                value={user.email}
                                onChange={onChangeInput}
                                name="email"
                                id="email"
                                type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="dejesh@example.com"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-12">
                            <label for="" className="text-xs font-semibold px-1">Password</label>
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input
                                value={user.password}
                                onChange={onChangeInput}
                                name="password"
                                id="password"
                                type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <button onClick={registerSubmit} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div></div>
  )
}
export default index;
