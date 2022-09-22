import React from "react";

const Header: React.FC = () => {
    return (
        <header className="bg-wcs-pink px-5 min-h-[75px] flex items-center">
            <div className="container">
                <h1 className="text-slate-50 text-2xl font-semibold">Wilders Book</h1>
            </div>
        </header>
    );
};

export default Header;
