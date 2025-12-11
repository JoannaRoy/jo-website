import React from "react";

interface GiraffePatternProps {
  className?: string;
}

const GiraffePattern: React.FC<GiraffePatternProps> = ({
  className = "",
}) => {
  return (
    <div 
      className={className}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/assets/giraffe_pattern.svg)',
        backgroundRepeat: 'repeat',
        backgroundSize: '600px auto',
        backgroundPosition: 'center center',
        opacity: 0.5,
        filter: 'blur(1px)',
      }}
    />
  );
};

export default GiraffePattern;
