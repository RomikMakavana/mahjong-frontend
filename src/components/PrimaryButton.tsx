import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    label: string;
    isDisabled?: boolean;
    extraCss?: string;
}

export default function PrimaryButton(props: ButtonProps) {

    return (
        <button
            onClick={props.onClick}
            disabled={props.isDisabled}
            type="submit"
            className={`text-[16px] leading-[19.2px] transition-all duration-300 font-semibold text-white bg-brand-blue w-full py-[14px] rounded-[10px] disabled:opacity-30 ${props.extraCss ? props.extraCss : ''}`}
        >
            {props.label}
        </button>
    );
}
