// File path: src/components/Button.tsx

import React from 'react';

type ButtonProps = {
  text: string;
  style?: React.CSSProperties;
  bg?: string;
  textColor?: string;
  icon?: React.ReactNode;
  iconPos?: 'left' | 'right';
  hoverColor?: string;
  w?: string;
  h?: string;
  className?: string;
  iconStyle?: React.CSSProperties;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  text,
  style,
  w,
  h,
  bg,
  textColor,
  iconStyle,
  icon,
  hoverColor,
  className,
  iconPos = 'left',
  ...otherProps
}) => {
  const customClassName = `${bg && bg !== 'primary' ? `bg-[${bg}]` : bg && 'bg-primary-300'} ${textColor ? `text-[${textColor}]` : 'text-[white]'} ${hoverColor ? `hover:bg-[${hoverColor}]` : bg === 'primary' && 'hover:bg-primary-500'}`;
  return (
    <button
      className={customClassName + ' ' + className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: bg,
        width: w ?? '100%',
        height: h ?? '40px',
        justifyContent: icon
          ? iconPos === 'left'
            ? 'flex-start'
            : 'flex-end'
          : 'center',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        ...style,
      }}
      {...otherProps}
    >
      {icon && iconPos === 'left' && <span style={iconStyle}>{icon}</span>}
      <span className='whitespace-nowrap'>{text}</span>
      {icon && iconPos === 'right' && <span style={iconStyle}>{icon}</span>}
    </button>
  );
};

export default Button;
