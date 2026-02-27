import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiMenuAltLeft } from 'react-icons/bi';

const Sidebarvideo = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <>
            <button
                className="fixed z-50 top-4 left-4 p-2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 focus:outline-none"
                onClick={onOpen}
            >
                <BiMenuAltLeft className="text-xl" />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                    onClick={onClose}
                ></div>
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-bold">Lessons</h2>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full focus:outline-none"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="flex flex-col p-4 space-y-2 overflow-y-auto">
                        <Link to={'/basic'} onClick={onClose} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors text-left font-medium">
                            Basic
                        </Link>
                        <Link to={'/inventory'} onClick={onClose} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors text-left font-medium">
                            Tracking Inventory
                        </Link>
                        <Link to={'/quiz1'} onClick={onClose} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors text-left font-medium">
                            Quiz 1
                        </Link>
                        <Link to={'/videos'} onClick={onClose} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors text-left font-medium">
                            Lectures
                        </Link>
                        <Link to={'/'} onClick={onClose} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors text-left font-medium">
                            Bonds
                        </Link>
                        <Link to={'/'} onClick={onClose} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors text-left font-medium">
                            Quiz 2
                        </Link>
                        <Link to={'/'} onClick={onClose} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors text-left font-medium">
                            Case Study
                        </Link>
                        <Link to={'/'} onClick={onClose} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors text-left font-medium">
                            Projects
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebarvideo;
