import React from 'react';

interface ChildrenProps {
    children: React.ReactNode;
}

const GlobalStyles: React.FC<ChildrenProps> = ({ children }) => {
    return children;
};

export default GlobalStyles;
