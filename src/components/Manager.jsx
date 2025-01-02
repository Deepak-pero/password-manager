import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid'


const manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])

    const copyText = (text) => {
        toast('copy to clipborad', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });

        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyeclose.svg")) {
            ref.current.src = "icons/eye.svg"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyeclose.svg"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        console.log([...passwordArray, form])

    }

    const deletePassword = (id) => {
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id != id)))

    }

    const editPassword = (id) => {
        setform(passwordArray.filter(i => i.id === id[0]))
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>Op/ &gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your Own Password Manager</p>

                <div className='flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" d="" />
                    <div className="flex w-full gap-8 justify-between">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" />
                        <div className="relative">
                            <input value={form.password} ref={passwordRef} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" />
                            <span className=' absolute right-[4px] top-[5px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className="p-1" width={26} src="icons/eye.svg" alt="error" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center gap-2 items-center bg-green-400 px-8 py-2 rounded-full w-fit hover:bg-green-300 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </div>

                <div className="password">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>NO passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-lg overflow-hidden">
                        <thead className=' bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center '>
                                        <div className='flex items-center justify-center'>
                                            <span> <a href={item.site} target='_blank '>{item.site}</a></span>
                                            <div className='cursor-pointer size-7' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.username}</span>
                                            <div className='cursor-pointer size-7' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>

                                    </td>
                                    <td className=' py-2 border border-white text-center '>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.password}</span>
                                            <div className='cursor-pointer size-7' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>

                                    </td>
                                    <td className='justify-center py-2 border border-white text-center '>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                                trigger="hover"
                                                stroke="bold"
                                                colors="primary:#000000,secondary:#000000"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default manager
