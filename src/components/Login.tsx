import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Login() {
    return (
        <div className="w-full h-screen flex items-start">
            <div className="relative w-1/2 h-full flex flex-col">
                <div className="absolute top-60 left-24 flex flex-col">
                    <h1 className="text-white text-7xl font-bold pb-4 z-10">CrossDoctor</h1>
                    <p className="text-text-span block max-w-56">of clients are satisfied 😊 with our bank according to the survey</p>
                </div>
                <Image 
                    className="bg-black h-full w-full object-cover"
                    src={'./assets/img_login.svg'}
                    height={1043}
                    width={1093}
                    alt="Logo"
                />
                   <Image 
                    className="absolute object-cover left-60 top-64 max-h-screen"
                    src={'./assets/img_login2.svg'}
                    height={800}
                    width={700}
                    alt="Logo"
                />
            </div>
            <div className="w-1/2 h-full flex flex-col pl-36 justify-center text-center max-w-xl">
                <Image 
                        className="absolute bottom-3/4 -right-0 -z-10"
                        src={'./assets/img_login2.svg'}
                        height={400}
                        width={400}
                        alt="Logo"
                />
                <div className="w-full flex flex-col gap-3">
                    <span className="font-extrabold text-5xl">Log in</span>
                    <span className="font-semibold text-2xl pb-8">Bem-vindo de volta</span>
                </div>
                <div className="max-w-xl flex flex-col gap-4 justify-center">
                    <Input type="email" className="rounded-full bg-gray-300" placeholder="Email"/>
                    <Input type="password" className="rounded-full bg-gray-300" placeholder="Password"/>
                    <Button className="rounded-full ">Login</Button>
                    <a href="#" className="flex justify-center hover:underline">Esqueceu sua senha?</a>
                </div>
            </div>
        </div>
    )
}