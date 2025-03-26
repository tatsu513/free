type Props = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  additionalClassName?: string;
};
export const PrimaryButton = (props: Props) => {
  return (
    <button
      type="button"
      className={`bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition ${props.additionalClassName}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};
