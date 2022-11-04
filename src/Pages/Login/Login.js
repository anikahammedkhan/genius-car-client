import React from 'react';
import { Link } from 'react-router-dom';
import login from '../../assets/images/login/login.svg';

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login');
    }

    return (
        <div className="hero w-full">
            <div className="hero-content grid md:grid-cols-2 gap-9 flex-col lg:flex-row">
                <div className="text-center lg:text-left p-5">
                    <img src={login} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 py-10">
                    <h1 className="text-4xl text-center my-3 font-bold">Login</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='font-bold text-center'>New To Genius Car? <Link to='/signup' className='text-orange-600'>SignUp</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;