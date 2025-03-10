type Props = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  additionalClassName?: string;
};

export const InputText = (props: Props) => {
  return (
    <input
      type="text"
      className={`p-2 border rounded-sm w-full ${props.additionalClassName}`}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};
