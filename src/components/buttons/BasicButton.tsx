type Props = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  additionalClassName?: string;
};
export const BasicButton = (props: Props) => {
  return (
    <button
      type="button"
      className={`border px-4 py-2 rounded cursor-pointer bg-grey-100 hover:bg-grey-300 transition ${props.additionalClassName}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};
