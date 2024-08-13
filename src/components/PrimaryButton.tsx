import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    label: string;
    isDisabled?: boolean;
}

export default function PrimaryButton(props: ButtonProps) {

    return (
        <button
            onClick={props.onClick}
            disabled={props.isDisabled}
            className='text-[16px] leading-[19.2px] font-semibold text-white bg-brand-blue w-full py-[14px] rounded-[10px]'
        >
            {props.label}
        </button>
    );
}
