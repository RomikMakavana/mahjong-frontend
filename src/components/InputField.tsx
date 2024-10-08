
interface InputProps {
    type: string;
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    minLength?: number;
    extraCss?: string;
    isRequired?:boolean;
    maxLength?:number;
}

export default function InputField (props : InputProps) {
    return (
        <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        minLength={props.minLength}
        required={props.isRequired}
        maxLength={props.maxLength}
        className={`text-sm font-[500px] py-[14px] px-5 border border-neutral-800 w-full rounded-[10px] ring-0 shadow-none focus:shadow-none focus:outline-none bg-transparent text-white ${props.extraCss ? props.extraCss : ''}`} 
         />
    )
}