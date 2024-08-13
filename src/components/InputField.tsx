
interface InputProps {
    type: string;
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField (props : InputProps) {
    return (
        <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className="text-sm font-[500px] py-[14px] px-5 border border-neutral-800 w-full rounded-[10px] ring-0 shadow-none focus:shadow-none focus:outline-none bg-transparent text-white" 
         />
    )
}