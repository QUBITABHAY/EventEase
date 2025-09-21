import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-semibold">EventEase</h1>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                    <Button variant="ghost">Home</Button>
                    <Button variant="ghost">About</Button>
                    <Button variant="ghost">Services</Button>
                    <Button variant="ghost">Contact</Button>
                    <Button variant="outline">Sign In</Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

        

